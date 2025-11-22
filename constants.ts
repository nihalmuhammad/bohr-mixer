import { ElementData } from './types';

export const ELEMENTS: Record<number, ElementData> = {
  1: { number: 1, name: 'Hydrogen', symbol: 'H', mass: 1 },
  2: { number: 2, name: 'Helium', symbol: 'He', mass: 4 },
  3: { number: 3, name: 'Lithium', symbol: 'Li', mass: 7 },
  4: { number: 4, name: 'Beryllium', symbol: 'Be', mass: 9 },
  5: { number: 5, name: 'Boron', symbol: 'B', mass: 11 },
  6: { number: 6, name: 'Carbon', symbol: 'C', mass: 12 },
  7: { number: 7, name: 'Nitrogen', symbol: 'N', mass: 14 },
  8: { number: 8, name: 'Oxygen', symbol: 'O', mass: 16 },
  9: { number: 9, name: 'Fluorine', symbol: 'F', mass: 19 },
  10: { number: 10, name: 'Neon', symbol: 'Ne', mass: 20 },
  11: { number: 11, name: 'Sodium', symbol: 'Na', mass: 23 },
  12: { number: 12, name: 'Magnesium', symbol: 'Mg', mass: 24 },
  13: { number: 13, name: 'Aluminium', symbol: 'Al', mass: 27 },
  14: { number: 14, name: 'Silicon', symbol: 'Si', mass: 28 },
  15: { number: 15, name: 'Phosphorus', symbol: 'P', mass: 31 },
  16: { number: 16, name: 'Sulfur', symbol: 'S', mass: 32 },
  17: { number: 17, name: 'Chlorine', symbol: 'Cl', mass: 35 },
  18: { number: 18, name: 'Argon', symbol: 'Ar', mass: 40 },
  19: { number: 19, name: 'Potassium', symbol: 'K', mass: 39 },
  20: { number: 20, name: 'Calcium', symbol: 'Ca', mass: 40 },
};

export const MAX_PROTONS = 18; // Cap at Argon/Potassium range for visual sanity
export const SHELL_CAPACITIES = [2, 8, 8];
