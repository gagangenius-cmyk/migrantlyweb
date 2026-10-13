export interface ExpressEntryDraw {
  number: number;
  date: string; // ISO date
  program: string;
  invitations: number;
  crs: number; // lowest score invited
}

/** Source: IRCC "Express Entry rounds of invitations" published data. Retrieved 13 October 2026. */
export const drawsSource = {
  name: 'Immigration, Refugees and Citizenship Canada (IRCC)',
  url: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html',
  retrieved: '2026-10-13',
};

export const draws: ExpressEntryDraw[] = [
  { number: 448, date: '2026-10-13', program: 'Provincial Nominee Program', invitations: 752, crs: 772 },
  { number: 447, date: '2026-10-01', program: 'Trades Occupations, 2026-Version 3', invitations: 3500, crs: 476 },
  { number: 446, date: '2026-09-29', program: 'Canadian Experience Class', invitations: 2000, crs: 518 },
  { number: 445, date: '2026-09-28', program: 'Provincial Nominee Program', invitations: 733, crs: 725 },
  { number: 444, date: '2026-09-16', program: 'Senior managers with Canadian Work Experience, 2026-Version 1', invitations: 250, crs: 389 },
  { number: 443, date: '2026-09-15', program: 'Canadian Experience Class', invitations: 2000, crs: 519 },
  { number: 442, date: '2026-09-14', program: 'Provincial Nominee Program', invitations: 576, crs: 734 },
  { number: 441, date: '2026-09-04', program: 'Healthcare and Social Services Occupations, 2026-Version 3', invitations: 3500, crs: 475 },
  { number: 440, date: '2026-09-03', program: 'Physicians with Canadian Work Experience, 2026-Version 1', invitations: 229, crs: 198 },
  { number: 439, date: '2026-09-01', program: 'Canadian Experience Class', invitations: 2000, crs: 521 },
  { number: 438, date: '2026-08-31', program: 'Provincial Nominee Program', invitations: 562, crs: 697 },
  { number: 437, date: '2026-08-19', program: 'French-Language proficiency 2026-Version 2', invitations: 5000, crs: 382 },
  { number: 436, date: '2026-08-18', program: 'Canadian Experience Class', invitations: 1000, crs: 523 },
  { number: 435, date: '2026-08-17', program: 'Provincial Nominee Program', invitations: 442, crs: 760 },
  { number: 434, date: '2026-08-07', program: 'Transport Occupations, 2026-Version 2', invitations: 300, crs: 470 },
];
