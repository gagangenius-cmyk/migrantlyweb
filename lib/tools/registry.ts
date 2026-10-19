import type { ToolDefinition } from './types';
import { australiaPoints } from './australia-points';
import { canadaCrs } from './canada-crs';
import { canadaFsw } from './canada-fsw';
import { germanyOpportunityCard } from './germany-opportunity-card';
import { ieltsClb } from './ielts-clb';
import { ukSkilledWorker } from './uk-skilled-worker';

export const tools: ToolDefinition[] = [
  {
    slug: 'canada-express-entry-crs', name: 'Canada Express Entry CRS Calculator', country: 'Canada', system: 'Comprehensive Ranking System',
    summary: 'Estimate your Express Entry score out of 1,200, with spouse, language, work experience and provincial nomination points.',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score.html',
    calculator: canadaCrs,
  },
  {
    slug: 'canada-pr-calculator', name: 'Canada PR Calculator (FSW 67-Point Grid)', country: 'Canada', system: 'Federal Skilled Worker Program selection grid',
    summary: 'Check whether you reach the 67 points needed to qualify for Canada permanent residence under the Federal Skilled Worker Program.',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers/six-selection-factors-federal-skilled-workers.html',
    calculator: canadaFsw,
  },
  {
    slug: 'australia-points-test', name: 'Australia Skilled Migration Points Calculator', country: 'Australia', system: 'General Skilled Migration points test (189 / 190 / 491)',
    summary: 'Check your points for subclass 189, 190 and 491 against the 65-point pass mark.',
    officialUrl: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect/points-tables',
    calculator: australiaPoints,
  },
  {
    slug: 'uk-skilled-worker-points', name: 'UK Skilled Worker Points Calculator', country: 'United Kingdom', system: 'Skilled Worker route (70 points)',
    summary: 'See whether your job offer, skill level, English and salary reach the 70 points needed.',
    officialUrl: 'https://www.gov.uk/skilled-worker-visa',
    calculator: ukSkilledWorker,
  },
  {
    slug: 'germany-opportunity-card-points', name: 'Germany Opportunity Card Points Calculator', country: 'Germany', system: 'Opportunity Card (Chancenkarte) points scheme',
    summary: 'Estimate your points for the Germany Opportunity Card against the 6-point minimum.',
    officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card',
    calculator: germanyOpportunityCard,
  },
  {
    slug: 'ielts-to-clb-converter', name: 'IELTS to CLB Converter', country: 'Canada', system: 'Canadian Language Benchmarks',
    summary: 'Convert IELTS General Training bands into CLB levels for Express Entry and Canadian programmes.',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements/language-testing.html',
    calculator: ieltsClb,
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

/** Every page in the Tools section, including pages that are not calculators. */
export const toolLinks = [
  ...tools.map(({ slug, name, country, summary }) => ({ slug, name, country, summary })),
  { slug: 'express-entry-draws', name: 'Express Entry Draws', country: 'Canada', summary: 'Recent Express Entry rounds with cut-off scores. Compare your CRS score with each draw.' },
];
