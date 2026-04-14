/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Wallet, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Clock, 
  Users, 
  GraduationCap,
  ChevronDown,
  X,
  Send,
  Upload,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

// --- Types ---
interface FormData {
  nama: string;
  whatsapp: string;
  domisili: string;
  umur: string;
  sosmed: string[];
  username: string;
  alasan: string;
  siapShare: string;
  komunitas: string;
  foto?: string; // Base64 string
  fotoName?: string;
}

// --- Components ---

const SocialProof = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  const notifications = [
    { name: "Budi", area: "Tuban" },
    { name: "Siti", area: "Bojonegoro" },
    { name: "Agus", area: "Lamongan" },
    { name: "Dewi", area: "Rembang" },
    { name: "Eko", area: "Blora" },
    { name: "Rina", area: "Purwodadi" },
    { name: "Joko", area: "Sragen" },
    { name: "Lani", area: "Jogjakarta" },
    { name: "Hadi", area: "Purworejo" },
    { name: "Maya", area: "Gunungkidul" },
    { name: "Wahyu", area: "Wonogiri" },
    { name: "Indra", area: "Demak" },
    { name: "Sari", area: "Tuban" },
    { name: "Rian", area: "Bojonegoro" },
    { name: "Nina", area: "Lamongan" },
  ];

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 5000);
    
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 1000);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [notifications.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-[60] bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 border border-slate-100 max-w-[280px] hidden sm:flex"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {notifications[current].name} baru saja mendaftar!
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Area: {notifications[current].area}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-slate-400 font-medium">
                Baru saja
              </p>
            </div>
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-slate-300 hover:text-slate-500"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co.com/KxfSqqkx/VISIGO-LOGO.png" 
            alt="VisiGo Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Cara Kerja</a>
          <a href="#keuntungan" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Keuntungan</a>
          <a href="#daftar" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Gabung Sekarang</a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onJoinClick }: { onJoinClick: () => void }) => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-3xl" />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
          Affiliate Program VisiGo
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Mau Punya Penghasilan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Tambahan Tanpa Modal?
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          Sekarang kamu bisa hasilkan uang hanya dari HP dengan jadi Affiliate VisiGo — layanan cek mata ke rumah yang lagi banyak dibutuhkan.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onJoinClick}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group"
          >
            Gabung Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="https://wa.me/6281296921892?text=Halo%20admin%20VisiGo,%20saya%20tertarik%20ingin%20mendaftar%20menjadi%20Affiliate%20VisiGo.%20Mohon%20info%20selanjutnya%20ya."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-primary/20 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            Chat WhatsApp
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 relative max-w-4xl mx-auto"
      >
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://i.ibb.co.com/XkJctDzg/aff.png" 
            alt="VisiGo Affiliate" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 text-left text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="user" />
                ))}
              </div>
              <span className="text-sm font-medium">500+ Orang sudah bergabung</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Problem = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Banyak orang pengen nambah penghasilan...
          </h2>
          <div className="space-y-6">
            {[
              { icon: Wallet, text: "Gak punya modal untuk stok barang" },
              { icon: HelpCircle, text: "Gak tahu harus mulai dari mana" },
              { icon: Smartphone, text: "Takut ribet jualan & urus pengiriman" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-lg text-slate-700 font-medium pt-1">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <h3 className="text-2xl font-bold mb-8">Padahal mereka punya aset berharga:</h3>
          <ul className="space-y-6">
            {[
              { label: "WhatsApp", desc: "Ratusan kontak yang butuh solusi" },
              { label: "Instagram", desc: "Follower yang aktif setiap hari" },
              { label: "Teman & Relasi", desc: "Jaringan kepercayaan yang luas" }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="block font-bold text-lg">{item.label}</span>
                  <span className="text-white/70 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Di sinilah VisiGo hadir.</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Kamu gak perlu jualan produk fisik. Cukup bantu orang booking layanan cek mata ke rumah.
        </p>
      </div>
      
      <div className="relative">
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Tugas Kamu</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Cukup share informasi dan bantu orang yang butuh cek mata untuk booking jadwal lewat link kamu.
            </p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Tugas Tim VisiGo</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Kami yang handle semuanya: dari cek mata profesional, penyediaan kacamata, hingga pengiriman ke rumah customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Results = () => (
  <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Bayangin Potensi Penghasilanmu...</h2>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Share ke 10 Orang", icon: Share2 },
          { title: "3 Orang Booking", icon: CheckCircle2 },
          { title: "Dapet Komisi Langsung", icon: Wallet }
        ].map((item, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <item.icon className="w-12 h-12 mx-auto mb-6 text-white/80" />
            <h3 className="text-xl font-bold">{item.title}</h3>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        {["Tanpa stok barang", "Tanpa ribet", "Bisa dari rumah"].map((text, i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full font-bold">
            <TrendingUp className="w-5 h-5" />
            {text}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="cara-kerja" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cara Kerja Simple & Jelas</h2>
        <p className="text-slate-600">Hanya butuh 5 langkah untuk mulai menghasilkan</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {[
          { step: "01", title: "Daftar", desc: "Jadi affiliate resmi" },
          { step: "02", title: "Materi", desc: "Dapat link & konten" },
          { step: "03", title: "Share", desc: "Ke WA / IG / TikTok" },
          { step: "04", title: "Booking", desc: "Orang pesan layanan" },
          { step: "05", title: "Cuan", desc: "Komisi cair! 💸" }
        ].map((item, i) => (
          <div key={i} className="relative group">
            <div className="text-6xl font-black text-slate-100 absolute -top-4 -left-2 group-hover:text-primary/10 transition-colors">
              {item.step}
            </div>
            <div className="relative pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="keuntungan" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Keuntungan Gabung VisiGo</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: Wallet, title: "Komisi Tiap Transaksi", desc: "Pendapatan pasti dari setiap closing." },
          { icon: Smartphone, title: "Cuma Pakai HP", desc: "Gak perlu laptop, semua bisa dari genggaman." },
          { icon: Clock, title: "Fleksibel", desc: "Kerja kapan saja dan dari mana saja." },
          { icon: Users, title: "Market Luas", desc: "Semua orang butuh cek mata secara rutin." },
          { icon: GraduationCap, title: "Dibimbing Sampai Bisa", desc: "Dapat pelatihan & strategi jualan." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Qualifications = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Siapa yang Kami Cari?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Aktif di Media Sosial",
            "Punya Relasi Luas",
            "Bisa Komunikasi",
            "Mau Belajar & Action"
          ].map((text, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-lg">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AffiliateForm = ({ onSubmitSuccess }: { onSubmitSuccess: (data: FormData) => void }) => {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    whatsapp: '',
    domisili: '',
    umur: '',
    sosmed: [],
    username: '',
    alasan: '',
    siapShare: '',
    komunitas: '',
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

  const handleCheckbox = (value: string) => {
    const newSosmed = formData.sosmed.includes(value) 
      ? formData.sosmed.filter(s => s !== value)
      : [...formData.sosmed, value];
    
    setFormData(prev => ({ ...prev, sosmed: newSosmed }));
    validateField('sosmed', newSosmed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const errors: Record<string, string> = {};
    const requiredFields = ['nama', 'whatsapp', 'domisili', 'umur', 'foto', 'username', 'alasan', 'siapShare', 'komunitas'];
    
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
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Submitting form data...", { ...formData, foto: formData.foto ? "Base64 string present" : "Missing" });
      
      const response = await fetch('/api/submit-affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      let result;
      const responseText = await response.text();
      
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Response is not JSON:", responseText);
        throw new Error(`Server Error (${response.status}): Respon tidak valid. Pastikan Google Script sudah di-deploy sebagai 'Anyone'.`);
      }
      
      if (result.success) {
        console.log("Submission successful!");
        onSubmitSuccess(formData);
      } else {
        console.error("Submission failed:", result);
        setError("Gagal mengirim data: " + (result.message || "Cek konfigurasi Google Script kamu."));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
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
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Data Wajib
              </h3>
              
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
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Profil Sosial
              </h3>
              
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
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Validasi Minat
              </h3>
              
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
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
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

const Footer = () => (
  <footer className="py-12 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center mb-6">
        <img 
          src="https://i.ibb.co.com/KxfSqqkx/VISIGO-LOGO.png" 
          alt="VisiGo Logo" 
          className="h-8 w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-slate-500 text-sm">© 2026 VisiGo Indonesia. Semua hak dilindungi.</p>
    </div>
  </footer>
);

const SuccessMessage = ({ onClose, formData }: { onClose: () => void, formData: FormData }) => {
  const handleWhatsApp = () => {
    const message = `*PENDAFTARAN AFFILIATE VISIGO*\n\nHalo admin VisiGo, saya sudah mengisi form pendaftaran dan siap untuk mulai menghasilkan!\n\n*Data Pendaftar:*\n- Nama: ${formData.nama}\n- WhatsApp: ${formData.whatsapp}\n- Domisili: ${formData.domisili}\n- Umur: ${formData.umur || '-'}\n- Sosmed: ${formData.sosmed.join(', ')}\n\nMohon segera diproses ya admin, terima kasih!`;
    window.open(`https://wa.me/6281296921892?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Terima kasih sudah mendaftar. Data kamu sudah kami terima di sistem. Silakan klik tombol di bawah untuk konfirmasi ke Admin via WhatsApp.
        </p>
        
        <div className="space-y-3">
          <a 
            href={`https://wa.me/6281296921892?text=${encodeURIComponent(`*PENDAFTARAN AFFILIATE VISIGO*\n\nHalo admin VisiGo, saya sudah mengisi form pendaftaran dan siap untuk mulai menghasilkan!\n\n*Data Pendaftar:*\n- Nama: ${formData.nama}\n- WhatsApp: ${formData.whatsapp}\n- Domisili: ${formData.domisili}\n- Umur: ${formData.umur || '-'}\n- Sosmed: ${formData.sosmed.join(', ')}\n\nMohon segera diproses ya admin, terima kasih!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-5 bg-green-500 text-white rounded-2xl font-bold text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 no-underline"
          >
            <MessageCircle className="w-6 h-6" />
            Konfirmasi via WhatsApp
          </a>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    document.getElementById('daftar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuccess = (data: FormData) => {
    setSubmittedData(data);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen">
      <SocialProof />
      <Navbar />
      <Hero onJoinClick={scrollToForm} />
      <Problem />
      <Solution />
      <Results />
      <HowItWorks />
      <Benefits />
      <Qualifications />
      
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Jangan cuma jadi penonton.</h2>
          <p className="text-xl text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Mulai hasilkan dari peluang yang ada di depan mata kamu sekarang.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-primary-dark shadow-2xl shadow-primary/30"
            >
              Daftar Sekarang
            </button>
          </div>
          <p className="mt-8 text-red-500 font-bold flex items-center justify-center gap-2 animate-pulse">
            <Clock className="w-5 h-5" />
            ⚠️ Slot affiliate terbatas minggu ini!
          </p>
        </div>
      </section>

      <AffiliateForm onSubmitSuccess={handleSuccess} />
      
      <Footer />

      <AnimatePresence>
        {showSuccess && submittedData && (
          <SuccessMessage 
            onClose={() => setShowSuccess(false)} 
            formData={submittedData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
