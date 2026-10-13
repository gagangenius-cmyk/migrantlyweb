import type { Answers, Calculator, CalculatorResult, Field, Option } from './types';

// IELTS General Training band to Canadian Language Benchmark (used by Express Entry).
// Each entry is [minimum band, CLB], checked from the top down.
const table: Record<string, [number, number][]> = {
  listening: [[8.5, 10], [8, 9], [7.5, 9], [7, 8], [6.5, 7], [6, 6], [5.5, 5], [5, 5], [4.5, 4]],
  reading: [[8, 10], [7, 9], [6.5, 8], [6, 7], [5, 6], [4, 5], [3.5, 4]],
  writing: [[7.5, 10], [7, 9], [6.5, 8], [6, 7], [5.5, 6], [5, 5], [4, 4]],
  speaking: [[7.5, 10], [7, 9], [6.5, 8], [6, 7], [5.5, 6], [5, 5], [4, 4]],
};

const bands: Option[] = Array.from({ length: 19 }, (_, i) => {
  const band = 9 - i * 0.5;
  return { value: String(band), label: band.toFixed(1) };
});
const abilities = ['listening', 'reading', 'writing', 'speaking'] as const;

export const clbFor = (ability: keyof typeof table, band: number) => table[ability].find(([min]) => band >= min)?.[1] ?? 0;

const fields: Field[] = abilities.map((ability): Field => ({
  id: ability, section: 'IELTS General Training bands', label: ability.charAt(0).toUpperCase() + ability.slice(1), options: bands, default: ability === 'listening' ? '8' : '7',
}));

function compute(a: Answers): CalculatorResult {
  const levels = abilities.map((ability) => ({ ability, clb: clbFor(ability, Number(a[ability])) }));
  const lowest = Math.min(...levels.map((l) => l.clb));
  return {
    total: lowest, max: 10, unit: 'lowest CLB',
    rows: levels.map((l) => ({ label: l.ability.charAt(0).toUpperCase() + l.ability.slice(1), value: l.clb ? `CLB ${l.clb}` : 'Below CLB 4', points: l.clb, max: 10 })),
    notes: [
      'Skill-transferability and many programme minimums use your lowest ability, so that is the headline figure.',
      'Use the General Training test for Express Entry. Academic scores do not count.',
    ],
  };
}

export const ieltsClb: Calculator = { fields, compute };
