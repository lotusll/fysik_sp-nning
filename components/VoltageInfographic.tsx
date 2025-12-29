
import React, { useState, useEffect, useRef } from 'react';
import { THEME } from '../constants';

const VoltageInfographic: React.FC = () => {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(10);
  const [isLampOn, setIsLampOn] = useState(false);
  const [electrons, setElectrons] = useState<{ id: number; x: number; y: number }[]>([]);
  const requestRef = useRef<number>(0);

  // Ohm's Law: I = V / R
  const current = (voltage / Math.max(0.1, resistance)).toFixed(2);

  useEffect(() => {
    const initialElectrons = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 500,
      y: 0
    }));
    setElectrons(initialElectrons);
  }, []);

  const animate = () => {
    if (isLampOn && voltage > 0) {
      setElectrons(prev => prev.map(e => {
        // Speed is now based on CURRENT (Flow), not just Voltage
        // Base speed + a factor of the current
        const speed = 0.2 + (parseFloat(current) * 2);
        let newX = e.x + speed;
        if (newX > 500) newX = 0;
        return { ...e, x: newX };
      }));
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isLampOn, voltage, resistance]);

  const presets = [
    { label: "Litet batteri", v: 1.5, r: 2, icon: "🔋" },
    { label: "Kraftfullt Lab", v: 24, r: 10, icon: "⚡" },
    { label: "Hög resistans", v: 230, r: 100, icon: "🛡️" }
  ];

  return (
    <div className="bg-white rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,160,233,0.15)] border-b-[12px] border-blue-100 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-50 rounded-full blur-[80px] opacity-60"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <header className="mb-8">
            <h2 className="text-4xl font-black text-blue-600 flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl shadow-[0_8px_0_#B8860B] flex items-center justify-center transform -rotate-3">
                <i className="fas fa-microchip text-white text-2xl"></i>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-blue-400 mb-1 font-bold">Ohm's Lag Simulator</span>
                Krets-Labbet
              </div>
            </h2>
          </header>
          
          <div className="relative w-full aspect-[16/9] bg-[#F8FDFF] rounded-[2.5rem] border-4 border-white shadow-inner flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <div className="w-full h-full relative">
              {/* Battery */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 md:w-28 h-32 md:h-44 bg-slate-800 rounded-[2rem] border-t-8 border-slate-600 shadow-2xl flex flex-col items-center justify-between p-4 z-10">
                <div className="text-[10px] text-blue-400 font-black tracking-widest uppercase">PUMP (V)</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: Math.min(15, Math.ceil(voltage/5) + 2) }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60A5FA]"></div>
                  ))}
                </div>
                <div className="text-white font-black text-lg">{voltage}V</div>
              </div>

              {/* Dynamic Wire with Resistance Pinch */}
              <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
                {/* Main Path */}
                <path 
                  d="M 100 150 L 250 150 L 250 80 L 450 80 L 450 150 L 600 150" 
                  fill="none" 
                  stroke="#334155" 
                  strokeWidth={Math.max(4, 20 - (resistance / 5))}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                {/* Resistance Visual (The Pinch) */}
                <circle cx="350" cy="80" r={Math.min(25, 10 + resistance/4)} fill="#EF4444" opacity="0.2" />
                <path d="M 330 80 L 370 80" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
              </svg>

              {/* Labels for components */}
              <div className="absolute left-[350px] top-[40px] -translate-x-1/2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black shadow-sm">
                 MOTSTÅND (Ω)
              </div>

              {/* Lamp */}
              <div className="absolute left-[80%] top-[40%] -translate-x-1/2 flex flex-col items-center z-20">
                <div 
                  className={`w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl relative transition-all duration-700 ${isLampOn && voltage > 0 ? 'bg-yellow-200' : 'bg-slate-200'}`}
                  style={{ 
                    filter: isLampOn ? `drop-shadow(0 0 ${parseFloat(current) * 10}px #FDE047)` : 'none',
                    opacity: isLampOn ? 0.5 + Math.min(0.5, parseFloat(current)/2) : 1
                  }}
                >
                  {isLampOn && voltage > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-lightbulb text-4xl text-yellow-600"></i>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-800 rounded-t-lg"></div>
                </div>
              </div>

              {/* Particles Flowing */}
              {isLampOn && voltage > 0 && electrons.map(e => (
                <div 
                  key={e.id}
                  className="absolute w-3 h-3 bg-blue-300 rounded-full shadow-[0_0_10px_#00A0E9] border-2 border-white pointer-events-none"
                  style={{
                    left: `${100 + e.x}px`,
                    top: e.x < 150 ? '148px' : e.x < 220 ? `${148 - (e.x - 150)}px` : e.x < 420 ? '78px' : '148px', // Simplified path tracking
                    transform: 'translate(-50%, -50%)',
                    zIndex: 25,
                    opacity: 0.8
                  }}
                />
              ))}

              {/* Real-time Display */}
              <div className="absolute bottom-6 right-6 flex gap-4">
                <div className="bg-white/90 p-4 rounded-3xl shadow-xl border-2 border-blue-100 flex flex-col items-center min-w-[100px]">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Ström (Flow)</span>
                  <span className="text-2xl font-black text-blue-600">{current}A</span>
                </div>
                <div className="bg-white/90 p-4 rounded-3xl shadow-xl border-2 border-red-100 flex flex-col items-center min-w-[100px]">
                  <span className="text-[10px] text-red-400 font-bold uppercase">Motstånd</span>
                  <span className="text-2xl font-black text-red-600">{resistance}Ω</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:w-80 flex flex-col gap-6">
          <div className="bg-[#F0F9FF] p-6 rounded-[2.5rem] shadow-sm border-2 border-white">
            <label className="block text-blue-900 font-black mb-2 flex justify-between">
              Spänning (Volt) <span>{voltage}V</span>
            </label>
            <input 
              type="range" min="0" max="230" step="1"
              value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value))}
              className="w-full h-4 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-600 mb-6"
            />

            <label className="block text-red-700 font-black mb-2 flex justify-between">
              Resistans (Ohm) <span>{resistance}Ω</span>
            </label>
            <input 
              type="range" min="1" max="100" step="1"
              value={resistance} onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full h-4 bg-red-100 rounded-full appearance-none cursor-pointer accent-red-500 mb-6"
            />

            <div className="space-y-2">
              {presets.map(p => (
                <button 
                  key={p.label}
                  onClick={() => { setVoltage(p.v); setResistance(p.r); }}
                  className="w-full py-2 px-4 rounded-xl text-xs font-black flex items-center gap-2 bg-white text-blue-600 border border-blue-50 hover:shadow-md transition-all"
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsLampOn(!isLampOn)}
            className={`py-8 rounded-[2.5rem] text-3xl font-black tracking-widest transition-all active:scale-95 shadow-2xl border-b-[10px] ${
              isLampOn 
              ? 'bg-red-500 hover:bg-red-600 text-white border-red-800' 
              : 'bg-yellow-400 hover:bg-yellow-500 text-blue-900 border-yellow-600'
            }`}
          >
            {isLampOn ? 'STOPP' : 'STARTA'}
          </button>

          <div className="bg-blue-900 text-white p-6 rounded-[2rem] text-sm">
            <h4 className="font-black mb-2 flex items-center gap-2">
              <i className="fas fa-brain text-yellow-400"></i> Kom ihåg!
            </h4>
            <p className="opacity-80">
              Högre <b>Spänning</b> ökar flödet. <br/>
              Högre <b>Resistans</b> bromsar flödet. <br/>
              Resultatet blir <b>Strömstyrkan</b>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoltageInfographic;
