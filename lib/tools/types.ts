export type Answers = Record<string, string>;

export interface Option { value: string; label: string }

export interface Field {
  id: string;
  label: string;
  section: string;
  options: Option[];
  default: string;
  help?: string;
  showIf?: (answers: Answers) => boolean;
}

export interface ResultRow {
  label: string;
  /** Shown on the right of the row, e.g. "110" or "CLB 9". */
  value: string;
  /** When set together with max, the row renders a small bar. */
  points?: number;
  max?: number;
  group?: string;
}

export interface CalculatorResult {
  total: number;
  max: number;
  unit: string;
  /** When true the result shows progress to the pass mark and never displays the maximum. */
  hideMax?: boolean;
  /** Pass mark or minimum required, when the system has one. */
  threshold?: { value: number; label: string };
  rows: ResultRow[];
  notes?: string[];
}

export interface Calculator {
  fields: Field[];
  compute: (answers: Answers) => CalculatorResult;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  country: string;
  summary: string;
  system: string;
  officialUrl: string;
  calculator: Calculator;
}

export const defaultAnswers = (fields: Field[]): Answers =>
  Object.fromEntries(fields.map((field) => [field.id, field.default]));

export const num = (answers: Answers, id: string) => Number(answers[id] ?? 0) || 0;
export const yesNo: Option[] = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
