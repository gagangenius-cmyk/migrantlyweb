import type { Answers, Field, Option } from './types';

// Individual test scores for the Canadian points systems. The user picks a test and the score for each
// ability; the score is converted to a CLB level internally.
export const abilities = ['listening', 'speaking', 'reading', 'writing'] as const;
type Ability = (typeof abilities)[number];

// IELTS General Training: [minimum band, CLB], highest first. CLB 7-10 from the official IRCC table;
// CLB 4-6 from the same published scale.
const ielts: Record<Ability, [number, number][]> = {
  listening: [[8.5, 10], [8.0, 9], [7.5, 8], [6.0, 7], [5.5, 6], [5.0, 5], [4.5, 4]],
  speaking: [[7.5, 10], [7.0, 9], [6.5, 8], [6.0, 7], [5.5, 6], [5.0, 5], [4.0, 4]],
  reading: [[8.0, 10], [7.0, 9], [6.5, 8], [6.0, 7], [5.0, 6], [4.0, 5], [3.5, 4]],
  writing: [[7.5, 10], [7.0, 9], [6.5, 8], [6.0, 7], [5.5, 6], [5.0, 5], [4.0, 4]],
};

// PTE Core score ranges by CLB (CLB 7 and above, from the IRCC table). Each option value is the CLB.
const pte: Record<Ability, { clb: number; label: string }[]> = {
  speaking: [{ clb: 10, label: '89 or more' }, { clb: 9, label: '84–88' }, { clb: 8, label: '76–83' }, { clb: 7, label: '68–75' }],
  listening: [{ clb: 10, label: '89 or more' }, { clb: 9, label: '82–88' }, { clb: 8, label: '71–81' }, { clb: 7, label: '60–70' }],
  reading: [{ clb: 10, label: '88 or more' }, { clb: 9, label: '78–87' }, { clb: 8, label: '69–77' }, { clb: 7, label: '60–68' }],
  writing: [{ clb: 10, label: '90' }, { clb: 9, label: '88–89' }, { clb: 8, label: '79–87' }, { clb: 7, label: '69–78' }],
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isTest = (a: Answers, t: string) => a.en_test === t;

const ieltsOptions = (ability: Ability): Option[] => {
  const bands: Option[] = [];
  for (let b = 9; b >= 3; b -= 0.5) bands.push({ value: String(b), label: b.toFixed(1) });
  return [{ value: '0', label: `Below ${ielts[ability].at(-1)![0].toFixed(1)}` }, ...bands.reverse().filter((o) => Number(o.value) >= 3.5).reverse()];
};
const celpipOptions: Option[] = [{ value: '0', label: 'Below 4' }, ...[4, 5, 6, 7, 8, 9].map((n) => ({ value: String(n), label: String(n) })), { value: '10', label: '10 or higher' }];
const pteOptions = (ability: Ability): Option[] => [{ value: '0', label: 'Below 60' }, ...pte[ability].slice().reverse().map((r) => ({ value: String(r.clb), label: r.label }))];

/** Form fields: a test selector plus one score select per ability for the chosen test. */
export function languageFields(section = 'English language test'): Field[] {
  const fields: Field[] = [
    { id: 'en_test', section, label: 'Which English test did you take?', default: 'ielts', options: [{ value: 'ielts', label: 'IELTS General Training' }, { value: 'celpip', label: 'CELPIP-General' }, { value: 'pte', label: 'PTE Core' }] },
  ];
  for (const ability of abilities) {
    fields.push({ id: `ielts_${ability}`, section, label: `IELTS ${cap(ability)} band`, default: ability === 'listening' ? '8' : '7', options: ieltsOptions(ability), showIf: (a) => isTest(a, 'ielts') });
  }
  for (const ability of abilities) {
    fields.push({ id: `celpip_${ability}`, section, label: `CELPIP ${cap(ability)} level`, default: '9', options: celpipOptions, showIf: (a) => isTest(a, 'celpip') });
  }
  for (const ability of abilities) {
    fields.push({ id: `pte_${ability}`, section, label: `PTE Core ${cap(ability)} score`, default: '8', options: pteOptions(ability), showIf: (a) => isTest(a, 'pte') });
  }
  return fields;
}

const ieltsToClb = (ability: Ability, band: number) => ielts[ability].find(([min]) => band >= min)?.[1] ?? 0;

/** Returns the answers with en_listening / en_speaking / en_reading / en_writing set to CLB levels. */
export function withClb(a: Answers): Answers {
  const out: Answers = { ...a };
  for (const ability of abilities) {
    const test = a.en_test || 'ielts';
    const raw = Number(a[`${test}_${ability}`] ?? 0) || 0;
    out[`en_${ability}`] = String(test === 'ielts' ? ieltsToClb(ability, raw) : raw);
  }
  return out;
}
