import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Wallet, 
  HelpCircle, 
  CheckCircle2, 
  Share2, 
  TrendingUp, 
  Clock, 
  Users, 
  GraduationCap,
  MessageCircle
} from 'lucide-react';

export const Problem = () => (
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
                viewport={{ once: true, amount: 0.2 }}
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

export const Solution = () => (
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

export const Results = () => (
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

export const HowItWorks = () => (
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

export const Benefits = () => (
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

export const Qualifications = () => (
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

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: "Apakah pendaftaran Affiliate VisiGo gratis?",
      a: "Ya, pendaftaran 100% GRATIS tanpa biaya apapun. Kamu bisa langsung mulai setelah mendaftar dan mendapatkan ID Affiliate."
    },
    {
      q: "Bagaimana cara saya mendapatkan komisi?",
      a: "Kamu akan mendapatkan komisi setiap kali ada orang yang melakukan booking layanan cek mata ke rumah melalui referensi kamu dan transaksi tersebut selesai (berhasil)."
    },
    {
      q: "Kapan komisi saya akan dicairkan?",
      a: "Komisi akan diproses dan dicairkan secara rutin ke rekening bank atau e-wallet yang telah kamu daftarkan di formulir pendaftaran."
    },
    {
      q: "Apakah saya perlu stok kacamata atau alat cek mata?",
      a: "Tidak perlu. Kamu hanya fokus pada promosi dan mencari orang yang membutuhkan layanan. Tim profesional VisiGo yang akan datang ke rumah customer untuk melakukan pengecekan dan menyediakan kacamata."
    },
    {
      q: "Apakah ada target minimal penjualan setiap bulannya?",
      a: "Tidak ada target minimal. Kamu bebas menentukan kapan dan seberapa sering ingin mempromosikan layanan VisiGo. Semakin banyak yang booking, semakin besar cuan kamu!"
    },
    {
      q: "Bagaimana jika saya tidak punya pengalaman jualan?",
      a: "Tenang saja! Kami menyediakan materi promosi siap pakai dan bimbingan strategis untuk membantu kamu mulai menghasilkan pendapatan pertama kamu."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pertanyaan Populer (FAQ)</h2>
          <p className="text-slate-600">Punya pertanyaan? Mungkin jawabannya ada di sini.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="shrink-0"
                >
                  <HelpCircle className={`w-5 h-5 ${openIndex === i ? 'text-primary' : 'text-slate-400'}`} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-primary rounded-[2rem] text-white text-center shadow-xl shadow-primary/20"
        >
          <h3 className="text-xl font-bold mb-4">Masih punya pertanyaan lain?</h3>
          <p className="text-white/80 mb-8 text-sm">
            Gabung ke grup WhatsApp Affiliate VisiGo untuk diskusi langsung dengan tim kami dan affiliator lainnya.
          </p>
          <a 
            href="https://chat.whatsapp.com/H2INCmYxljRG548MK4hvyD?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Gabung Grup WhatsApp Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
};
