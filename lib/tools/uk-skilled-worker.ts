import type { Answers, Calculator, CalculatorResult, Field, ResultRow } from './types';
import { num } from './types';

// Skilled Worker route. 70 points are required: 50 mandatory plus 20 from salary.
const fields: Field[] = [
  { id: 'sponsor', section: 'Mandatory', label: 'Job offer from a Home Office approved sponsor, with a Certificate of Sponsorship', default: '20', options: [{ value: '0', label: 'No' }, { value: '20', label: 'Yes' }] },
  { id: 'skill', section: 'Mandatory', label: 'Job is at the required skill level (RQF level 6 / graduate level or above) on the eligible occupations list', default: '20', options: [{ value: '0', label: 'No' }, { value: '20', label: 'Yes' }] },
  { id: 'english', section: 'Mandatory', label: 'English language ability at CEFR level B2 (proven by test or degree taught in English)', default: '10', options: [{ value: '0', label: 'No' }, { value: '10', label: 'Yes' }] },
  { id: 'salary', section: 'Salary', label: 'Salary offered', default: '20', help: 'You need both the general salary threshold and the going rate for the occupation.', options: [{ value: '0', label: 'Below the threshold or the going rate' }, { value: '20', label: 'Meets the general threshold and the going rate' }] },
];

function compute(a: Answers): CalculatorResult {
  const rows: ResultRow[] = [];
  const add = (group: string, label: string, points: number, max: number) => rows.push({ group, label, value: String(points), points, max });
  const sponsor = num(a, 'sponsor');
  const skill = num(a, 'skill');
  const english = num(a, 'english');
  const salary = num(a, 'salary');
  add('Mandatory (50 needed)', 'Approved sponsor', sponsor, 20);
  add('Mandatory (50 needed)', 'Skill level', skill, 20);
  add('Mandatory (50 needed)', 'English language', english, 10);
  add('Tradable (20 needed)', 'Salary', salary, 20);
  const mandatory = sponsor + skill + english;
  const notes = ['Salary thresholds and the eligible occupation list are updated often. Confirm current figures on gov.uk before you rely on this result.'];
  if (mandatory < 50) notes.unshift('You must have all 50 mandatory points. Missing points here cannot be made up elsewhere.');
  return { total: mandatory + salary, max: 70, unit: 'points', threshold: { value: 70, label: 'Points required' }, rows, notes };
}

export const ukSkilledWorker: Calculator = { fields, compute };
