
import React, { useState, useEffect } from 'react';
import VoltageInfographic from './components/VoltageInfographic';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleOpenSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] pb-24 font-['Fredoka'] selection:bg-blue-200">
      {/* Cinematic Header */}
      <header className="relative bg-gradient-to-b from-[#00A0E9] to-[#007BB5] text-white pt-24 pb-32 px-6 rounded-b-[5rem] shadow-[0_20px_60px_rgba(0,160,233,0.3)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/30 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-5 py-1.5 rounded-full font-black text-xs mb-8 shadow-xl uppercase tracking-widest border-2 border-white transform -rotate-1">
            <i className="fas fa-rocket"></i> Future Science Academy
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-[0.9] drop-shadow-lg">
            Den <span className="text-yellow-300">Gyllene</span> Trion
          </h1>
          <p className="text-blue-50 text-xl md:text-3xl font-medium max-w-3xl mx-auto leading-relaxed">
            Spänning, Ström och Resistans – de tre vännerna som får allt att fungera!
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-20 space-y-16 relative z-20">
        {/* Connection explanation cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-t-8 border-blue-400 hover:scale-105 transition-transform">
             <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 text-3xl">
               <i className="fas fa-bolt"></i>
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-3">1. Spänning (V)</h3>
             <p className="text-slate-600 font-medium">Tänk på detta som <b>trycket</b> i en vattenledning. Ju mer spänning, desto hårdare "knuffas" energin framåt.</p>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-t-8 border-green-400 hover:scale-105 transition-transform">
             <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 text-3xl">
               <i className="fas fa-water"></i>
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-3">2. Ström (I)</h3>
             <p className="text-slate-600 font-medium">Detta är själva <b>flödet</b>. Hur många elektroner som faktiskt susar förbi varje sekund.</p>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-t-8 border-red-400 hover:scale-105 transition-transform">
             <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 text-3xl">
               <i className="fas fa-hand-paper"></i>
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-3">3. Resistans (R)</h3>
             <p className="text-slate-600 font-medium"><b>Motståndet</b>! Som en smal del i röret som gör det svårare för energin att ta sig fram.</p>
          </div>
        </section>

        {/* Interactive Gadget Section */}
        <VoltageInfographic />

        {/* Deep Dive Section */}
        <section className="bg-white/95 backdrop-blur-xl p-12 rounded-[4rem] shadow-2xl border border-white relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-14">
            <div className="flex-1">
              <h3 className="text-4xl font-black text-slate-800 mb-6">Hur hänger de ihop?</h3>
              <div className="space-y-6 text-slate-600 text-xl leading-relaxed">
                <p>
                  Ett geni vid namn <b>Georg Simon Ohm</b> upptäckte att om man ökar motståndet (Resistans) så minskar flödet (Ström), så länge trycket (Spänning) är detsamma.
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-center gap-8 shadow-inner">
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-600">I = V / R</div>
                    <div className="text-xs uppercase font-bold text-blue-400 mt-2">Ohm's Lag</div>
                  </div>
                  <div className="text-sm font-medium italic text-slate-500 max-w-[200px]">
                    "Strömmen är lika med spänningen delat med motståndet"
                  </div>
                </div>
              </div>
            </div>
            <div className="w-64 h-64 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
               <i className="fas fa-equals text-7xl text-white"></i>
            </div>
          </div>
        </section>

        {/* AI Creative Section */}
        {!hasKey ? (
          <section className="bg-gradient-to-br from-[#1A237E] to-[#3949AB] p-16 rounded-[5rem] shadow-[0_30px_100px_rgba(26,35,126,0.4)] text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full -mr-40 -mt-40 blur-[100px] animate-pulse"></div>
            <h3 className="text-5xl font-black mb-8 tracking-tight">Gör egna experiment!</h3>
            <p className="text-2xl opacity-80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Använd vår <span className="text-yellow-300 font-black">AI-Kamera</span> för att skapa bilder av spännande elektriska uppfinningar.
            </p>
            <button 
              onClick={handleOpenSelectKey}
              className="bg-yellow-400 text-blue-900 hover:bg-white hover:text-blue-600 px-14 py-6 rounded-full text-3xl font-black shadow-2xl transition-all active:scale-95 transform hover:-translate-y-2 border-b-8 border-yellow-600"
            >
              HÄMTA KAMERAN <i className="fas fa-camera-retro ml-3"></i>
            </button>
          </section>
        ) : (
          <ImageGenerator />
        )}
      </main>

      <footer className="mt-32 py-20 border-t-8 border-blue-50 text-center bg-white/50">
        <p className="text-slate-400 font-black tracking-widest uppercase text-sm">© {new Date().getFullYear()} Future Science Lab</p>
      </footer>
    </div>
  );
};

export default App;
