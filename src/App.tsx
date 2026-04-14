import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  Users, 
  X,
  Clock,
  Loader2,
  Wallet,
  Home
} from 'lucide-react';

// --- Lazy Components ---
const Problem = lazy(() => import('./components/Sections').then(m => ({ default: m.Problem })));
const Solution = lazy(() => import('./components/Sections').then(m => ({ default: m.Solution })));
const Results = lazy(() => import('./components/Sections').then(m => ({ default: m.Results })));
const HowItWorks = lazy(() => import('./components/Sections').then(m => ({ default: m.HowItWorks })));
const Benefits = lazy(() => import('./components/Sections').then(m => ({ default: m.Benefits })));
const Qualifications = lazy(() => import('./components/Sections').then(m => ({ default: m.Qualifications })));
const AffiliateForm = lazy(() => import('./components/AffiliateForm').then(m => ({ default: m.AffiliateForm })));
const SuccessMessage = lazy(() => import('./components/SuccessMessage').then(m => ({ default: m.SuccessMessage })));
const CommissionChecker = lazy(() => import('./components/CommissionChecker').then(m => ({ default: m.CommissionChecker })));

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
  bankName: string;
  rekening: string;
  foto?: string;
  fotoName?: string;
}

// --- Loading Component ---
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

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

const Navbar = ({ onCheckBalance }: { onCheckBalance: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co.com/KxfSqqkx/VISIGO-LOGO.png" 
            alt="VisiGo Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-lg font-bold text-slate-900 tracking-tight hidden sm:block">
            AFFILIATE <span className="text-primary">VISIGO</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6">
          <a 
            href="https://visigo.id" 
            className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-slate-50"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Ke Website Utama</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Cara Kerja</a>
            <button 
              onClick={onCheckBalance}
              className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Cek Saldo
            </button>
            <a href="#daftar" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Gabung Sekarang</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onJoinClick, onCheckBalance }: { onJoinClick: () => void, onCheckBalance: () => void }) => (
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
          <button 
            onClick={onCheckBalance}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-primary/20 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Wallet className="w-5 h-5 text-primary" />
            Cek Saldo Komisi
          </button>
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

const Footer = () => (
  <footer className="py-12 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex flex-col items-center justify-center mb-6 gap-4">
        <img 
          src="https://i.ibb.co.com/KxfSqqkx/VISIGO-LOGO.png" 
          alt="VisiGo Logo" 
          className="h-8 w-auto object-contain"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <a 
          href="https://visigo.id" 
          className="text-sm font-bold text-primary hover:underline flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Kembali ke Website Utama (visigo.id)
        </a>
      </div>
      <p className="text-slate-500 text-sm">© 2026 VisiGo Indonesia. Semua hak dilindungi.</p>
    </div>
  </footer>
);

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showChecker, setShowChecker] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

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
      <Navbar onCheckBalance={() => setShowChecker(true)} />
      <Hero onJoinClick={scrollToForm} onCheckBalance={() => setShowChecker(true)} />
      
      <Suspense fallback={<SectionLoader />}>
        <Problem />
        <Solution />
        <Results />
        <HowItWorks />
        <Benefits />
        <Qualifications />
        
        <section className="py-20 bg-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Jangan cuma jadi penonton.</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
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
      </Suspense>
      
      <Footer />

      <Suspense fallback={null}>
        <AnimatePresence>
          {showSuccess && submittedData && (
            <SuccessMessage 
              onClose={() => setShowSuccess(false)} 
              formData={submittedData}
            />
          )}
          {showChecker && (
            <CommissionChecker onClose={() => setShowChecker(false)} />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
