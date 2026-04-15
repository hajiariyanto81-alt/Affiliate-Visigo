import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Wallet, 
  History, 
  Loader2, 
  TrendingUp,
  Calendar,
  User,
  Package,
  Download
} from 'lucide-react';
import { AffiliateIDCard } from './AffiliateIDCard';

interface Sale {
  tanggal: string;
  customer: string;
  alamat: string;
  produk: string;
  komisi: number;
  status: string;
}

interface BalanceData {
  success: boolean;
  total: number;
  history: Sale[];
  affiliatorName?: string;
  affiliatorDomisili?: string;
  affiliatorPhoto?: string;
  affiliateId?: string;
  message?: string;
}

export const CommissionChecker = ({ onClose }: { onClose: () => void }) => {
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BalanceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [showIDCard, setShowIDCard] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/cek-saldo?whatsapp=${whatsapp}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result);
      } else {
        setError(result.message || "Data tidak ditemukan. Pastikan nomor WA sudah terdaftar.");
      }
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi bantu untuk parsing tanggal yang bandel
  const parseDate = (dateStr: string) => {
    let date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      const parts = dateStr.split(/[/ -]/);
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parts[2].length === 2 ? 2000 + parseInt(parts[2], 10) : parseInt(parts[2], 10);
        date = new Date(year, month, day);
      }
    }
    return date;
  };

  // Logika Kelompokkan per Bulan
  const groupedHistory = data?.history.reduce((acc: { [key: string]: Sale[] }, sale) => {
    const date = parseDate(sale.tanggal);
    const monthYear = isNaN(date.getTime()) 
      ? "Lainnya" 
      : date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(sale);
    return acc;
  }, {}) || {};

  // Hitung Total Komisi Aktif (Yang BUKAN "Selesai")
  const totalAktif = data?.history.reduce((sum, sale) => {
    if (sale.status?.toLowerCase() !== 'selesai') {
      return sum + sale.komisi;
    }
    return sum;
  }, 0) || 0;

  // Ambil status terbaru dari transaksi yang belum selesai
  const currentStatus = data?.history.find(s => s.status?.toLowerCase() !== 'selesai')?.status || 'Siap dicairkan';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = parseDate(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const toggleMonth = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Cek Saldo Komisi</h2>
              <p className="text-xs text-slate-500">Pantau hasil kerja kerasmu di sini</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Search Form - Responsive for Mobile */}
          <form onSubmit={handleCheck} className="flex flex-col sm:relative gap-3 sm:gap-0">
            <div className="relative flex-1">
              <input 
                type="number"
                placeholder="Masukkan No. WhatsApp (Contoh: 0812...)"
                className="w-full pl-12 pr-4 sm:pr-36 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm sm:text-base"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <button 
              type="submit"
              disabled={loading || !whatsapp}
              className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-auto px-6 py-3 sm:py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-50 shadow-lg shadow-primary/20 sm:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : "Cek Sekarang"}
            </button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          {data && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Affiliator Info */}
              {(data.affiliatorName || data.affiliatorDomisili) && (
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 leading-tight">
                      {data.affiliatorName || "Affiliator VisiGo"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      {data.affiliatorDomisili || "Lokasi tidak terdeteksi"}
                    </p>
                  </div>
                  {data.affiliateId && (
                    <button 
                      onClick={() => setShowIDCard(!showIDCard)}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {showIDCard ? "Tutup ID Card" : "Download ID Card"}
                    </button>
                  )}
                </div>
              )}

              {showIDCard && data && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center"
                >
                  <AffiliateIDCard 
                    name={data.affiliatorName || ""}
                    id={data.affiliateId || ""}
                    domisili={data.affiliatorDomisili || ""}
                    photo={data.affiliatorPhoto}
                  />
                </motion.div>
              )}

              {/* Summary Card */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-primary to-primary-dark rounded-[2rem] text-white shadow-xl shadow-primary/20">
                  <p className="text-primary-foreground/80 text-sm font-medium mb-1">Total Komisi</p>
                  <h3 className="text-3xl font-bold">{formatCurrency(totalAktif)}</h3>
                  <div className="mt-4 flex items-center gap-2 text-xs bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-bold uppercase tracking-wider">
                      {totalAktif > 0 ? currentStatus : 'Sudah dicairkan'}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-200">
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Closing</p>
                  <h3 className="text-3xl font-bold">{data.history.length} <span className="text-lg font-normal text-slate-500">Order</span></h3>
                  <div className="mt-4 flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                    <History className="w-3 h-3" />
                    <span>Riwayat Penjualan</span>
                  </div>
                </div>
              </div>

              {/* History Table with Accordion */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Riwayat Closing per Bulan
                </h4>
                
                {Object.keys(groupedHistory).length > 0 ? (
                  <div className="space-y-4">
                    {Object.keys(groupedHistory).sort((a, b) => {
                      // Sort by date descending
                      const dateA = new Date(groupedHistory[a][0].tanggal);
                      const dateB = new Date(groupedHistory[b][0].tanggal);
                      return dateB.getTime() - dateA.getTime();
                    }).map((month) => (
                      <div key={month} className="border border-slate-100 rounded-[2rem] overflow-hidden bg-white shadow-sm">
                        <button 
                          onClick={() => toggleMonth(month)}
                          className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-slate-900">{month}</p>
                              <p className="text-xs text-slate-400">{groupedHistory[month].length} Transaksi</p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedMonth === month ? 180 : 0 }}
                          >
                            <Loader2 className={`w-5 h-5 text-slate-300 ${expandedMonth === month ? 'rotate-180' : ''}`} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedMonth === month && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 space-y-3">
                                {groupedHistory[month].map((sale, idx) => (
                                  <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary/5 transition-colors">
                                        <Package className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <p className="font-bold text-slate-900">{sale.produk}</p>
                                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                            sale.status?.toLowerCase() === 'selesai' 
                                              ? 'bg-green-100 text-green-600' 
                                              : sale.status?.toLowerCase() === 'proses'
                                              ? 'bg-blue-100 text-blue-600'
                                              : 'bg-amber-100 text-amber-600'
                                          }`}>
                                            {sale.status || 'Pending'}
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(sale.tanggal)}
                                          </span>
                                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {sale.customer}
                                          </span>
                                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                            <Search className="w-3 h-3" />
                                            {sale.alamat}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-bold text-green-600">+{formatCurrency(sale.komisi)}</p>
                                      <p className="text-[10px] text-slate-400 font-medium">Komisi Masuk</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <History className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">Belum ada riwayat closing.</p>
                    <p className="text-xs text-slate-400 mt-1">Semangat terus share link-nya!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {!data && !loading && !error && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-primary/20" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cek Hasilmu Sekarang</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Masukkan nomor WhatsApp yang kamu gunakan saat mendaftar untuk melihat saldo komisi.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            VisiGo Affiliate Dashboard • v1.0
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
