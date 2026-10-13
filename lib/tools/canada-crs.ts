import type { Answers, Calculator, CalculatorResult, Field, Option, ResultRow } from './types';
import { num, yesNo } from './types';

// Comprehensive Ranking System (Express Entry). Arranged-employment points were removed on 25 March 2025.
const withSpouse = (a: Answers) => a.spouse === '1';

// [without spouse, with spouse] for ages that are not in the flat 20-29 band
const ageTable: Record<number, [number, number]> = {
  18: [99, 90], 19: [105, 95], 30: [105, 95], 31: [99, 90], 32: [94, 85], 33: [88, 80], 34: [83, 75],
  35: [77, 70], 36: [72, 65], 37: [66, 60], 38: [61, 55], 39: [55, 50], 40: [50, 45], 41: [39, 35],
  42: [28, 25], 43: [17, 15], 44: [6, 5],
};
const agePoints = (years: number, spouse: boolean) => {
  if (years >= 20 && years <= 29) return spouse ? 100 : 110;
  const row = ageTable[years];
  return row ? row[spouse ? 1 : 0] : 0;
};

// [without spouse, with spouse, label]
const education: Record<string, [number, number, string]> = {
  none: [0, 0, 'Less than secondary school'],
  secondary: [30, 28, 'Secondary school (high school)'],
  oneyear: [90, 84, 'One-year post-secondary credential'],
  twoyear: [98, 91, 'Two-year post-secondary credential'],
  bachelor: [120, 112, "Bachelor's degree (3+ years)"],
  two: [128, 119, 'Two or more credentials, one of them 3+ years'],
  master: [135, 126, "Master's or professional degree"],
  phd: [150, 140, 'Doctoral degree (PhD)'],
};
const eduOptions: Option[] = Object.entries(education).map(([value, v]) => ({ value, label: v[2] }));
const spouseEdu: Record<string, number> = { none: 0, secondary: 2, oneyear: 6, twoyear: 7, bachelor: 8, two: 9, master: 10, phd: 10 };

const clbFirst: Record<number, [number, number]> = { 4: [6, 6], 5: [6, 6], 6: [9, 8], 7: [17, 16], 8: [23, 22], 9: [31, 29], 10: [34, 32] };
const clbSecond = (clb: number) => (clb >= 9 ? 6 : clb >= 7 ? 3 : clb >= 5 ? 1 : 0);
const cewTable: [number, number][] = [[0, 0], [40, 35], [53, 46], [64, 56], [72, 63], [80, 70]];

const clbOptions: Option[] = [
  { value: '0', label: 'Below CLB 4' },
  ...[4, 5, 6, 7, 8, 9].map((n) => ({ value: String(n), label: `CLB ${n}` })),
  { value: '10', label: 'CLB 10 or higher' },
];
const yearOptions = (max: number): Option[] =>
  Array.from({ length: max + 1 }, (_, i) => ({ value: String(i), label: i === 0 ? 'None' : i === max ? `${max}+ years` : `${i} year${i > 1 ? 's' : ''}` }));
const eduLevel = (key: string) => (['oneyear', 'twoyear', 'bachelor'].includes(key) ? 1 : ['two', 'master', 'phd'].includes(key) ? 2 : 0);
const abilities = ['listening', 'speaking', 'reading', 'writing'] as const;

const fields: Field[] = [
  { id: 'spouse', section: 'Personal', label: 'Will your spouse or common-law partner come with you to Canada?', options: yesNo, default: '0' },
  {
    id: 'age', section: 'Personal', label: 'Your age', default: '29',
    options: Array.from({ length: 33 }, (_, i) => ({ value: String(i + 17), label: i === 0 ? '17 or younger' : i === 32 ? '49 or older' : String(i + 17) })),
  },
  { id: 'education', section: 'Education', label: 'Highest level of education', options: eduOptions, default: 'bachelor' },
  ...abilities.map((ability): Field => ({
    id: `en_${ability}`, section: 'Language (English)', label: `English ${ability} (CLB)`, options: clbOptions, default: '9',
    help: ability === 'listening' ? 'Convert IELTS results with our IELTS to CLB converter.' : undefined,
  })),
  { id: 'second', section: 'Language (French)', label: 'French (NCLC) level, same across all four abilities', options: clbOptions, default: '0', help: 'Choose the level you reach in your weakest ability.' },
  { id: 'cew', section: 'Work experience', label: 'Skilled work experience in Canada', options: yearOptions(5), default: '0' },
  { id: 'fwe', section: 'Work experience', label: 'Skilled work experience outside Canada', options: [{ value: '0', label: 'None or less than 1 year' }, { value: '1', label: '1–2 years' }, { value: '3', label: '3 years or more' }], default: '0' },
  { id: 'cert', section: 'Work experience', label: 'Certificate of qualification in a skilled trade (issued by a Canadian province)', options: yesNo, default: '0' },
  { id: 's_education', section: 'Spouse or partner', label: "Spouse's highest level of education", options: eduOptions, default: 'none', showIf: withSpouse },
  { id: 's_lang', section: 'Spouse or partner', label: "Spouse's English or French level, same across all four abilities", options: clbOptions, default: '0', showIf: withSpouse },
  { id: 's_cew', section: 'Spouse or partner', label: "Spouse's skilled work experience in Canada", options: yearOptions(5), default: '0', showIf: withSpouse },
  { id: 'pnp', section: 'Additional points', label: 'Provincial nomination (PNP)', options: yesNo, default: '0' },
  { id: 'sibling', section: 'Additional points', label: 'Brother or sister in Canada (citizen or permanent resident, age 18+)', options: yesNo, default: '0' },
  { id: 'cdn_edu', section: 'Additional points', label: 'Canadian post-secondary education', options: [{ value: '0', label: 'None' }, { value: '15', label: '1–2 year credential' }, { value: '30', label: '3+ year credential, master’s or PhD' }], default: '0' },
];

function compute(a: Answers): CalculatorResult {
  const spouse = withSpouse(a);
  const idx = spouse ? 1 : 0;
  const edu = a.education in education ? a.education : 'none';
  const clbs = abilities.map((x) => num(a, `en_${x}`));
  const lowest = Math.min(...clbs);
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });

  const pAge = agePoints(num(a, 'age'), spouse);
  const pEdu = education[edu][idx];
  const pLang = clbs.reduce((sum, c) => sum + (c >= 4 ? clbFirst[Math.min(c, 10)][idx] : 0), 0);
  const second = num(a, 'second');
  const pSecond = Math.min(clbSecond(second) * 4, spouse ? 22 : 24);
  const cewYears = Math.min(num(a, 'cew'), 5);
  const pCew = cewTable[cewYears][idx];
  const core = pAge + pEdu + pLang + pSecond + pCew;
  add('Core / human capital', 'Age', pAge, spouse ? 100 : 110);
  add('Core / human capital', 'Education', pEdu, spouse ? 140 : 150);
  add('Core / human capital', 'First official language', pLang, spouse ? 128 : 136);
  add('Core / human capital', 'Second official language', pSecond, spouse ? 22 : 24);
  add('Core / human capital', 'Canadian work experience', pCew, spouse ? 70 : 80);

  let spouseTotal = 0;
  if (spouse) {
    const sEdu = spouseEdu[a.s_education] ?? 0;
    const sl = num(a, 's_lang');
    const sLang = (sl >= 9 ? 5 : sl >= 7 ? 3 : sl >= 5 ? 1 : 0) * 4;
    const sCew = [0, 5, 7, 8, 9, 10][Math.min(num(a, 's_cew'), 5)];
    spouseTotal = sEdu + sLang + sCew;
    add('Spouse or partner', 'Spouse education', sEdu, 10);
    add('Spouse or partner', 'Spouse language', sLang, 20);
    add('Spouse or partner', 'Spouse Canadian work experience', sCew, 10);
  }

  // Skill transferability: each of the two groups is capped at 50.
  const lv = eduLevel(edu);
  const tier = lowest >= 9 ? 2 : lowest >= 7 ? 1 : 0;
  const fwe = num(a, 'fwe');
  const eduLang = lv === 0 ? 0 : lv === 1 ? [0, 13, 25][tier] : [0, 25, 50][tier];
  const eduCew = lv === 0 || cewYears === 0 ? 0 : lv === 1 ? (cewYears >= 2 ? 25 : 13) : cewYears >= 2 ? 50 : 25;
  const trEdu = Math.min(eduLang + eduCew, 50);
  const fweLang = fwe === 0 ? 0 : fwe >= 3 ? [0, 25, 50][tier] : [0, 13, 25][tier];
  const fweCew = fwe === 0 || cewYears === 0 ? 0 : fwe >= 3 ? (cewYears >= 2 ? 50 : 25) : cewYears >= 2 ? 25 : 13;
  const certPoints = num(a, 'cert') === 1 ? (lowest >= 7 ? 50 : lowest >= 5 ? 25 : 0) : 0;
  const trFwe = Math.min(fweLang + fweCew + certPoints, 50);
  add('Skill transferability', 'Education with language and Canadian experience', trEdu, 50);
  add('Skill transferability', 'Foreign experience and trades certificate', trFwe, 50);

  const pPnp = num(a, 'pnp') === 1 ? 600 : 0;
  const pSib = num(a, 'sibling') === 1 ? 15 : 0;
  const frenchBonus = second >= 7 ? (lowest >= 5 ? 50 : 25) : 0;
  const pCdn = num(a, 'cdn_edu');
  add('Additional points', 'Provincial nomination', pPnp, 600);
  add('Additional points', 'Sibling in Canada', pSib, 15);
  add('Additional points', 'French language skills', frenchBonus, 50);
  add('Additional points', 'Canadian education', pCdn, 30);

  return {
    total: core + spouseTotal + trEdu + trFwe + Math.min(pPnp + pSib + frenchBonus + pCdn, 600),
    max: 1200,
    unit: 'CRS points',
    rows,
    notes: [
      'Compare your score with the cut-off of recent Express Entry draws published by IRCC. Cut-offs change with every draw.',
      'Assumes English is your first official language and French your second. Job-offer points no longer exist since 25 March 2025.',
    ],
  };
}

export const canadaCrs: Calculator = { fields, compute };
