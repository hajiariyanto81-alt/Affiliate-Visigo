import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, MessageCircle } from 'lucide-react';

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
}

export const SuccessMessage = ({ onClose, formData }: { onClose: () => void, formData: FormData }) => {
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
            href={`https://wa.me/6281296921892?text=${encodeURIComponent(
              "KONFIRMASI PENDAFTARAN VISIGO\n\n" +
              "Nama: " + formData.nama + "\n" +
              "WhatsApp: " + formData.whatsapp + "\n" +
              "Domisili: " + formData.domisili + "\n" +
              "Umur: " + formData.umur + "\n" +
              "Sosmed: " + formData.sosmed.join(', ') + "\n" +
              "Username: " + formData.username + "\n" +
              "Alasan: " + formData.alasan + "\n" +
              "Siap Share: " + formData.siapShare + "\n" +
              "Komunitas: " + formData.komunitas + "\n" +
              "Bank/E-Wallet: " + formData.bankName + "\n" +
              "No. Rekening: " + formData.rekening + "\n\n" +
              "Terima kasih admin!"
            )}`}
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
