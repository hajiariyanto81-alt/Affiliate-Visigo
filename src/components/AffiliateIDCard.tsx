import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Download, QrCode, ShieldCheck, MapPin, User, Loader2 } from 'lucide-react';
import { domToPng } from 'modern-screenshot';

interface IDCardProps {
  name: string;
  id: string;
  domisili: string;
  photo?: string;
}

export const AffiliateIDCard = ({ name, id, domisili, photo }: IDCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCard = async () => {
    if (cardRef.current && !isDownloading) {
      setIsDownloading(true);
      try {
        // Wait a bit to ensure everything is rendered
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const dataUrl = await domToPng(cardRef.current, {
          quality: 1,
          scale: 3, // Higher scale for better quality
          backgroundColor: '#ffffff',
        });
        
        const link = document.createElement('a');
        link.download = `ID_CARD_${name.replace(/\s+/g, '_')}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating ID card:', error);
        alert('Gagal mendownload ID Card. Silakan coba lagi atau screenshot layar ini.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Hidden ID Card Container - Still in DOM for html2canvas */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div 
          ref={cardRef}
          style={{ 
            position: 'relative',
            width: '350px',
            height: '500px',
            backgroundColor: '#ffffff',
            borderRadius: '2rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #f1f5f9',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {/* Background Accents */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '160px',
              background: 'linear-gradient(to bottom right, #004E92, #003a6d)' 
            }}
          />
          <div 
            style={{ 
              position: 'absolute',
              top: '128px',
              left: 0,
              width: '100%',
              height: '80px',
              backgroundColor: '#ffffff',
              borderTopLeftRadius: '3rem',
              borderTopRightRadius: '3rem'
            }}
          />
          
          {/* Logo & Header */}
          <div style={{ position: 'relative', zIndex: 10, paddingTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="https://i.ibb.co.com/XxC5vKqD/VISIGO-LOGO.png" 
              alt="VisiGo Logo" 
              style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <p style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.2em', marginTop: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Official Affiliate</p>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', zIndex: 10, marginTop: '24px' }}>
            <div style={{ width: '128px', height: '128px', borderRadius: '9999px', border: '4px solid #ffffff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
              {photo ? (
                <img 
                  src={photo} 
                  alt={name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center 15%' // AI-like focus on head/face area
                  }} 
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                  <User style={{ width: '64px', height: '64px' }} />
                </div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', backgroundColor: '#22c55e', color: '#ffffff', padding: '6px', borderRadius: '9999px', border: '4px solid #ffffff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <ShieldCheck style={{ width: '20px', height: '20px' }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ position: 'relative', zIndex: 10, marginTop: '24px', textAlign: 'center', paddingLeft: '24px', paddingRight: '24px', width: '100%' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.25, textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#0f172a', margin: 0 }}>{name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px', fontWeight: 'bold', fontSize: '14px', color: '#64748b' }}>
              <MapPin style={{ width: '14px', height: '14px', color: '#004E92' }} />
              {domisili}
            </div>
            
            <div style={{ marginTop: '32px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px', backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px solid #f1f5f9', display: 'inline-block' }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', color: '#94a3b8', margin: 0 }}>Affiliate ID</p>
              <p style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.05em', color: '#004E92', margin: 0 }}>{id}</p>
            </div>
          </div>

          {/* Footer / QR */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#cbd5e1', margin: 0 }}>Verified by</p>
              <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', margin: 0 }}>VisiGo Indonesia</p>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
              <QrCode style={{ width: '40px', height: '40px', color: '#cbd5e1' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Download Button Only UI */}
      <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 w-full max-w-xs">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Download className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-slate-900 font-bold mb-2">ID Card Digital Siap!</h4>
        <p className="text-slate-500 text-xs mb-6">Klik tombol di bawah untuk mendownload kartu identitas resmi kamu.</p>
        <button 
          onClick={downloadCard}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sedang Memproses...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download PNG
            </>
          )}
        </button>
      </div>
    </div>
  );
};
