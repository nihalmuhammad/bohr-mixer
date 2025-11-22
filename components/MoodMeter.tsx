import React from 'react';
import { AtomMood } from '../types';
import { Smile, Frown, Meh, Zap, AlertTriangle } from 'lucide-react';

interface MoodMeterProps {
  mood: AtomMood;
  charge: number;
  valence: number;
}

const MoodMeter: React.FC<MoodMeterProps> = ({ mood, charge, valence }) => {
  
  const getIcon = () => {
    switch (mood) {
      case AtomMood.Happy: return <Smile className="w-full h-full text-green-900" />;
      case AtomMood.Excited: return <Zap className="w-full h-full text-yellow-900" />;
      case AtomMood.Worried: return <AlertTriangle className="w-full h-full text-orange-900" />;
      case AtomMood.Grumpy: return <Frown className="w-full h-full text-red-900" />;
      case AtomMood.Confused: return <Meh className="w-full h-full text-gray-900" />;
      default: return <Meh className="w-full h-full" />;
    }
  };

  const getColor = () => {
    switch (mood) {
      case AtomMood.Happy: return 'bg-green-400 shadow-green-500/50';
      case AtomMood.Excited: return 'bg-yellow-400 shadow-yellow-500/50';
      case AtomMood.Worried: return 'bg-orange-400 shadow-orange-500/50';
      case AtomMood.Grumpy: return 'bg-red-400 shadow-red-500/50';
      default: return 'bg-gray-400';
    }
  };

  const getLabel = () => {
     switch(mood) {
         case AtomMood.Happy: return "Stable & Neutral";
         case AtomMood.Excited: return "Noble Gas Glow!";
         case AtomMood.Grumpy: return charge > 0 ? "Positive Ion!" : "Negative Ion!";
         case AtomMood.Worried: return "Unstable Isotope!";
         default: return "Confused";
     }
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Atom Mood</div>
      
      <div className={`relative w-24 h-24 rounded-full ${getColor()} shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center p-4 transition-all duration-500 animate-float`}>
        {getIcon()}
        {/* Glossy reflection */}
        <div className="absolute top-2 right-4 w-4 h-2 bg-white/60 rounded-full blur-[1px] -rotate-45"></div>
      </div>

      <div className="text-center mt-1">
        <div className="text-lg font-bold text-white">{mood}</div>
        <div className="text-xs text-slate-300">{getLabel()}</div>
      </div>

      <div className="mt-2 w-full pt-2 border-t border-white/10">
         <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Charge</span>
            <span className={`font-mono font-bold ${charge === 0 ? 'text-green-400' : 'text-red-400'}`}>
                {charge > 0 ? '+' : ''}{charge}
            </span>
         </div>
         <div className="flex justify-between text-xs">
            <span className="text-slate-400">Valence e⁻</span>
            <span className="font-mono font-bold text-blue-400">{valence}</span>
         </div>
      </div>
    </div>
  );
};

export default MoodMeter;
