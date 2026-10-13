import type { Answers, Calculator, CalculatorResult, Field, Option, ResultRow } from './types';
import { num, yesNo } from './types';

// Federal Skilled Worker Program 67-point selection grid. Pass mark: 67.
const clbOptions: Option[] = [
  { value: '0', label: 'Below CLB 4' },
  ...[4, 5, 6, 7, 8, 9].map((n) => ({ value: String(n), label: `CLB ${n}` })),
  { value: '10', label: 'CLB 10 or higher' },
];
const abilities = ['listening', 'speaking', 'reading', 'writing'] as const;

const fields: Field[] = [
  {
    id: 'age', section: 'Age', label: 'Your age', default: '30',
    options: [
      { value: '17', label: '17 or younger' }, { value: '30', label: '18–35' }, { value: '36', label: '36' }, { value: '37', label: '37' }, { value: '38', label: '38' },
      { value: '39', label: '39' }, { value: '40', label: '40' }, { value: '41', label: '41' }, { value: '42', label: '42' }, { value: '43', label: '43' },
      { value: '44', label: '44' }, { value: '45', label: '45' }, { value: '46', label: '46' }, { value: '47', label: '47 or older' },
    ],
  },
  {
    id: 'education', section: 'Education', label: 'Highest level of education', default: '21',
    options: [
      { value: '0', label: 'Less than secondary school' }, { value: '5', label: 'Secondary school (high school)' }, { value: '15', label: 'One-year post-secondary credential' },
      { value: '19', label: 'Two-year post-secondary credential' }, { value: '21', label: "Bachelor's degree (3+ years)" }, { value: '22', label: 'Two or more credentials, one of them 3+ years' },
      { value: '23', label: "Master's or professional degree" }, { value: '25', label: 'Doctoral degree (PhD)' },
    ],
  },
  ...abilities.map((ability): Field => ({ id: `en_${ability}`, section: 'First official language', label: `English ${ability} (CLB)`, options: clbOptions, default: '8' })),
  { id: 'second', section: 'Second official language', label: 'French (NCLC) level, same across all four abilities', options: clbOptions, default: '0', help: 'You earn 4 points if you reach CLB 5 or higher in all four abilities.' },
  { id: 'experience', section: 'Skilled work experience', label: 'Years of skilled work experience (last 10 years, TEER 0, 1, 2 or 3)', default: '2', options: [{ value: '0', label: 'Less than 1 year' }, { value: '1', label: '1 year' }, { value: '2', label: '2–3 years' }, { value: '4', label: '4–5 years' }, { value: '6', label: '6 years or more' }] },
  { id: 'offer', section: 'Arranged employment', label: 'Valid job offer from a Canadian employer', options: yesNo, default: '0' },
  { id: 'a_spouse_lang', section: 'Adaptability', label: 'Spouse or partner has CLB 4 or higher in all four abilities', options: yesNo, default: '0' },
  { id: 'a_study', section: 'Adaptability', label: 'You studied in Canada for 2+ academic years (full time)', options: yesNo, default: '0' },
  { id: 'a_spouse_study', section: 'Adaptability', label: 'Your spouse or partner studied in Canada for 2+ academic years', options: yesNo, default: '0' },
  { id: 'a_work', section: 'Adaptability', label: 'You worked in Canada for at least 1 year (skilled)', options: yesNo, default: '0' },
  { id: 'a_spouse_work', section: 'Adaptability', label: 'Your spouse or partner worked in Canada for at least 1 year', options: yesNo, default: '0' },
  { id: 'a_relative', section: 'Adaptability', label: 'Relative in Canada (citizen or permanent resident, age 18+)', options: yesNo, default: '0' },
];

const agePoints = (value: number) => (value <= 17 ? 0 : value <= 35 ? 12 : value >= 47 ? 0 : 12 - (value - 35));
const abilityPoints = (clb: number) => (clb >= 9 ? 6 : clb === 8 ? 5 : clb === 7 ? 4 : 0);
const experiencePoints = (years: number) => ({ 0: 0, 1: 9, 2: 11, 4: 13, 6: 15 } as Record<number, number>)[years] ?? 0;

function compute(a: Answers): CalculatorResult {
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });

  const clbs = abilities.map((x) => num(a, `en_${x}`));
  const lowest = Math.min(...clbs);
  const pAge = agePoints(num(a, 'age'));
  const pEdu = num(a, 'education');
  const pFirst = clbs.reduce((sum, c) => sum + abilityPoints(c), 0);
  const pSecond = num(a, 'second') >= 5 ? 4 : 0;
  const pExp = experiencePoints(num(a, 'experience'));
  const pOffer = num(a, 'offer') * 10;
  const pAdapt = Math.min(
    num(a, 'a_spouse_lang') * 5 + num(a, 'a_study') * 5 + num(a, 'a_spouse_study') * 5 + num(a, 'a_work') * 10 + num(a, 'a_spouse_work') * 5 + num(a, 'a_relative') * 5 + (pOffer ? 5 : 0),
    10,
  );

  add('Selection factors', 'Age', pAge, 12);
  add('Selection factors', 'Education', pEdu, 25);
  add('Selection factors', 'First official language', pFirst, 24);
  add('Selection factors', 'Second official language', pSecond, 4);
  add('Selection factors', 'Skilled work experience', pExp, 15);
  add('Selection factors', 'Arranged employment', pOffer, 10);
  add('Selection factors', 'Adaptability', pAdapt, 10);

  const notes = ['The 67-point grid only shows whether you can enter the Express Entry pool through the Federal Skilled Worker Program. Invitations are decided by your CRS score, which you can check with our CRS calculator.'];
  if (lowest < 7) notes.unshift('Federal Skilled Worker needs at least CLB 7 in all four first-language abilities. Below that, you are not eligible under this program whatever your points.');
  if (num(a, 'experience') < 1) notes.unshift('You need at least one year of continuous skilled work experience (TEER 0, 1, 2 or 3) in the last 10 years.');

  return {
    total: pAge + pEdu + pFirst + pSecond + pExp + pOffer + pAdapt,
    max: 100, unit: 'points', threshold: { value: 67, label: 'Minimum pass mark' }, rows, notes,
  };
}

export const canadaFsw: Calculator = { fields, compute };
