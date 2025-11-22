export interface ElementData {
  number: number;
  name: string;
  symbol: string;
  mass: number; // Most common isotope mass for simplicity in defaults
}

export enum AtomMood {
  Happy = 'Happy', // Neutral
  Excited = 'Excited', // Full valence
  Worried = 'Worried', // Unstable isotope
  Grumpy = 'Grumpy', // Ionized (positive or negative charge)
  Confused = 'Confused' // Impossible state (e.g. 0 protons)
}

export interface Particle {
  id: string;
  type: 'proton' | 'neutron' | 'electron';
  angle?: number; // For electron orbit position
  shellIndex?: number;
}
