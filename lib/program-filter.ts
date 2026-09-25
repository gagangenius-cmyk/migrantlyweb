export interface FilterableProgram { slug: string; name: string; type: string; country: string; image: string; tag?: string; investment?: string; filterType?: string; countrySlug?: string; }
export interface ProgramFilters { mode?: string; destination?: string; type?: string; investment?: string; }

const countrySlugs: Record<string, string> = { Canada: 'canada', Australia: 'australia', 'United Kingdom': 'united-kingdom', 'United States': 'united-states', Portugal: 'portugal', 'European Union': 'european-union' };
function amount(value?: string) { const match = value?.replace(/,/g, '').match(/\d+/); return match ? Number(match[0]) : null; }

export function filterPrograms<T extends FilterableProgram>(programs: T[], filters: ProgramFilters) {
  return programs.filter((program) => {
    const type = program.filterType || program.type;
    if (filters.mode === 'skilled' && type !== 'Skilled Worker') return false;
    if (filters.mode === 'investor' && type !== 'Business & Investor') return false;
    if (filters.destination && filters.destination !== 'all' && (program.countrySlug || countrySlugs[program.country]) !== filters.destination) return false;
    if (filters.type && filters.type !== 'all' && type.toLowerCase().replace(/[^a-z]+/g, '-') !== filters.type) return false;
    if (filters.investment && filters.investment !== 'any') {
      const value = amount(program.investment);
      if (value === null) return false;
      if (filters.investment === 'under-50000' && value >= 50000) return false;
      if (filters.investment === '50000-250000' && (value < 50000 || value > 250000)) return false;
      if (filters.investment === 'over-250000' && value <= 250000) return false;
    }
    return true;
  });
}
