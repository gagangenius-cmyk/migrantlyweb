import { describe, expect, it } from 'vitest';
import { filterPrograms } from '../lib/program-filter';

const programs = [
  { slug: 'one', name: 'One', type: 'Skilled Worker', country: 'Canada', image: '' },
  { slug: 'two', name: 'Two', type: 'Business & Investor', country: 'Portugal', investment: 'From €250,000', image: '' },
];

describe('program filtering', () => {
  it('filters by mode and destination', () => expect(filterPrograms(programs, { mode: 'skilled', destination: 'canada' })).toHaveLength(1));
  it('filters investment bands', () => expect(filterPrograms(programs, { investment: '50000-250000' })[0]?.slug).toBe('two'));
  it('ignores empty filters', () => expect(filterPrograms(programs, {})).toHaveLength(2));
});
