import type { Answers, Calculator, CalculatorResult, Field, Option, ResultRow } from './types';
import { num, yesNo } from './types';

// Quebec Regular Skilled Worker Program selection grid (Regulations of 2 August 2018).
// Max 103 points without a spouse, 120 with an accompanying spouse. Selection threshold 50 / 59.
const withSpouse = (a: Answers) => a.spouse === '1';

const edu: [string, number, number][] = [
  ['General secondary', 2, 1],
  ['Secondary vocational', 6, 2],
  ['2-year general post-secondary', 4, 1],
  ['Post-secondary technical (1 or 2 years)', 6, 2],
  ['3-year technical post-secondary', 8, 3],
  ['Undergraduate level (1 year)', 4, 1],
  ['University undergraduate certificate (2 years)', 6, 2],
  ['Undergraduate degree (3 years or more)', 10, 3],
  ['University graduate degree (2nd cycle, 1 year or more)', 12, 4],
  ['Postgraduate degree (3rd cycle)', 14, 4],
];
const eduOptions = (idx: 1 | 2): Option[] => [{ value: '0', label: 'None of the above' }, ...edu.map((e, i) => ({ value: String(e[idx]), label: e[0], _i: i } as Option))];
const eduValue = (idx: 1 | 2): Option[] => [{ value: '0', label: 'None of the above' }, ...edu.map((e, i) => ({ value: `${i}`, label: e[0] }))];
void eduOptions;

const ageOptions: Option[] = [{ value: '16', label: '18 to 35' }, { value: '14', label: '36' }, { value: '12', label: '37' }, { value: '10', label: '38' }, { value: '8', label: '39' }, { value: '6', label: '40' }, { value: '4', label: '41' }, { value: '2', label: '42' }, { value: '0', label: '43 or older / under 18' }];
const spouseAgeOptions: Option[] = [{ value: '3', label: '18 to 35' }, { value: '2', label: '36 to 39' }, { value: '1', label: '40 to 42' }, { value: '0', label: '43 or older / under 18' }];
const pts = (list: number[], suffix = ' points'): Option[] => list.map((n) => ({ value: String(n), label: `${n}${suffix}` }));

const regions: [string, number][] = [
  ['Abitibi-Témiscamingue', 13], ['Bas-Saint-Laurent', 12], ['National Capital (Québec City)', 14], ['Centre-du-Québec', 13], ['Chaudière-Appalaches', 14], ['North Shore', 12], ['Eastern Townships (Estrie)', 13],
  ['Gaspésie–Îles-de-la-Madeleine', 10], ['Lanaudière', 13], ['Laurentians', 12], ['Mauricie', 12], ['Montérégie', 14], ['Northern Quebec', 12], ['Outaouais', 13], ['Saguenay–Lac-Saint-Jean', 12],
];

const fields: Field[] = [
  { id: 'spouse', section: 'Your situation', label: 'Will a spouse or common-law partner accompany you?', options: yesNo, default: '0' },
  { id: 'children12', section: 'Your situation', label: 'Children aged 12 or under', options: pts([0, 1, 2, 3, 4], ''), default: '0' },
  { id: 'children13', section: 'Your situation', label: 'Children aged 13 to 21', options: pts([0, 1, 2, 3, 4], ''), default: '0' },
  { id: 'education', section: 'Training (26 max)', label: 'Level of education (minimum 2 points required)', options: eduValue(1), default: '7', help: 'Having at least a general secondary diploma is required (elimination threshold of 2 points).' },
  { id: 'field', section: 'Training (26 max)', label: 'Field of study points (from the official list: Part I foreign diploma, Part II Quebec diploma)', options: pts([0, 2, 6, 9, 12]), default: '0' },
  { id: 'experience', section: 'Experience (8 max)', label: 'Skilled professional experience', default: '24', options: [{ value: '0', label: 'Less than 6 months' }, { value: '4', label: '6 to 23 months' }, { value: '6', label: '24 to 47 months' }, { value: '8', label: '48 months or more' }] },
  { id: 'age', section: 'Age (16 max)', label: 'Your age', options: ageOptions, default: '16' },
  { id: 'fr_oc', section: 'Language: French (14+2 max)', label: 'Oral comprehension', options: pts([0, 5, 6, 7]), default: '0' },
  { id: 'fr_op', section: 'Language: French (14+2 max)', label: 'Oral production', options: pts([0, 5, 6, 7]), default: '0' },
  { id: 'fr_rc', section: 'Language: French (14+2 max)', label: 'Reading comprehension', options: pts([0, 1]), default: '0' },
  { id: 'fr_wp', section: 'Language: French (14+2 max)', label: 'Written production', options: pts([0, 1]), default: '0' },
  { id: 'en_oc', section: 'Language: English (6 max)', label: 'Oral comprehension', options: pts([0, 1, 2]), default: '0' },
  { id: 'en_op', section: 'Language: English (6 max)', label: 'Oral production', options: pts([0, 1, 2]), default: '0' },
  { id: 'en_rc', section: 'Language: English (6 max)', label: 'Reading comprehension', options: pts([0, 1]), default: '0' },
  { id: 'en_wp', section: 'Language: English (6 max)', label: 'Written production', options: pts([0, 1]), default: '0' },
  { id: 'stay', section: 'Stays and family in Quebec (8 max)', label: 'Stay in Quebec', default: '0', options: [{ value: '0', label: 'None' }, { value: '5', label: 'Studies in Quebec (DEP/AEC, DEC or university) or work stay with a permit and 6+ months of work' }, { value: '2', label: 'Other stay of 3 months or more' }, { value: '1', label: 'Other stay of 2 weeks to under 3 months' }] },
  { id: 'family', section: 'Stays and family in Quebec (8 max)', label: 'Close family in Quebec (spouse, parent, sibling, child, grandparent)', options: yesNo, default: '0' },
  { id: 'offer', section: 'Validated job offer (14 max)', label: 'Validated job offer', default: '0', options: [{ value: '0', label: 'No validated job offer' }, { value: '8', label: 'In the Montréal metropolitan area (CMM)' }, ...regions.map(([name, p]) => ({ value: String(p), label: `${name} (${p} points)` }))] },
  { id: 'autonomy', section: 'Financial autonomy', label: 'Financial autonomy undertaking signed (eliminating, 1 point)', options: yesNo, default: '1' },
  { id: 's_edu', section: 'Spouse or partner (17 max)', label: "Spouse's level of education", options: eduValue(2), default: '0', showIf: withSpouse },
  { id: 's_field', section: 'Spouse or partner (17 max)', label: "Spouse's field of study points", options: pts([0, 1, 2, 3, 4]), default: '0', showIf: withSpouse },
  { id: 's_age', section: 'Spouse or partner (17 max)', label: "Spouse's age", options: spouseAgeOptions, default: '3', showIf: withSpouse },
  { id: 's_oc', section: 'Spouse or partner (17 max)', label: "Spouse's French oral comprehension", options: pts([0, 2, 3]), default: '0', showIf: withSpouse },
  { id: 's_op', section: 'Spouse or partner (17 max)', label: "Spouse's French oral production", options: pts([0, 2, 3]), default: '0', showIf: withSpouse },
];

function compute(a: Answers): CalculatorResult {
  const spouse = withSpouse(a);
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });

  const eduIdx = a.education === '0' ? -1 : num(a, 'education');
  const pEdu = eduIdx >= 0 ? edu[eduIdx][1] : 0;
  const pField = num(a, 'field');
  const pExp = num(a, 'experience');
  const pAge = num(a, 'age');
  const pFr = num(a, 'fr_oc') + num(a, 'fr_op') + num(a, 'fr_rc') + num(a, 'fr_wp');
  const pEn = num(a, 'en_oc') + num(a, 'en_op') + num(a, 'en_rc') + num(a, 'en_wp');
  const pLang = Math.min(pFr + pEn, 22);
  const pStay = Math.min(num(a, 'stay') + num(a, 'family') * 3, 8);
  const pOffer = num(a, 'offer');

  add('Training', 'Level of education', pEdu, 14);
  add('Training', 'Field of study', pField, 12);
  add('Experience', 'Professional experience', pExp, 8);
  add('Age', 'Age', pAge, 16);
  add('Language', 'French and English', pLang, 22);
  add('Stays and family', 'Stays and family in Quebec', pStay, 8);
  add('Job offer', 'Validated job offer', pOffer, 14);

  let pSpouse = 0;
  if (spouse) {
    const sEdu = a.s_edu === '0' ? 0 : edu[num(a, 's_edu')][2];
    pSpouse = sEdu + num(a, 's_field') + num(a, 's_age') + num(a, 's_oc') + num(a, 's_op');
    add('Spouse or partner', 'Spouse points', Math.min(pSpouse, 17), 17);
    pSpouse = Math.min(pSpouse, 17);
  }

  const pChildren = Math.min(num(a, 'children12') * 4 + num(a, 'children13') * 2, 8);
  const pAutonomy = num(a, 'autonomy');
  add('Children and autonomy', 'Children', pChildren, 8);
  add('Children and autonomy', 'Financial autonomy', pAutonomy, 1);

  const employability = pEdu + pField + pExp + pAge + pLang + pStay + pOffer + pSpouse;
  const total = employability + pChildren + pAutonomy;
  const employabilityMin = spouse ? 52 : 43;
  const notes = [
    `Employability threshold: ${employabilityMin} points (without children and autonomy points). Your figure: ${employability}.`,
    'Quebec selection also needs the financial autonomy undertaking and a level of education of at least 2 points.',
  ];
  if (eduIdx < 0) notes.unshift('You need at least a general secondary diploma (2 points) to pass the education elimination threshold.');
  if (employability < employabilityMin) notes.unshift(`You are ${employabilityMin - employability} point(s) below the employability threshold.`);

  return { total, max: spouse ? 120 : 103, unit: 'points', threshold: { value: spouse ? 59 : 50, label: 'Selection threshold' }, rows, notes };
}

export const quebecQswp: Calculator = { fields, compute };
