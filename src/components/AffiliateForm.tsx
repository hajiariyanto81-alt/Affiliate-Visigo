import React, { useState } from 'react';
import { 
  Smartphone, 
  Wallet, 
  HelpCircle, 
  CheckCircle2, 
  Upload, 
  Loader2,
  ChevronDown,
  Send
} from 'lucide-react';

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
  fotoName?: string;
  affiliateId?: string;
}

export const AffiliateForm = ({ onSubmitSuccess }: { onSubmitSuccess: (data: FormData) => void }) => {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    whatsapp: '',
    domisili: '',
    area: '',
    umur: '',
    sosmed: [],
    username: '',
    alasan: '',
    siapShare: '',
    komunitas: '',
    referensi: '',
    bankName: '',
    rekening: '',
    foto: '',
    fotoName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: any) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      setFieldErrors(prev => ({ ...prev, [name]: 'Kolom ini wajib diisi' }));
      return false;
    }
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Ukuran foto terlalu besar (Maks 10MB)");
        return;
      }
      
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const compressed = await compressImage(base64);
        setFormData(prev => ({
          ...prev,
          foto: compressed,
          fotoName: file.name
        }));
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors['foto'];
          return newErrors;
        });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckbox = (platform: string) => {
    const newSosmed = formData.sosmed.includes(platform) 
      ? formData.sosmed.filter(s => s !== platform)
      : [...formData.sosmed, platform];
    
    setFormData(prev => ({ ...prev, sosmed: newSosmed }));
    validateField('sosmed', newSosmed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const errors: Record<string, string> = {};
    const requiredFields = ['nama', 'whatsapp', 'domisili', 'umur', 'foto', 'username', 'alasan', 'siapShare', 'komunitas', 'bankName', 'rekening'];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        errors[field] = 'Kolom ini wajib diisi';
      }
    });

    if (formData.sosmed.length === 0) {
      errors['sosmed'] = 'Pilih minimal satu';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Mohon lengkapi semua data yang bertanda merah!");
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let result;
      
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Server Error (${response.status}): Respon tidak valid.`);
      }
      
      if (result.success) {
        onSubmitSuccess({
          ...formData,
          affiliateId: result.affiliateId
        });
      } else {
        setError("Gagal mengirim data: " + (result.message || "Cek konfigurasi kamu."));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="daftar" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="text-center mb-10">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Pendaftaran</span>
            <h2 className="text-3xl font-bold text-slate-900">🚀 Form Affiliate VisiGo</h2>
            <p className="text-slate-500 mt-2">Isi data di bawah untuk mulai perjalananmu</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                  <input 
                    name="nama"
                    required
                    type="text" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      fieldErrors.nama ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={e => {
                      setFormData({...formData, nama: e.target.value});
                      validateField('nama', e.target.value);
                    }}
                  />
                  {fieldErrors.nama && <p className="text-xs text-red-500 font-medium">{fieldErrors.nama}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nomor WhatsApp</label>
                  <input 
                    name="whatsapp"
                    required
                    type="number" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      fieldErrors.whatsapp ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                    placeholder="0812..."
                    value={formData.whatsapp}
                    onChange={e => {
                      setFormData({...formData, whatsapp: e.target.value});
                      validateField('whatsapp', e.target.value);
                    }}
                  />
                  {fieldErrors.whatsapp && <p className="text-xs text-red-500 font-medium">{fieldErrors.whatsapp}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Domisili (Kota)</label>
                  <input 
                    name="domisili"
                    required
                    type="text" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      fieldErrors.domisili ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                    placeholder="Contoh: Jakarta"
                    value={formData.domisili}
                    onChange={e => {
                      setFormData({...formData, domisili: e.target.value});
                      validateField('domisili', e.target.value);
                    }}
                  />
                  {fieldErrors.domisili && <p className="text-xs text-red-500 font-medium">{fieldErrors.domisili}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Umur</label>
                  <input 
                    name="umur"
                    required
                    type="number" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                      fieldErrors.umur ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                    placeholder="Contoh: 25"
                    value={formData.umur}
                    onChange={e => {
                      setFormData({...formData, umur: e.target.value});
                      validateField('umur', e.target.value);
                    }}
                  />
                  {fieldErrors.umur && <p className="text-xs text-red-500 font-medium">{fieldErrors.umur}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  Upload Foto Diri (Untuk ID Digital)
                  <span className="text-xs font-normal text-slate-400 italic">*Maks 5MB</span>
                </label>
                <div className="relative" name="foto">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="foto-upload"
                  />
                  <label 
                    htmlFor="foto-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${
                      formData.foto 
                        ? 'border-green-500 bg-green-50' 
                        : fieldErrors.foto 
                          ? 'border-red-500 bg-red-50'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-primary/30'
                    }`}
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-sm font-medium text-slate-500">Memproses foto...</span>
                      </div>
                    ) : formData.foto ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                          <img src={formData.foto} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-green-600">Foto Terpilih!</span>
                        <span className="text-xs text-slate-400">{formData.fotoName}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Upload className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Klik untuk upload foto</span>
                        <span className="text-xs text-slate-400">Pastikan wajah terlihat jelas</span>
                      </div>
                    )}
                  </label>
                  {fieldErrors.foto && <p className="text-xs text-red-500 font-medium mt-2">{fieldErrors.foto}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">Akun yang aktif kamu gunakan:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" name="sosmed">
                  {['WhatsApp', 'Instagram', 'TikTok', 'Facebook'].map(platform => (
                    <label key={platform} className={`flex items-center gap-2 p-3 bg-slate-50 rounded-xl border cursor-pointer hover:bg-slate-100 transition-colors ${
                      fieldErrors.sosmed ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                        checked={formData.sosmed.includes(platform)}
                        onChange={() => handleCheckbox(platform)}
                      />
                      <span className="text-sm font-medium text-slate-700">{platform}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.sosmed && <p className="text-xs text-red-500 font-medium">{fieldErrors.sosmed}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Username / Link Akun</label>
                <input 
                  name="username"
                  required
                  type="text" 
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                    fieldErrors.username ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                  }`}
                  placeholder="@username"
                  value={formData.username}
                  onChange={e => {
                    setFormData({...formData, username: e.target.value});
                    validateField('username', e.target.value);
                  }}
                />
                {fieldErrors.username && <p className="text-xs text-red-500 font-medium">{fieldErrors.username}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">Kamu tertarik jadi affiliate karena apa?</label>
                <div className="grid gap-3" name="alasan">
                  {['Tambahan penghasilan', 'Iseng coba', 'Mau serius bisnis', 'Lainnya'].map(opt => (
                    <label key={opt} className={`flex items-center gap-3 p-4 bg-slate-50 rounded-xl border cursor-pointer hover:border-primary/30 transition-all ${
                      fieldErrors.alasan ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}>
                      <input 
                        type="radio" 
                        name="alasan"
                        className="w-4 h-4 text-primary focus:ring-primary"
                        checked={formData.alasan === opt}
                        onChange={() => {
                          setFormData({...formData, alasan: opt});
                          validateField('alasan', opt);
                        }}
                      />
                      <span className="text-sm font-medium text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.alasan && <p className="text-xs text-red-500 font-medium">{fieldErrors.alasan}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">Siap share minimal 1x per hari?</label>
                <div className="flex gap-4" name="siapShare">
                  {['Ya', 'Tidak'].map(opt => (
                    <label key={opt} className={`flex-1 flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl border cursor-pointer hover:border-primary/30 transition-all ${
                      fieldErrors.siapShare ? 'border-red-500 bg-red-50' : 'border-slate-200'
                    }`}>
                      <input 
                        type="radio" 
                        name="siapShare"
                        className="w-4 h-4 text-primary focus:ring-primary"
                        checked={formData.siapShare === opt}
                        onChange={() => {
                          setFormData({...formData, siapShare: opt});
                          validateField('siapShare', opt);
                        }}
                      />
                      <span className="text-sm font-medium text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.siapShare && <p className="text-xs text-red-500 font-medium">{fieldErrors.siapShare}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700">Punya komunitas / relasi?</label>
                <div className="relative">
                  <select 
                    name="komunitas"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none ${
                      fieldErrors.komunitas ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                    value={formData.komunitas}
                    onChange={e => {
                      setFormData({...formData, komunitas: e.target.value});
                      validateField('komunitas', e.target.value);
                    }}
                  >
                    <option value="">Pilih opsi...</option>
                    <option value="Tidak">Tidak</option>
                    <option value="< 50 orang">&lt; 50 orang</option>
                    <option value="50–100 orang">50–100 orang</option>
                    <option value="> 100 orang">&gt; 100 orang</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                {fieldErrors.komunitas && <p className="text-xs text-red-500 font-medium">{fieldErrors.komunitas}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Referensi Tim VisiGo (Opsional)</label>
                  <input 
                    name="referensi"
                    type="text" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all border-slate-200`}
                    placeholder="Nama tim yang mengajak"
                    value={formData.referensi}
                    onChange={e => {
                      setFormData({...formData, referensi: e.target.value});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">VisiGo Area (Opsional)</label>
                  <input 
                    name="area"
                    type="text" 
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all border-slate-200`}
                    placeholder="Contoh: Jakarta Selatan"
                    value={formData.area}
                    onChange={e => {
                      setFormData({...formData, area: e.target.value});
                    }}
                  />
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Data Penarikan Komisi</h3>
                    <p className="text-xs text-slate-500">Mohon isi dengan teliti untuk pencairan bonus</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nama Bank / E-Wallet</label>
                    <div className="relative">
                      <select 
                        name="bankName"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none ${
                          fieldErrors.bankName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                        }`}
                        value={formData.bankName}
                        onChange={e => {
                          setFormData({...formData, bankName: e.target.value});
                          validateField('bankName', e.target.value);
                        }}
                      >
                        <option value="">Pilih Bank/E-Wallet...</option>
                        <optgroup label="Bank">
                          <option value="BCA">BCA</option>
                          <option value="BNI">BNI</option>
                          <option value="BRI">BRI</option>
                          <option value="Mandiri">Mandiri</option>
                          <option value="BSI">BSI</option>
                        </optgroup>
                        <optgroup label="E-Wallet">
                          <option value="DANA">DANA</option>
                          <option value="OVO">OVO</option>
                          <option value="GoPay">GoPay</option>
                          <option value="ShopeePay">ShopeePay</option>
                        </optgroup>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    {fieldErrors.bankName && <p className="text-xs text-red-500 font-medium">{fieldErrors.bankName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">No. Rekening / ID E-Wallet</label>
                    <input 
                      name="rekening"
                      required
                      type="text" 
                      className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                        fieldErrors.rekening ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Contoh: 1234567890"
                      value={formData.rekening}
                      onChange={e => {
                        setFormData({...formData, rekening: e.target.value});
                        validateField('rekening', e.target.value);
                      }}
                    />
                    {fieldErrors.rekening && <p className="text-xs text-red-500 font-medium">{fieldErrors.rekening}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Mengirim Data...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Saya Siap Gabung & Mulai Sekarang
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
