import type { Answers, Calculator, CalculatorResult, Field, ResultRow } from './types';
import { num, yesNo } from './types';

// Germany Opportunity Card (Chancenkarte). 6 points are needed, together with a recognised
// qualification, basic language ability and proof of funds. Point values below follow the
// published scheme as understood at the time of writing and MUST be confirmed against the
// official German government source before launch.
const fields: Field[] = [
  {
    id: 'age', section: 'Personal', label: 'Your age', default: '2',
    options: [{ value: '2', label: 'Under 35' }, { value: '1', label: '35 to 39' }, { value: '0', label: '40 or older' }],
  },
  {
    id: 'recognition', section: 'Qualification', label: 'Recognition of your qualification (ANABIN / ZAB)', default: 'partial',
    help: 'Check your degree in the anabin database or ask the ZAB. Full recognition meets the requirement on its own.',
    options: [
      { value: 'full', label: 'Fully recognised in Germany' },
      { value: 'partial', label: 'Partially recognised, or recognition possible after adaptation' },
      { value: 'none', label: 'Not recognised / not checked yet' },
    ],
  },
  { id: 'shortage', section: 'Qualification', label: 'Is your qualification in a shortage occupation? (+1 point)', options: yesNo, default: '0' },
  {
    id: 'experience', section: 'Work experience', label: 'Professional work experience', default: '0',
    options: [
      { value: '0', label: 'Less than 2 years in the last 5 years' },
      { value: '2', label: 'At least 2 years in the last 5 years' },
      { value: '3', label: 'At least 5 years in the last 7 years' },
    ],
  },
  {
    id: 'german', section: 'Language', label: 'German language level', default: '1',
    options: [{ value: '0', label: 'None' }, { value: '1', label: 'A1' }, { value: '2', label: 'A2' }, { value: '3', label: 'B1 or higher' }],
  },
  { id: 'english', section: 'Language', label: 'English language level', default: '0', options: [{ value: '0', label: 'Below B2' }, { value: '1', label: 'B2 or higher' }] },
  { id: 'stay', section: 'Connection to Germany', label: 'Previous stay in Germany of 6+ months (within the last 5 years)', options: yesNo, default: '0' },
  { id: 'spouse', section: 'Connection to Germany', label: 'Spouse or partner also applying for the Opportunity Card', options: yesNo, default: '0' },
];

function compute(a: Answers): CalculatorResult {
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });

  const recognition = a.recognition;
  const pRecognition = recognition === 'full' ? 6 : recognition === 'partial' ? 4 : 0;
  const pShortage = num(a, 'shortage');
  const pExperience = num(a, 'experience');
  const pGerman = num(a, 'german');
  const pEnglish = num(a, 'english');
  const pAge = num(a, 'age');
  const pStay = num(a, 'stay');
  const pSpouse = num(a, 'spouse');

  add('Qualification', 'Qualification recognition', pRecognition, 4);
  add('Qualification', 'Shortage occupation', pShortage, 1);
  add('Experience', 'Professional experience', pExperience, 3);
  add('Language', 'German', pGerman, 3);
  add('Language', 'English', pEnglish, 1);
  add('Personal', 'Age', pAge, 2);
  add('Connection to Germany', 'Previous stay', pStay, 1);
  add('Connection to Germany', 'Spouse or partner', pSpouse, 1);

  const notes = [
    'You also need proof that you can support yourself (for example a blocked account) and a basic language level: German A1 or English B2.',
    'Point values are indicative. Confirm them on the official German government pages before you apply.',
  ];
  if (recognition === 'none') notes.unshift('Without a recognised qualification (full or partial) you cannot qualify, whatever your other points.');
  if (recognition === 'full') notes.unshift('A fully recognised qualification meets the requirement without the points test.');
  if (pGerman === 0 && pEnglish === 0) notes.unshift('You need at least German A1 or English B2 to apply.');

  return {
    total: pRecognition + pShortage + pExperience + pGerman + pEnglish + pAge + pStay + pSpouse,
    max: 16,
    unit: 'points',
    threshold: { value: 6, label: 'Minimum points' },
    rows,
    notes,
  };
}

export const germanyOpportunityCard: Calculator = { fields, compute };
