import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

interface AtomVisualizerProps {
  protons: number;
  neutrons: number;
  electrons: number;
  shellConfig: number[];
}

const AtomVisualizer: React.FC<AtomVisualizerProps> = ({
  protons,
  neutrons,
  shellConfig,
}) => {
  // Generate particles for nucleus
  const nucleusParticles = useMemo(() => {
    const p: Particle[] = [];
    for (let i = 0; i < protons; i++) p.push({ id: `p-${i}`, type: 'proton' });
    for (let i = 0; i < neutrons; i++) p.push({ id: `n-${i}`, type: 'neutron' });
    
    // Shuffle for random clustering appearance
    return p.sort(() => Math.random() - 0.5);
  }, [protons, neutrons]);

  // Increased base radius to 100 to prevent nucleus overlap
  const getOrbitRadius = (shellIndex: number) => 100 + shellIndex * 60;

  // Calculate dynamic nucleus size
  const nucleusSize = Math.max(60, (protons + neutrons) * 4.5);

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center perspective-1000">
      
      {/* Strong Force Glow (Nucleus Background) */}
      <div 
        className="absolute z-10 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-600/20 blur-xl animate-pulse-fast"
        style={{ width: nucleusSize * 1.5, height: nucleusSize * 1.5 }}
      />

      {/* Nucleus Container */}
      <div className="relative z-20 flex flex-wrap content-center items-center justify-center rounded-full transition-all duration-500"
           style={{ width: `${nucleusSize}px`, height: `${nucleusSize}px` }}>
        
        {nucleusParticles.map((particle, i) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            layout
            className={`w-5 h-5 rounded-full border-2 shadow-lg m-0.5 relative overflow-hidden
              ${particle.type === 'proton' 
                ? 'bg-red-500 border-red-300 shadow-red-600/50 z-10' 
                : 'bg-blue-500 border-blue-300 shadow-blue-600/50'}`}
          >
            {/* Glossy shine on particle */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
            <div className="absolute bottom-1 right-1 text-[8px] font-bold text-white/60 opacity-50">
                {particle.type === 'proton' ? '+' : '0'}
            </div>
          </motion.div>
        ))}
        {nucleusParticles.length === 0 && (
          <div className="text-white/50 text-xs font-mono animate-pulse">Add Protons!</div>
        )}
      </div>

      {/* Electron Shells */}
      <div className="absolute inset-0 pointer-events-none">
        {shellConfig.map((electronCount, index) => {
          const radius = getOrbitRadius(index);
          const electronsInShell = Array.from({ length: electronCount });
          const isValence = index === shellConfig.length - 1;
          
          // Inner shells spin faster
          const duration = 8 + index * 4; 

          return (
            <div
              key={`shell-${index}`}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 border-2
                  ${isValence 
                    ? 'border-green-400/40 shadow-[0_0_20px_rgba(74,222,128,0.2)]' 
                    : 'border-cyan-100/20 border-dashed'
                  }`}
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
            >
               {/* Shell Label */}
               <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-2 z-10 shadow-lg
                   ${isValence ? 'bg-green-900/80 border-green-400 text-green-200' : 'bg-slate-800/60 border-slate-600 text-slate-400'}`}>
                   <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                       {isValence ? 'Valence' : `n=${index + 1}`}
                   </span>
                   {isValence && (
                        <span className="bg-green-400 text-green-900 px-1.5 rounded-sm text-[10px] font-black">
                            {electronCount}e⁻
                        </span>
                   )}
               </div>

               {/* Orbit Animation Container */}
               <div 
                className={`w-full h-full rounded-full ${index % 2 === 0 ? 'animate-spin-slow' : 'animate-spin-reverse-slow'}`}
                style={{ animationDuration: `${duration}s`}}
               >
                  {electronsInShell.map((_, eIdx) => {
                    // Distribute evenly
                    const angle = (eIdx / electronsInShell.length) * 2 * Math.PI;
                    const top = 50 + 50 * Math.sin(angle);
                    const left = 50 + 50 * Math.cos(angle);

                    return (
                      <motion.div
                        key={`e-${index}-${eIdx}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute w-4 h-4 -ml-2 -mt-2 z-30"
                        style={{
                          top: `${top}%`,
                          left: `${left}%`,
                        }}
                      >
                        {/* The Electron */}
                        <div className="w-full h-full rounded-full bg-green-300 shadow-[0_0_15px_#4ade80] border-2 border-white flex items-center justify-center">
                            <div className="text-[8px] font-bold text-green-800 leading-none">-</div>
                        </div>
                        
                        {/* Motion Trail / Probability Cloud effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400/20 rounded-full blur-md -z-10 animate-pulse-fast"></div>
                      </motion.div>
                    );
                  })}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AtomVisualizer;