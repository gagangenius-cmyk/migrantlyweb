import type { Answers, Calculator, CalculatorResult, Field, Option, ResultRow } from './types';
import { num, yesNo } from './types';
import { languageFields, withClb, abilities } from './language-tests';

// Saskatchewan Immigrant Nominee Program: International Skilled Worker points grid (110 points, 60 to apply).
// Source: saskatchewan.ca "Assess your eligibility".
const clbOptions: Option[] = [{ value: '0', label: 'None / below CLB 4' }, ...[4, 5, 6, 7].map((n) => ({ value: String(n), label: `CLB ${n}` })), { value: '8', label: 'CLB 8 or higher' }];

const fields: Field[] = [
  {
    id: 'education', section: 'Education and training', label: 'Highest credential (Canadian equivalency)', default: '20',
    options: [
      { value: '23', label: "Master's or doctorate" },
      { value: '20', label: "Bachelor's degree, or a 3-year degree at a university or college" },
      { value: '20t', label: 'Trade certification equivalent to journeyperson status in Saskatchewan' },
      { value: '15', label: 'Diploma: 2 to under 3 years of post-secondary study' },
      { value: '12', label: 'Certificate: at least 2 semesters, under a 2-year program' },
      { value: '0', label: 'None of the above' },
    ],
  },
  { id: 'exp5', section: 'Skilled work experience', label: 'Experience in the 5 years before applying (related to your job)', default: '3', options: [{ value: '0', label: 'Less than 1 year' }, ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} year${n > 1 ? 's' : ''}` }))] },
  { id: 'exp10', section: 'Skilled work experience', label: 'Experience 6 to 10 years before applying', default: '0', options: [{ value: '0', label: 'Less than 2 years' }, ...[2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} years` }))] },
  ...languageFields('First language: English test'),
  { id: 'second', section: 'Second language (French)', label: 'French level (CLB / NCLC)', options: clbOptions, default: '0' },
  {
    id: 'age', section: 'Age', label: 'Your age', default: '12',
    options: [{ value: '0', label: 'Under 18' }, { value: '8', label: '18 to 21' }, { value: '12', label: '22 to 34' }, { value: '10', label: '35 to 45' }, { value: '8b', label: '46 to 50' }, { value: '0b', label: 'Over 50' }],
  },
  { id: 'offer', section: 'Connection to Saskatchewan', label: 'High-skilled job offer from a Saskatchewan employer (Employment Offer category)', options: yesNo, default: '0' },
  { id: 'relative', section: 'Connection to Saskatchewan', label: 'Close family in Saskatchewan (citizen or permanent resident, not supporting other relatives)', options: yesNo, default: '0', help: 'Counts for Express Entry and Occupations In-Demand only.' },
  { id: 'sworked', section: 'Connection to Saskatchewan', label: 'Worked 12 months in Saskatchewan in the past 5 years (valid work permit)', options: yesNo, default: '0', help: 'Counts for Express Entry and Occupations In-Demand only.' },
  { id: 'sstudied', section: 'Connection to Saskatchewan', label: 'Studied at least one full-time academic year in Saskatchewan (valid study permit)', options: yesNo, default: '0', help: 'Counts for Express Entry and Occupations In-Demand only.' },
];

const expPoints5: Record<number, number> = { 0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10 };
const expPoints10: Record<number, number> = { 0: 0, 2: 2, 3: 3, 4: 4, 5: 5 };
const firstPoints = (clb: number) => (clb >= 8 ? 20 : clb === 7 ? 18 : clb === 6 ? 16 : clb === 5 ? 14 : clb === 4 ? 12 : 0);
const secondPoints = (clb: number) => (clb >= 8 ? 10 : clb === 7 ? 8 : clb === 6 ? 6 : clb === 5 ? 4 : clb === 4 ? 2 : 0);
const agePoints = (v: string) => ({ '0': 0, '8': 8, '12': 12, '10': 10, '8b': 8, '0b': 0 } as Record<string, number>)[v] ?? 0;

function compute(input: Answers): CalculatorResult {
  const a = withClb(input);
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });

  const lowest = Math.min(...abilities.map((x) => num(a, `en_${x}`)));
  const pEdu = a.education === '20t' ? 20 : num(a, 'education');
  const pExp = (expPoints5[num(a, 'exp5')] ?? 0) + (expPoints10[num(a, 'exp10')] ?? 0);
  const pFirst = firstPoints(lowest);
  const pSecond = secondPoints(num(a, 'second'));
  const pAge = agePoints(a.age);
  const factor1 = pEdu + Math.min(pExp, 15) + pFirst + pSecond + pAge;

  const pOffer = num(a, 'offer') ? 30 : 0;
  const pFamily = pOffer ? 0 : num(a, 'relative') * 20;
  const pWork = pOffer ? 0 : num(a, 'sworked') * 5;
  const pStudy = pOffer ? 0 : num(a, 'sstudied') * 5;
  const factor2 = Math.min(pOffer + pFamily + pWork + pStudy, 30);

  add('Factor I: Labour market success', 'Education and training', pEdu, 23);
  add('Factor I: Labour market success', 'Skilled work experience', Math.min(pExp, 15), 15);
  add('Factor I: Labour market success', 'First language', pFirst, 20);
  add('Factor I: Labour market success', 'Second language', pSecond, 10);
  add('Factor I: Labour market success', 'Age', pAge, 12);
  add('Factor II: Connection and adaptability', 'Saskatchewan job offer', pOffer, 30);
  add('Factor II: Connection and adaptability', 'Close family', pFamily, 20);
  add('Factor II: Connection and adaptability', 'Past work', pWork, 5);
  add('Factor II: Connection and adaptability', 'Past study', pStudy, 5);

  return {
    total: factor1 + factor2,
    max: 110,
    unit: 'points',
    threshold: { value: 60, label: 'Minimum to apply' },
    rows,
    notes: [
      'The 60-point minimum applies to the Express Entry, Occupations In-Demand and Employment Offer categories. A job offer replaces the family, work and study points.',
      'First-language points use your lowest CLB across the four abilities. Meeting the minimum does not guarantee a nomination.',
    ],
  };
}

export const saskatchewanSinp: Calculator = { fields, compute };
