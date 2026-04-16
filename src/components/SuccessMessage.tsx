import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, MessageCircle, Users } from 'lucide-react';
import { AffiliateIDCard } from './AffiliateIDCard';

interface FormData {
  nama: string;
  whatsapp: string;
  domisili: string;
  area: string;
  umur: string;
  sosmed: string[];
  username: string;
  alasan: string;
  siapShare: string;
  komunitas: string;
  referensi: string;
  bankName: string;
  rekening: string;
  foto?: string;
  affiliateId?: string;
}

export const SuccessMessage = ({ onClose, formData }: { onClose: () => void, formData: FormData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full text-center relative my-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20">
          <X className="w-6 h-6" />
        </button>
 
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              Terima kasih sudah mendaftar. Data kamu sudah kami terima di sistem. Di samping adalah **ID Card Digital** resmi kamu. Silakan download dan simpan.
            </p>
            
            <div className="space-y-3">
              <a 
                href="https://chat.whatsapp.com/H2INCmYxljRG548MK4hvyD?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-base hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 no-underline border-2 border-white/20"
              >
                <Users className="w-5 h-5" />
                Gabung Grup Affiliate
              </a>
              <a 
                href={`https://wa.me/6281296921892?text=${encodeURIComponent(
                  "KONFIRMASI PENDAFTARAN VISIGO\n\n" +
                  "ID Affiliate: " + (formData.affiliateId || "-") + "\n" +
                  "Nama: " + formData.nama + "\n" +
                  "WhatsApp: " + formData.whatsapp + "\n" +
                  "Domisili: " + formData.domisili + "\n" +
                  "Area: " + formData.area + "\n" +
                  "Umur: " + formData.umur + "\n" +
                  "Sosmed: " + formData.sosmed.join(', ') + "\n" +
                  "Username: " + formData.username + "\n" +
                  "Alasan: " + formData.alasan + "\n" +
                  "Siap Share: " + formData.siapShare + "\n" +
                  "Komunitas: " + formData.komunitas + "\n" +
                  "Referensi: " + (formData.referensi || "-") + "\n" +
                  "Bank/E-Wallet: " + formData.bankName + "\n" +
                  "No. Rekening: " + formData.rekening + "\n\n" +
                  "Terima kasih admin!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-base hover:bg-green-600 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 no-underline"
              >
                <MessageCircle className="w-5 h-5" />
                Konfirmasi via WhatsApp
              </a>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <AffiliateIDCard 
              name={formData.nama}
              id={formData.affiliateId || "VG-AFF-00000"}
              domisili={formData.domisili}
              photo={formData.foto}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
