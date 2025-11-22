import React from 'react';
import { Plus, Minus, Atom, Zap, Circle, RotateCcw, ArrowDown } from 'lucide-react';

interface ControlsProps {
  protons: number;
  setProtons: (n: number) => void;
  neutrons: number;
  setNeutrons: (n: number) => void;
  electrons: number;
  setElectrons: (n: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  protons, setProtons,
  neutrons, setNeutrons,
  electrons, setElectrons
}) => {
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* Industrial decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 opacity-50"></div>

      {/* Protons Control - The Plunger */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-red-500/20 transition-colors hover:border-red-500/40">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-xs">
                <Atom size={16} /> Proton Plunger
            </div>
            <span className="font-mono text-2xl text-white">{protons}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setProtons(Math.max(0, protons - 1))}
            className="flex-1 h-12 rounded-lg bg-slate-700 hover:bg-red-900/30 border border-slate-600 hover:border-red-500/50 text-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            aria-label="Remove Proton"
          >
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            <span className="font-bold text-sm hidden sm:inline">Release</span>
          </button>
          <button 
             onClick={() => setProtons(protons + 1)}
             className="flex-[2] h-12 rounded-lg bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 border-t border-red-400 text-white shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
             aria-label="Add Proton"
          >
            <Plus size={20} strokeWidth={3} />
            <span className="font-black uppercase tracking-wide">Plunge</span>
          </button>
        </div>
      </div>

      {/* Neutrons Control - The Injector */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20 transition-colors hover:border-blue-500/40">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-xs">
                <Circle size={16} /> Neutron Injector
            </div>
            <span className="font-mono text-2xl text-white">{neutrons}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setNeutrons(Math.max(0, neutrons - 1))}
            className="flex-1 h-12 rounded-lg bg-slate-700 hover:bg-blue-900/30 border border-slate-600 hover:border-blue-500/50 text-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            aria-label="Remove Neutron"
          >
            <Minus size={18} />
            <span className="font-bold text-sm hidden sm:inline">Drain</span>
          </button>
          <button 
             onClick={() => setNeutrons(neutrons + 1)}
             className="flex-[2] h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border border-blue-400/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
             aria-label="Add Neutron"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold uppercase tracking-wide">Inject</span>
          </button>
        </div>
      </div>

      {/* Electrons Control - The Basket */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-green-500/20 relative overflow-hidden transition-colors hover:border-green-500/40">
         {/* Basket Background Effect */}
         <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
         
         <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-wider text-xs">
                <Zap size={16} /> Electron Basket
            </div>
            <span className="font-mono text-2xl text-white">{electrons}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
           {/* Remove Button - Now Proper Styled Button */}
           <button 
             onClick={() => setElectrons(Math.max(0, electrons - 1))}
             className="h-14 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-600 hover:border-green-500/30 text-slate-400 hover:text-white transition-all active:scale-95 flex flex-col items-center justify-center gap-1 group"
             aria-label="Remove Electron"
           >
             <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
             <span className="text-[10px] font-bold uppercase">Return</span>
           </button>
           
           {/* Add Button - Kept fancy but adjusted size */}
           <button 
             onClick={() => setElectrons(electrons + 1)}
             className="h-14 rounded-xl bg-gradient-to-br from-green-900/80 to-green-800/80 hover:from-green-600 hover:to-green-500 border border-green-500/30 hover:border-green-300 text-green-300 hover:text-white transition-all active:scale-95 flex flex-col items-center justify-center gap-1 shadow-lg shadow-green-900/20 group"
             aria-label="Add Electron"
           >
             <Zap size={20} className="fill-current group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-bold uppercase tracking-wide">Add to Shell</span>
           </button>
        </div>
      </div>

    </div>
  );
};

export default Controls;