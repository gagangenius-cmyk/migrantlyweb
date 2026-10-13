import { describe, expect, it } from 'vitest';
import { australiaPoints } from '../lib/tools/australia-points';
import { canadaCrs } from '../lib/tools/canada-crs';
import { clbFor } from '../lib/tools/ielts-clb';
import { ukSkilledWorker } from '../lib/tools/uk-skilled-worker';
import { defaultAnswers } from '../lib/tools/types';

const run = (calc: typeof canadaCrs, overrides: Record<string, string> = {}) =>
  calc.compute({ ...defaultAnswers(calc.fields), ...overrides });

describe('Canada CRS', () => {
  it('scores a single 29-year-old with a bachelor degree, CLB 9 and 3 years Canadian experience at 468', () => {
    expect(run(canadaCrs, { cew: '3' }).total).toBe(468);
  });
  it('adds 600 for a provincial nomination', () => {
    expect(run(canadaCrs, { pnp: '1' }).total - run(canadaCrs).total).toBe(600);
  });
  it('uses the lower with-spouse age points', () => {
    const single = run(canadaCrs, { age: '25' }).rows.find((r) => r.label === 'Age')?.points;
    const partnered = run(canadaCrs, { age: '25', spouse: '1' }).rows.find((r) => r.label === 'Age')?.points;
    expect([single, partnered]).toEqual([110, 100]);
  });
});

describe('Australia points test', () => {
  it('scores age 25-32, proficient English, bachelor, 3-4 years overseas experience at 70', () => {
    expect(run(australiaPoints, { english: '10', overseas: '5' }).total).toBe(30 + 10 + 5 + 15 + 10);
  });
  it('caps skilled employment at 20', () => {
    const r = run(australiaPoints, { overseas: '15', local: '20' });
    expect(r.rows.find((row) => row.label.startsWith('Skilled employment'))?.points).toBe(20);
  });
});

describe('UK Skilled Worker', () => {
  it('reaches 70 points with all criteria met', () => {
    expect(run(ukSkilledWorker).total).toBe(70);
  });
  it('falls short without a sponsor', () => {
    expect(run(ukSkilledWorker, { sponsor: '0' }).total).toBe(50);
  });
});

describe('IELTS to CLB', () => {
  it('converts listening 8.0 to CLB 9 and writing 6.5 to CLB 8', () => {
    expect(clbFor('listening', 8)).toBe(9);
    expect(clbFor('writing', 6.5)).toBe(8);
  });
});
