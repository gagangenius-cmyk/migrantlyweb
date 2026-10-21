import type { Answers, Calculator, CalculatorResult, Field, Option, ResultRow } from './types';
import { num, yesNo } from './types';

// General Skilled Migration points test (subclasses 189, 190 and 491). Pass mark: 65.
// Individual English scores. Levels: 0 competent, 10 proficient, 20 superior (points awarded).
const ab = ['listening', 'reading', 'writing', 'speaking'] as const;
const pteMin: Record<(typeof ab)[number], [number, number, number]> = { listening: [47, 58, 69], reading: [48, 59, 70], writing: [51, 69, 85], speaking: [54, 76, 88] };
const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
const bandOptions: Option[] = [{ value: '0', label: 'Below 6.0' }, ...[6, 6.5, 7, 7.5, 8, 8.5, 9].map((b) => ({ value: String(b), label: b.toFixed(1) }))];
const englishFields: Field[] = [
  { id: 'au_test', section: 'English', label: 'Which English test did you take?', default: 'ielts', options: [{ value: 'ielts', label: 'IELTS' }, { value: 'pte', label: 'PTE Academic' }] },
  ...ab.map((x): Field => ({ id: 'ielts_' + x, section: 'English', label: 'IELTS ' + cap(x) + ' band', default: '6', options: bandOptions, showIf: (a) => a.au_test !== 'pte' })),
  ...ab.map((x): Field => ({
    id: 'pte_' + x, section: 'English', label: 'PTE ' + cap(x) + ' score', default: '0', showIf: (a) => a.au_test === 'pte',
    options: [{ value: '0', label: 'Below ' + pteMin[x][0] }, { value: '1', label: pteMin[x][0] + ' to ' + (pteMin[x][1] - 1) + ' (Competent)' }, { value: '2', label: pteMin[x][1] + ' to ' + (pteMin[x][2] - 1) + ' (Proficient)' }, { value: '3', label: pteMin[x][2] + ' or more (Superior)' }],
  })),
];
const englishPoints = (a: Answers) => {
  if (a.au_test === 'pte') {
    const level = Math.min(...ab.map((x) => num(a, 'pte_' + x)));
    return level >= 3 ? 20 : level === 2 ? 10 : 0;
  }
  const lowest = Math.min(...ab.map((x) => num(a, 'ielts_' + x)));
  return lowest >= 8 ? 20 : lowest >= 7 ? 10 : 0;
};

const fields: Field[] = [
  {
    id: 'age', section: 'Personal', label: 'Age at time of invitation', default: '25',
    options: [{ value: '18', label: '18–24' }, { value: '25', label: '25–32' }, { value: '33', label: '33–39' }, { value: '40', label: '40–44' }, { value: '45', label: '45 or older' }],
  },
  ...englishFields,
  { id: 'overseas', section: 'Skilled employment', label: 'Skilled employment outside Australia (last 10 years)', default: '0', options: [{ value: 'none', label: 'No experience' }, { value: '0', label: 'Less than 3 years' }, { value: '5', label: '3–4 years' }, { value: '10', label: '5–7 years' }, { value: '15', label: '8 years or more' }] },
  { id: 'local', section: 'Skilled employment', label: 'Skilled employment in Australia (last 10 years)', default: '0', options: [{ value: 'none', label: 'No experience' }, { value: '0', label: 'Less than 1 year' }, { value: '5', label: '1–2 years' }, { value: '10', label: '3–4 years' }, { value: '15', label: '5–7 years' }, { value: '20', label: '8 years or more' }] },
  { id: 'education', section: 'Education', label: 'Highest qualification', default: '15', options: [{ value: '0', label: 'None of the below' }, { value: '10', label: 'Diploma or trade qualification (completed in Australia), or another assessed qualification' }, { value: '15', label: "Bachelor's or Master's degree (Australian or recognised)" }, { value: '20', label: 'Doctorate (Australian or recognised)' }] },
  { id: 'stem', section: 'Education', label: 'Master’s by research or doctorate in STEM from an Australian institution', options: yesNo, default: '0' },
  { id: 'aus_study', section: 'Education', label: 'Australian study requirement met (2 academic years in Australia)', options: yesNo, default: '0' },
  { id: 'regional', section: 'Education', label: 'Studied in regional Australia and lived in a regional area', options: yesNo, default: '0' },
  { id: 'py', section: 'Other credit', label: 'Professional Year in Australia', options: yesNo, default: '0' },
  { id: 'ccl', section: 'Other credit', label: 'Credentialled community language', options: yesNo, default: '0' },
  { id: 'partner', section: 'Partner', label: 'Partner situation', default: '10', options: [{ value: '10', label: 'Single, or partner is an Australian citizen or permanent resident' }, { value: '10b', label: 'Partner has a positive skills assessment and competent English' }, { value: '5', label: 'Partner has competent English only' }, { value: '0', label: 'None of the above' }] },
  { id: 'nomination', section: 'Nomination', label: 'Nomination or sponsorship', default: '0', options: [{ value: '0', label: 'None (subclass 189)' }, { value: '5', label: 'State or territory nomination (subclass 190)' }, { value: '15', label: 'Regional nomination or eligible family sponsorship (subclass 491)' }] },
];

function compute(a: Answers): CalculatorResult {
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });
  const ageYears = num(a, 'age');
  const pAge = ageYears === 18 ? 25 : ageYears === 25 ? 30 : ageYears === 33 ? 25 : ageYears === 40 ? 15 : 0;
  const pEnglish = englishPoints(a);
  const pEmployment = Math.min(num(a, 'overseas') + num(a, 'local'), 20);
  const pEducation = num(a, 'education');
  const pStem = num(a, 'stem') * 10;
  const pStudy = num(a, 'aus_study') * 5;
  const pRegional = num(a, 'regional') * 5;
  const pPy = num(a, 'py') * 5;
  const pCcl = num(a, 'ccl') * 5;
  const pPartner = a.partner === '10b' ? 10 : num(a, 'partner');
  const pNom = num(a, 'nomination');

  add('Core', 'Age', pAge, 30);
  add('Core', 'English language', pEnglish, 20);
  add('Core', 'Skilled employment (capped at 20)', pEmployment, 20);
  add('Core', 'Education', pEducation, 20);
  add('Education extras', 'STEM research qualification', pStem, 10);
  add('Education extras', 'Australian study requirement', pStudy, 5);
  add('Education extras', 'Regional study', pRegional, 5);
  add('Other', 'Professional Year', pPy, 5);
  add('Other', 'Community language', pCcl, 5);
  add('Other', 'Partner skills', pPartner, 10);
  add('Other', 'Nomination or sponsorship', pNom, 15);

  const total = pAge + pEnglish + pEmployment + pEducation + pStem + pStudy + pRegional + pPy + pCcl + pPartner + pNom;
  return {
    total, max: 140, hideMax: true, unit: 'points', threshold: { value: 65, label: 'Minimum pass mark' }, rows,
    notes: [
      'Meeting the pass mark only makes you eligible to submit an Expression of Interest. Invitations go to the highest scorers, and invitation scores are usually well above 65.',
      'You also need a positive skills assessment for an occupation on the relevant skilled occupation list.',
    ],
  };
}

export const australiaPoints: Calculator = { fields, compute };
