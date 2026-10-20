export interface FaqCategory { key: string; label: string }
export interface Faq { category: string; q: string; a: string }

export const faqCategories: FaqCategory[] = [
  { key: 'canada', label: 'Canada Skilled' },
  { key: 'australia', label: 'Australia Skilled' },
  { key: 'uk', label: 'UK Skilled' },
  { key: 'nz', label: 'New Zealand Skilled' },
  { key: 'tourist', label: 'Tourist Visa' },
  { key: 'investor', label: 'Investor' },
  { key: 'business', label: 'Business' },
];

export const faqs: Faq[] = [
  { category: 'canada', q: 'What is Express Entry?', a: 'Express Entry is Canada’s online system for managing applications for skilled workers. Eligible candidates enter a pool, receive a Comprehensive Ranking System (CRS) score and the highest-ranked candidates are invited to apply for permanent residence.' },
  { category: 'canada', q: 'What is the CRS score and how can I improve it?', a: 'The CRS score ranks candidates using age, education, language, work experience and other factors. Better language test results, extra qualifications, Canadian experience or a provincial nomination can raise it.' },
  { category: 'canada', q: 'Do I need a job offer for Canada skilled immigration?', a: 'Not always. Many skilled candidates qualify without a job offer, but a provincial nomination or an eligible job offer can help in some routes. Rules change, so we check the current requirements.' },
  { category: 'canada', q: 'Which language tests are accepted for Canada?', a: 'Approved English tests include IELTS General Training and CELPIP, and French tests include TEF Canada and TCF Canada. Results are converted to Canadian Language Benchmarks (CLB).' },
  { category: 'australia', q: 'How does the Australian points test work?', a: 'Skilled migration visas such as 189, 190 and 491 use a points test covering age, English, experience, education and other factors. You need at least 65 points to submit an Expression of Interest, but invitations usually go to higher scorers.' },
  { category: 'australia', q: 'What is the difference between subclass 189, 190 and 491?', a: 'Subclass 189 is independent and not tied to a state. Subclass 190 needs state or territory nomination. Subclass 491 is a regional visa that needs nomination or eligible family sponsorship.' },
  { category: 'australia', q: 'Do I need a skills assessment for Australia?', a: 'Yes. You need a positive skills assessment for an occupation on the relevant skilled occupation list from the assessing authority for that occupation.' },
  { category: 'uk', q: 'What are the main requirements for the UK Skilled Worker visa?', a: 'You need a job offer from a Home Office approved sponsor with a Certificate of Sponsorship, a job at the required skill level, English language ability and a salary that meets the threshold and going rate.' },
  { category: 'uk', q: 'How many points do I need for the UK Skilled Worker route?', a: 'You need 70 points. Fifty are mandatory (sponsor, skill level and English) and the rest come from salary or other tradeable criteria.' },
  { category: 'uk', q: 'Can I bring my family on a UK Skilled Worker visa?', a: 'Eligible dependants, such as a spouse or partner and children, can usually apply to join you. Recent rules have restricted this for some job types, so we confirm the current position.' },
  { category: 'nz', q: 'How does New Zealand skilled migration work?', a: 'New Zealand offers skilled work visas and residence routes that depend on your occupation, qualifications, experience and sometimes a job offer from an accredited employer.' },
  { category: 'nz', q: 'Do I need a job offer for New Zealand?', a: 'Many New Zealand work visas require a job offer from an accredited employer. Some residence routes depend on points, income or qualifications instead. We check which route fits you.' },
  { category: 'nz', q: 'Can I get residence after working in New Zealand?', a: 'Residence is possible through several skilled routes, usually after meeting work experience, skill, income or qualification requirements. Conditions change, so confirm them before you plan.' },
  { category: 'tourist', q: 'How long does a tourist visa take to process?', a: 'Processing times vary by country, season and your circumstances, from days to several weeks. Apply early and keep your documents complete and consistent.' },
  { category: 'tourist', q: 'Can I work on a tourist visa?', a: 'No. Tourist visas are for leisure, family visits and similar short stays. Working needs a work visa.' },
  { category: 'tourist', q: 'What documents do I usually need for a tourist visa?', a: 'Typically a valid passport, photographs, travel and accommodation plans, bank statements, proof of ties to your home country and travel insurance where required.' },
  { category: 'investor', q: 'What is a residence by investment (golden visa) program?', a: 'It grants residence in return for a qualifying investment such as property, funds or a business. Minimums, stay requirements and family rules differ by country.' },
  { category: 'investor', q: 'Is citizenship by investment the same as residence by investment?', a: 'No. Citizenship by investment grants a passport, while residence by investment grants a residence permit. They carry different rights, costs and obligations.' },
  { category: 'investor', q: 'Will my source of funds be checked?', a: 'Yes. Reputable programs run due diligence on your source of funds and background, so keep clear records of how your money was earned.' },
  { category: 'business', q: 'What is a business visit visa?', a: 'A business visit visa allows short stays for meetings, conferences and trade activity. It does not allow regular employment.' },
  { category: 'business', q: 'Can I move my company abroad with a business visa?', a: 'Visit visas are not for setting up a company. Entrepreneur, start-up and investor routes are designed for that, and each has its own requirements.' },
  { category: 'business', q: 'Do I need a business plan?', a: 'For entrepreneur and start-up routes, usually yes. A clear, realistic plan with finances and evidence of your experience strengthens an application.' },
];
