import React, { useState, useEffect } from 'react';
import { ELEMENTS, MAX_PROTONS, SHELL_CAPACITIES } from './constants';
import { AtomMood, ElementData } from './types';
import AtomVisualizer from './components/AtomVisualizer';
import Controls from './components/Controls';
import MoodMeter from './components/MoodMeter';
import { explainAtom } from './services/geminiService';
import { Sparkles, BookOpen, RefreshCw, Layers } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  // Default: Carbon-12 (6p, 6n, 6e)
  const [protons, setProtons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  
  const [mood, setMood] = useState<AtomMood>(AtomMood.Happy);
  const [explanation, setExplanation] = useState<string>("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // --- Derived State Calculations ---
  
  const element: ElementData = ELEMENTS[protons] || { 
    number: protons, 
    name: protons === 0 ? 'Neutronium?' : `Element ${protons}`, 
    symbol: protons === 0 ? '?' : 'X', 
    mass: protons + neutrons 
  };

  const charge = protons - electrons;
  const massNumber = protons + neutrons;
  
  // Calculate Shell Distribution
  const shells: number[] = [];
  let remainingElectrons = electrons;
  for (const capacity of SHELL_CAPACITIES) {
    if (remainingElectrons <= 0) break;
    const inShell = Math.min(remainingElectrons, capacity);
    shells.push(inShell);
    remainingElectrons -= inShell;
  }
  // Handle overflow electrons
  if (remainingElectrons > 0) {
      shells.push(remainingElectrons);
  }

  const valence = shells.length > 0 ? shells[shells.length - 1] : 0;
  const isFullValence = shells.length > 0 && valence === SHELL_CAPACITIES[shells.length - 1];

  // Generate Electron Configuration String (Simplified for K8/K9 - filling order)
  // 1s, 2s, 2p, 3s, 3p... (Simplified mapping)
  const getElectronConfig = (e: number) => {
      if (e === 0) return "-";
      let config = "";
      let rem = e;
      
      // 1s (2)
      const s1 = Math.min(rem, 2);
      if (s1 > 0) config += `1s${s1}`;
      rem -= s1;
      
      // 2s (2)
      if (rem > 0) {
          const s2 = Math.min(rem, 2);
          config += ` 2s${s2}`;
          rem -= s2;
      }

      // 2p (6)
      if (rem > 0) {
          const p2 = Math.min(rem, 6);
          config += ` 2p${p2}`;
          rem -= p2;
      }

      // 3s (2)
      if (rem > 0) {
          const s3 = Math.min(rem, 2);
          config += ` 3s${s3}`;
          rem -= s3;
      }

      // 3p (6)
      if (rem > 0) {
          const p3 = Math.min(rem, 6);
          config += ` 3p${p3}`;
          rem -= p3;
      }

       // 4s (2)
       if (rem > 0) {
        const s4 = Math.min(rem, 2);
        config += ` 4s${s4}`;
        rem -= s4;
        }

      return config;
  };

  // --- Effects ---

  // Mood Logic
  useEffect(() => {
    if (protons === 0) {
      setMood(AtomMood.Confused);
      return;
    }

    // Stability ratio (simplified zone of stability for gameplay)
    const ratio = neutrons / protons;
    const isIsotopeUnstable = (protons > 1 && (ratio < 0.8 || ratio > 1.5)); 

    if (isIsotopeUnstable) {
      setMood(AtomMood.Worried);
    } else if (charge !== 0) {
      setMood(AtomMood.Grumpy);
    } else if (isFullValence) {
      setMood(AtomMood.Excited);
    } else {
      setMood(AtomMood.Happy);
    }
  }, [protons, neutrons, electrons, charge, isFullValence]);

  // --- Handlers ---

  const handleAskProfessor = async () => {
    setLoadingExplanation(true);
    setShowExplanation(true);
    const text = await explainAtom(
        element.name,
        protons,
        neutrons,
        electrons,
        mood
    );
    setExplanation(text);
    setLoadingExplanation(false);
  };

  const handleReset = () => {
      setProtons(6);
      setNeutrons(6);
      setElectrons(6);
      setExplanation("");
      setShowExplanation(false);
  };

  // Prevent exceeding visual limits
  const handleSetProtons = (n: number) => {
    if (n >= 0 && n <= MAX_PROTONS) setProtons(n);
  };
  const handleSetElectrons = (n: number) => {
    if (n >= 0 && n <= MAX_PROTONS + 10) setElectrons(n);
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white font-sans selection:bg-purple-500/30 relative overflow-x-hidden">
      
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
         <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden">
        
        {/* Left Panel: Periodic Tile & Mood */}
        <div className="lg:w-80 p-6 flex flex-col gap-6 bg-slate-900/60 backdrop-blur-md border-r border-white/10 overflow-y-auto z-30 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">B</div>
             <div>
                <h1 className="text-lg font-black tracking-tight leading-none text-white">
                    Atomic Playground
                </h1>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Bohr Model Mixer</p>
             </div>
          </div>

          {/* Periodic Table Tile - The "Card" */}
          <div className="relative group perspective w-full aspect-[4/5]">
             <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 rounded-lg shadow-2xl flex flex-col p-4 relative overflow-hidden">
                {/* Atomic Number */}
                <div className="absolute top-3 left-4 text-3xl font-mono font-bold text-slate-500">{element.number}</div>
                
                {/* Mass Number (Top Right) */}
                <div className="absolute top-3 right-4 text-lg font-mono font-bold text-slate-500 text-right">
                    {massNumber.toFixed(2)}
                    <div className="text-[8px] uppercase">Atomic Mass</div>
                </div>

                {/* Symbol */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-lg tracking-tighter">
                        {element.symbol}
                    </div>
                </div>

                {/* Name */}
                <div className="text-center pb-4">
                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                        {element.name}
                        {mood === AtomMood.Excited && <Sparkles size={16} className="text-yellow-300 animate-spin-slow" />}
                    </div>
                     {/* Electron Config Display */}
                    <div className="mt-2 text-xs font-mono text-indigo-300 bg-indigo-900/30 py-1 px-2 rounded inline-block border border-indigo-500/30">
                        {getElectronConfig(electrons)}
                    </div>
                    
                    {/* Shell Breakdown */}
                    <div className="mt-1 text-[10px] text-slate-400 font-mono">
                         Shells: {shells.join(' - ') || '0'}
                    </div>
                </div>
             </div>
          </div>

          {/* Mood Meter */}
          <MoodMeter mood={mood} charge={charge} valence={valence} />

        </div>

        {/* Center: Visualization */}
        <div className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/0 to-slate-900/40">
           
           {/* Top Bar Stats */}
           <div className="absolute top-0 left-0 w-full p-4 flex justify-center gap-8 pointer-events-none">
                <div className="flex flex-col items-center">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Mass Number</span>
                    <span className="text-2xl font-mono font-bold text-white">{massNumber}</span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="flex flex-col items-center">
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Net Charge</span>
                    <span className={`text-2xl font-mono font-bold ${charge === 0 ? 'text-green-400' : charge > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                        {charge > 0 ? '+' : ''}{charge}
                    </span>
                </div>
           </div>

           <AtomVisualizer 
              protons={protons}
              neutrons={neutrons}
              electrons={electrons}
              shellConfig={shells}
           />

           {/* Reset Action */}
           <button onClick={handleReset} className="absolute bottom-8 text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors bg-slate-900/50 px-4 py-2 rounded-full hover:bg-slate-800">
               <RefreshCw size={14}/> Reset Simulation
           </button>
        </div>

        {/* Right Panel: Controls & AI */}
        <div className="lg:w-96 p-6 bg-slate-900/60 backdrop-blur-md border-l border-white/10 flex flex-col justify-between z-30 shadow-2xl">
            
            {/* Control Section */}
            <div className="flex-1 flex flex-col justify-center gap-8">
                <div className="text-center">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
                        <Layers size={14} /> Particle Controls
                    </h2>
                    <Controls 
                    protons={protons} setProtons={handleSetProtons}
                    neutrons={neutrons} setNeutrons={setNeutrons}
                    electrons={electrons} setElectrons={handleSetElectrons}
                    />
                </div>

                {/* Legend */}
                <div className="bg-black/20 p-3 rounded-xl grid grid-cols-3 gap-2 text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
                        Proton (+)
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_blue]"></div>
                        Neutron (0)
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]"></div>
                        Electron (-)
                    </div>
                </div>
            </div>

            {/* Professor Button - Bottom */}
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-indigo-500/20 hover:border-indigo-500/50 transition-colors group cursor-pointer" onClick={handleAskProfessor}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                            <BookOpen size={20} className="text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-white">Analyze Atom</div>
                            <div className="text-xs text-indigo-300">Ask AI Professor Proton</div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Get a custom explanation of why {element.name} is acting {mood.toLowerCase()}!
                    </p>
                </div>
            </div>
        </div>

      </main>

      {/* Professor Overlay / Modal */}
      {showExplanation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowExplanation(false)}>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white rounded-3xl p-1 border border-white/10 max-w-lg w-full shadow-2xl transform transition-all scale-100 relative" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-slate-950/50 rounded-[20px] p-8">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-600 p-4 rounded-2xl shadow-lg border-4 border-slate-900">
                        <span className="text-4xl">👨‍🔬</span>
                    </div>
                    
                    <h3 className="text-xl font-black text-center mt-6 mb-2 text-indigo-400 uppercase tracking-wider">Professor Proton says:</h3>
                    
                    <div className="min-h-[100px] text-lg font-medium leading-relaxed text-center text-slate-200">
                        {loadingExplanation ? (
                            <div className="flex justify-center gap-2 py-8">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0s'}}></div>
                                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.15s'}}></div>
                                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s'}}></div>
                            </div>
                        ) : (
                            explanation
                        )}
                    </div>

                    <button 
                        onClick={() => setShowExplanation(false)}
                        className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
                    >
                        Got it!
                    </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default App;