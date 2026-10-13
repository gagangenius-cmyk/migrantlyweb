import type { Answers, Calculator, CalculatorResult, Field, ResultRow } from './types';
import { num, yesNo } from './types';

// General Skilled Migration points test (subclasses 189, 190 and 491). Pass mark: 65.
const fields: Field[] = [
  {
    id: 'age', section: 'Personal', label: 'Age at time of invitation', default: '25',
    options: [{ value: '18', label: '18–24' }, { value: '25', label: '25–32' }, { value: '33', label: '33–39' }, { value: '40', label: '40–44' }, { value: '45', label: '45 or older' }],
  },
  { id: 'english', section: 'English', label: 'English language ability', default: '0', options: [{ value: '0', label: 'Competent (IELTS 6 in each band)' }, { value: '10', label: 'Proficient (IELTS 7 in each band)' }, { value: '20', label: 'Superior (IELTS 8 in each band)' }] },
  { id: 'overseas', section: 'Skilled employment', label: 'Skilled employment outside Australia (last 10 years)', default: '0', options: [{ value: '0', label: 'Less than 3 years' }, { value: '5', label: '3–4 years' }, { value: '10', label: '5–7 years' }, { value: '15', label: '8 years or more' }] },
  { id: 'local', section: 'Skilled employment', label: 'Skilled employment in Australia (last 10 years)', default: '0', options: [{ value: '0', label: 'Less than 1 year' }, { value: '5', label: '1–2 years' }, { value: '10', label: '3–4 years' }, { value: '15', label: '5–7 years' }, { value: '20', label: '8 years or more' }] },
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
  const pEnglish = num(a, 'english');
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
    total, max: 140, unit: 'points', threshold: { value: 65, label: 'Minimum pass mark' }, rows,
    notes: [
      'Meeting the pass mark only makes you eligible to submit an Expression of Interest. Invitations go to the highest scorers, and invitation scores are usually well above 65.',
      'You also need a positive skills assessment for an occupation on the relevant skilled occupation list.',
    ],
  };
}

export const australiaPoints: Calculator = { fields, compute };
