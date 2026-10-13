export interface ServicePage {
  slug: string;
  title: string;
  tagline: string;
  /** <title> text; the site template appends "| Migrantly". */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  description: string;
  image: string;
  intro: string[];
  whoFor: string[];
  features: string[];
  steps: { title: string; text: string }[];
  documents: string[];
  faqs: { q: string; a: string }[];
}

const IMG = {
  canada: '/assets/images/1503614472-8c93d56e92ce.webp',
  australia: '/assets/images/1506744038136-46273834b3fb.webp',
  laptop: '/assets/images/1454165804606-c3d57bc86b40.webp',
  handshake: '/assets/images/1521791136064-7986c2920216.webp',
  portrait: '/assets/images/1573497019940-1c28c88b4f3e.webp',
};

const standardSteps = (first: string, last: string) => [
  { title: 'Free consultation', text: first },
  { title: 'Eligibility review', text: 'We compare your profile with the current requirements and tell you honestly which routes are realistic.' },
  { title: 'Application preparation', text: 'We organise your documents, check them for gaps and prepare the application for submission.' },
  { title: 'Submission and follow-up', text: last },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'permanent-residence',
    title: 'Permanent Residence',
    tagline: 'Build your future with the right to stay',
    metaTitle: 'Permanent Residence Visa Consultants — PR Pathways',
    metaDescription: 'Explore permanent residence pathways for Canada, Australia, the UK and more. Get an honest eligibility review and step-by-step application support from Migrantly.',
    keywords: ['permanent residence', 'PR visa', 'permanent residency consultants', 'Canada PR', 'Australia PR'],
    description: 'Permanent residence gives you the right to live, work and study long term in a new country. We help you choose the pathway that fits your profile and prepare a strong application.',
    image: IMG.canada,
    intro: [
      'Permanent residence (PR) lets you settle in another country without a fixed end date, usually with access to work, healthcare and a route to citizenship. Each country runs its own system, from points-based skilled migration to family and investment routes.',
      'Choosing the wrong route costs time and money. We start by understanding your qualifications, work history, language level and family situation, then point you to the pathways where you have a genuine chance.',
    ],
    whoFor: ['Skilled professionals who want to settle permanently', 'Families planning a long-term move', 'Graduates and workers already abroad who want to convert temporary status', 'Applicants unsure which country suits their profile'],
    features: ['Eligibility and points assessment', 'Pathway comparison across countries', 'Language test and skills assessment guidance', 'Document checklist and review', 'Application preparation and submission support', 'Guidance after you receive a decision'],
    steps: standardSteps('Tell us about your education, experience, language skills and goals.', 'We submit the application, track progress and help you respond to any requests from the authorities.'),
    documents: ['Valid passport', 'Educational certificates and transcripts', 'Employment letters and experience records', 'Language test results', 'Police clearance and medical examinations', 'Proof of funds where required'],
    faqs: [
      { q: 'What is the difference between permanent residence and citizenship?', a: 'Permanent residence lets you live and work long term but you remain a citizen of your home country. Citizenship is a separate, later step with its own residence and language requirements.' },
      { q: 'How long does a permanent residence application take?', a: 'It depends on the country and route. Processing times change often, so we give you the current official guidance rather than a fixed promise.' },
      { q: 'Can I include my family?', a: 'Most permanent residence routes allow a spouse or partner and dependent children to be included. The rules differ by country.' },
    ],
  },
  {
    slug: 'citizenship-by-investment',
    title: 'Citizenship by Investment',
    tagline: 'A second passport through qualifying investment',
    metaTitle: 'Citizenship by Investment — Second Passport Programs',
    metaDescription: 'Learn how citizenship by investment programs work, who qualifies and what due diligence involves. Independent guidance on second passport options from Migrantly.',
    keywords: ['citizenship by investment', 'second passport', 'CBI programs', 'investor citizenship'],
    description: 'Citizenship by investment programs grant a second passport in return for a qualifying contribution. We explain the options, the costs and the checks involved before you commit.',
    image: IMG.laptop,
    intro: [
      'Citizenship by investment (CBI) allows eligible applicants to obtain citizenship, and a passport, by making a government-approved contribution or investment. Programs exist in a small number of countries and the terms change as governments update them.',
      'These programs involve significant sums and strict background checks. We help you compare the options, understand the real total cost, and prepare a clean application.',
    ],
    whoFor: ['Investors and business owners seeking mobility and a second passport', 'Families planning for security and global travel', 'Applicants who meet source-of-funds and due-diligence standards'],
    features: ['Program comparison and suitability review', 'Total cost breakdown, including fees and due diligence', 'Source-of-funds documentation guidance', 'Application preparation and submission', 'Coordination with approved agents and legal advisers', 'Dependants and family inclusion advice'],
    steps: standardSteps('Share your budget, goals and family situation so we can narrow the options.', 'We submit the application, handle queries and keep you informed until a decision is issued.'),
    documents: ['Valid passport and civil documents', 'Proof of source of funds and wealth', 'Police clearance certificates', 'Bank references', 'Medical examination where required', 'Passport photographs'],
    faqs: [
      { q: 'Is a second passport the same as permanent residence?', a: 'No. Citizenship gives you a passport and full citizenship rights, while residence is a visa status. They have different obligations and benefits.' },
      { q: 'Will my application face background checks?', a: 'Yes. Reputable programs run thorough due diligence, including checks on your source of funds and criminal record.' },
      { q: 'Do programs change?', a: 'Yes. Governments adjust investment thresholds and rules, so always confirm current terms before committing funds.' },
    ],
  },
  {
    slug: 'residence-by-investment',
    title: 'Residence by Investment',
    tagline: 'Residency in return for qualifying investment',
    metaTitle: 'Residence by Investment — Golden Visa Programs',
    metaDescription: 'Compare residence by investment and golden visa programs. Understand investment options, family inclusion and the path to long-term residence with Migrantly.',
    keywords: ['residence by investment', 'golden visa', 'investor visa', 'residency by investment'],
    description: 'Residence by investment, often called a golden visa, grants residency to people who make an approved investment. We help you compare programs and avoid common pitfalls.',
    image: IMG.portrait,
    intro: [
      'Residence by investment programs offer a residence permit when you invest in property, funds, a business or government-approved assets. Many allow your spouse and children to be included.',
      'Requirements differ widely, including minimum investment, stay obligations and renewal terms. We explain these clearly so you can compare programs on facts rather than marketing.',
    ],
    whoFor: ['Investors who want residence in another country', 'Business owners seeking a base in a new region', 'Families who want flexibility without relocating full time'],
    features: ['Program shortlisting by country and budget', 'Investment structure and risk explanation', 'Family inclusion and dependants advice', 'Document and source-of-funds preparation', 'Application submission and follow-up', 'Renewal and long-term residence guidance'],
    steps: standardSteps('Tell us your investment range, preferred region and timeline.', 'We submit your application, coordinate with local advisers where needed and support you through renewal.'),
    documents: ['Valid passport', 'Proof of investment funds and their source', 'Police clearance', 'Health insurance where required', 'Marriage and birth certificates for family members', 'Investment agreement or purchase documents'],
    faqs: [
      { q: 'Does residence by investment lead to citizenship?', a: 'In some countries it can after a number of years, subject to residence, language and other rules. In others it does not.' },
      { q: 'Do I have to live in the country?', a: 'Stay requirements vary. Some programs require little physical presence while others have minimum stays.' },
      { q: 'What are the main risks?', a: 'Investment performance, changing rules and unclear exit terms. We help you review these before you commit.' },
    ],
  },
  {
    slug: 'student-visa',
    title: 'Student Visa',
    tagline: 'Study abroad with confidence',
    metaTitle: 'Student Visa Consultants — Study Abroad Visa Support',
    metaDescription: 'Get help with student visa applications for Canada, Australia, the UK and the US. Course selection, documents, funds and interview preparation from Migrantly.',
    keywords: ['student visa', 'study abroad', 'study permit', 'student visa consultants'],
    description: 'A student visa lets you study at a recognised institution abroad. We guide you from course choice to visa approval and help you plan for work and stay options after graduation.',
    image: IMG.handshake,
    intro: [
      'A strong student visa application shows a genuine study plan, enough funds and a clear reason for choosing your course and country. Refusals often come from weak documents or unclear intent, both of which can be avoided with preparation.',
      'We help you shortlist institutions, meet admission and visa requirements, and understand work rights during and after study.',
    ],
    whoFor: ['Students applying to universities and colleges abroad', 'Parents supporting a child’s study plans', 'Graduates considering further study', 'Students planning a later move to permanent residence'],
    features: ['Course and country selection', 'Admission application support', 'Financial proof and funding guidance', 'Statement of purpose review', 'Visa application and interview preparation', 'Dependant and post-study work guidance'],
    steps: standardSteps('Share your academic background, budget and the courses you are considering.', 'We submit your visa application, prepare you for any interview and support you until you receive a decision.'),
    documents: ['Passport', 'Offer or acceptance letter', 'Academic transcripts and certificates', 'English test results', 'Proof of funds and sponsor documents', 'Statement of purpose and medical or police checks where required'],
    faqs: [
      { q: 'Can I work while I study?', a: 'Many countries allow limited work hours during study. The hours and conditions depend on the country and visa.' },
      { q: 'Can I bring my family?', a: 'Often yes, but rules on spouses and children vary and may depend on your course level.' },
      { q: 'What if my visa is refused?', a: 'We review the refusal reasons and advise whether to reapply, appeal or change your plan.' },
    ],
  },
  {
    slug: 'global-tourist-visa',
    title: 'Global Tourist Visa',
    tagline: 'Travel the world without the paperwork stress',
    metaTitle: 'Tourist Visa Assistance — Visit Visas for Worldwide Travel',
    metaDescription: 'Fast, careful tourist visa support for Schengen, UK, US, Canada, Australia and more. Document checks, itinerary planning and application help from Migrantly.',
    keywords: ['tourist visa', 'visit visa', 'Schengen visa', 'travel visa assistance'],
    description: 'We help you prepare complete, well-organised tourist visa applications for destinations around the world, so you can travel with fewer delays.',
    image: IMG.australia,
    intro: [
      'A tourist visa is usually granted for short stays for leisure, family visits or tourism. Authorities look for proof that you can fund the trip and that you plan to return home.',
      'We check your documents against each destination’s requirements and help you present a clear, consistent application.',
    ],
    whoFor: ['Holiday travellers', 'People visiting family or friends abroad', 'Frequent travellers who want multi-country planning', 'First-time applicants unsure of the process'],
    features: ['Destination requirement checks', 'Document checklist and review', 'Travel itinerary and accommodation guidance', 'Appointment booking support', 'Cover letter preparation', 'Guidance on refused or delayed applications'],
    steps: standardSteps('Tell us where, when and why you plan to travel.', 'We submit or guide your submission, track the application and advise on next steps once a decision arrives.'),
    documents: ['Valid passport', 'Passport photographs', 'Bank statements and proof of income', 'Travel and accommodation plans', 'Travel insurance where required', 'Employment or business proof'],
    faqs: [
      { q: 'How early should I apply?', a: 'Apply as early as the embassy allows, since processing and appointment times vary by destination and season.' },
      { q: 'Does a tourist visa allow me to work?', a: 'No. Tourist visas do not allow employment. Work needs a separate visa.' },
      { q: 'Can I extend my stay?', a: 'Some countries allow extensions in limited cases. We advise on the rules for your destination.' },
    ],
  },
  {
    slug: 'dependent-visa',
    title: 'Dependent Visa',
    tagline: 'Keep your family together abroad',
    metaTitle: 'Dependent Visa Services — Spouse & Children Visa Support',
    metaDescription: 'Bring your spouse, partner and children with you. Migrantly guides dependent visa applications, documents and timing for popular destinations.',
    keywords: ['dependent visa', 'spouse visa', 'family accompaniment', 'dependant visa'],
    description: 'A dependent visa allows the family of a worker, student or resident to join them abroad. We help you meet the relationship, financial and documentation requirements.',
    image: IMG.portrait,
    intro: [
      'Dependent visas let eligible family members, usually a spouse or partner and children, live in the country with the main visa holder. Requirements often include proof of relationship, accommodation and sufficient funds.',
      'We help you work out who can be included, in what order to apply and which documents prove your relationship.',
    ],
    whoFor: ['Workers and students who want to bring their family', 'Permanent residents sponsoring family members', 'Spouses and partners joining a family member abroad'],
    features: ['Eligibility check for each family member', 'Relationship evidence guidance', 'Financial and accommodation requirements', 'Application preparation and submission', 'Timing advice with the main applicant’s visa', 'Support with renewals and changes'],
    steps: standardSteps('Tell us about the main applicant and the family members who want to join.', 'We submit the applications together or in sequence and keep you informed until all decisions are made.'),
    documents: ['Passports for all applicants', 'Marriage and birth certificates', 'Main applicant’s visa or status evidence', 'Proof of funds and accommodation', 'Photographs', 'Medical and police checks where required'],
    faqs: [
      { q: 'Can dependants work or study?', a: 'It depends on the country and the main visa. Some allow work and study, others restrict it.' },
      { q: 'Are unmarried partners covered?', a: 'Some countries recognise long-term partners, others do not. We check the rules for your destination.' },
      { q: 'Is there an age limit for children?', a: 'Most countries set an age limit for dependent children, often with exceptions for students or those with disabilities.' },
    ],
  },
  {
    slug: 'family-sponsorship',
    title: 'Family Sponsorship',
    tagline: 'Reunite with the people who matter most',
    metaTitle: 'Family Sponsorship Visa — Spouse, Parent & Child Sponsorship',
    metaDescription: 'Sponsor your spouse, partner, children or parents. Migrantly explains eligibility, obligations and documents for family sponsorship applications.',
    keywords: ['family sponsorship', 'spouse sponsorship', 'parent sponsorship', 'family reunification visa'],
    description: 'Family sponsorship lets citizens and permanent residents bring close relatives to live with them. We help you understand eligibility, obligations and what evidence strengthens your case.',
    image: IMG.handshake,
    intro: [
      'Family sponsorship routes exist in most major destinations, but each sets different rules about who can sponsor, who can be sponsored and what financial commitments apply.',
      'We explain the obligations before you apply and help you build a well-documented, genuine-relationship application.',
    ],
    whoFor: ['Citizens and permanent residents sponsoring a spouse or partner', 'Families sponsoring children or parents', 'Couples in long-distance relationships'],
    features: ['Sponsor and applicant eligibility review', 'Relationship evidence preparation', 'Financial and undertaking requirements', 'Application preparation and submission', 'Responding to additional information requests', 'Guidance on appeals and reapplications'],
    steps: standardSteps('Tell us about the sponsor, the applicant and your relationship.', 'We submit the sponsorship and visa applications, follow up with the authorities and advise on next steps.'),
    documents: ['Sponsor’s proof of status', 'Applicant’s passport', 'Marriage or relationship evidence', 'Birth certificates for children', 'Proof of sponsor’s income where required', 'Police and medical checks'],
    faqs: [
      { q: 'How strong does the relationship evidence need to be?', a: 'Authorities look for genuine, ongoing relationships. Photos, communications, shared finances and travel history all help.' },
      { q: 'Does sponsorship come with obligations?', a: 'Yes. Sponsors often commit to financial support for a period. We explain these before you apply.' },
      { q: 'Can parents be sponsored?', a: 'Some countries allow it, often with caps, queues or special programs. Rules vary, so we check current options.' },
    ],
  },
  {
    slug: 'job-offers-work-permit',
    title: 'Job Offers & Work Permit',
    tagline: 'Turn a job offer into a work visa',
    metaTitle: 'Work Permit & Job Offer Visa Support — Work Visas Abroad',
    metaDescription: 'Support for work permits and employer-sponsored visas. Migrantly helps with eligibility, employer requirements and applications for work abroad.',
    keywords: ['work permit', 'work visa', 'employer sponsored visa', 'job offer visa'],
    description: 'A work permit lets you take up employment abroad. We help candidates and employers understand sponsorship requirements and prepare accurate, complete applications.',
    image: IMG.laptop,
    intro: [
      'Most work visas depend on a genuine job offer from an approved or qualifying employer, and the job often has to meet skill or salary conditions.',
      'We guide you through what the employer must provide, what you must prove, and how to move from a work permit to longer-term residence where that is possible.',
    ],
    whoFor: ['Professionals with a job offer abroad', 'Workers seeking employer sponsorship', 'Employers hiring international talent', 'Workers hoping to convert a permit to permanent residence'],
    features: ['Eligibility and occupation checks', 'Employer sponsorship guidance', 'Job offer and contract review', 'Application preparation and submission', 'Dependant inclusion advice', 'Pathways from work permit to residence'],
    steps: standardSteps('Share your job offer details, qualifications and experience.', 'We submit the application, liaise with the employer where needed and follow progress to a decision.'),
    documents: ['Passport', 'Signed job offer or contract', 'Qualifications and experience letters', 'CV', 'Language test results where required', 'Police and medical checks'],
    faqs: [
      { q: 'Can I change employers on a work permit?', a: 'Some permits are tied to one employer, while others are open. We check the conditions of your visa.' },
      { q: 'Does the employer need to be approved?', a: 'Many countries require employers to be licensed or to complete a labour market process first.' },
      { q: 'Can I get a job offer through you?', a: 'We guide the visa side and share general job-search advice. We cannot guarantee a job offer.' },
    ],
  },
  {
    slug: 'temporary-visa',
    title: 'Temporary Visa',
    tagline: 'Short and medium-term stays, handled properly',
    metaTitle: 'Temporary Visa Services — Short-Term Stay & Extension Support',
    metaDescription: 'Help with temporary visas, extensions and status changes. Migrantly guides short and medium-term stays for work, study, visits and more.',
    keywords: ['temporary visa', 'visa extension', 'temporary resident visa', 'change of status'],
    description: 'Temporary visas cover stays for work, study, business, treatment and visits. We help you choose the right category, apply on time and manage extensions.',
    image: IMG.australia,
    intro: [
      'Temporary visas come with a fixed purpose and end date. Applying under the wrong category, or letting a visa lapse, can create serious problems later.',
      'We help you pick the correct visa, keep track of expiry dates and plan extensions or changes of status before it is too late.',
    ],
    whoFor: ['People planning a short or medium-term stay abroad', 'Temporary residents who need to extend or change status', 'Applicants unsure which temporary category fits'],
    features: ['Visa category selection', 'Application preparation and submission', 'Extension and renewal planning', 'Change-of-status guidance', 'Expiry tracking and reminders', 'Support if an application is refused'],
    steps: standardSteps('Tell us the purpose and expected length of your stay.', 'We submit your application, track the decision and advise on extensions or longer-term options.'),
    documents: ['Passport', 'Proof of purpose of stay', 'Proof of funds', 'Accommodation details', 'Photographs', 'Supporting letters from employer, school or host'],
    faqs: [
      { q: 'Can I switch from a temporary visa to permanent residence?', a: 'Sometimes. Many countries offer pathways from temporary status to residence, but not every visa qualifies.' },
      { q: 'What happens if my visa expires while I wait for an extension?', a: 'Rules differ. Some countries allow you to remain while an in-time application is processed. We advise on your situation.' },
      { q: 'How long can I stay?', a: 'The length depends on the visa category and country, and is set out in your visa conditions.' },
    ],
  },
  {
    slug: 'language-coaching',
    title: 'Language Coaching',
    tagline: 'Reach the score your application needs',
    metaTitle: 'IELTS, CELPIP & Language Coaching for Immigration',
    metaDescription: 'Language coaching for immigration: IELTS, CELPIP, PTE, TEF and German. Improve your score and strengthen your immigration points with Migrantly.',
    keywords: ['IELTS coaching', 'CELPIP', 'PTE preparation', 'language test for immigration', 'German language'],
    description: 'Language results can add major points to your immigration profile. We connect you with focused coaching for the tests your pathway accepts.',
    image: IMG.handshake,
    intro: [
      'Many immigration systems score language ability heavily. Raising your result by even one level can add substantial points or make you eligible for a pathway you could not use before.',
      'We help you identify which test and score your target country requires, and arrange coaching and practice that fits your timetable.',
    ],
    whoFor: ['Applicants who need a language test for visa or points', 'Students preparing for admission', 'Professionals improving their score for skilled migration', 'Applicants learning German for Germany pathways'],
    features: ['Target score planning based on your pathway', 'IELTS, CELPIP and PTE preparation', 'French testing preparation for Canada', 'German language levels for Germany routes', 'Mock tests and feedback', 'Flexible online and in-person options'],
    steps: [
      { title: 'Score goal', text: 'We identify the test and the minimum or ideal score for your pathway.' },
      { title: 'Level check', text: 'A short diagnostic shows where you are today and which skills need work.' },
      { title: 'Coaching plan', text: 'You get a study plan with practice materials and regular feedback.' },
      { title: 'Test and results', text: 'We help you book the exam and plan next steps once results arrive.' },
    ],
    documents: ['Valid ID for test registration', 'Previous test results, if any', 'Details of your target program or visa'],
    faqs: [
      { q: 'Which test should I take?', a: 'It depends on the country and program. We check which tests are accepted for your pathway before you book.' },
      { q: 'How long does preparation take?', a: 'It depends on your starting level and target score. A diagnostic test gives a realistic estimate.' },
      { q: 'Do test results expire?', a: 'Yes. Most results are valid for about two years, so timing the test with your application matters.' },
    ],
  },
  {
    slug: 'germany-opportunity-card',
    title: 'Germany Opportunity Card',
    tagline: 'Look for work in Germany with a Chancenkarte',
    metaTitle: 'Germany Opportunity Card (Chancenkarte) — Job Seeker Visa',
    metaDescription: 'Apply for the Germany Opportunity Card (Chancenkarte). Learn about eligibility, the points system, documents and next steps with Migrantly.',
    keywords: ['Germany Opportunity Card', 'Chancenkarte', 'Germany job seeker visa', 'work in Germany'],
    description: 'The Germany Opportunity Card is a points-based residence permit that lets qualified professionals move to Germany to look for work. We help you prepare a complete application.',
    image: IMG.laptop,
    intro: [
      'The Opportunity Card (Chancenkarte) lets qualified people from outside the EU enter Germany to look for a job. Eligibility is based on qualifications, language, work experience, age and other factors, and applicants must also show enough funds to support themselves.',
      'We review your qualifications and recognition status, check your language level and help you prepare the documents the German authorities expect.',
    ],
    whoFor: ['Skilled professionals who want to search for work in Germany', 'Graduates and vocationally trained workers', 'Applicants with German or English language skills', 'Partners and family planning to join later'],
    features: ['Eligibility and points review', 'Qualification recognition guidance', 'Language requirement planning', 'Proof of funds and accommodation guidance', 'Application and appointment support', 'Advice on finding work and switching to a work visa'],
    steps: [
      { title: 'Profile check', text: 'We review your degree or training, work history, language and age against the eligibility rules.' },
      { title: 'Recognition and language', text: 'We guide you on getting your qualification checked and meeting the language level you need.' },
      { title: 'Documents and funds', text: 'We prepare your documents and help you show you can support yourself while you search.' },
      { title: 'Application and arrival', text: 'We support your visa application and give practical advice for your job search once you arrive.' },
    ],
    documents: ['Valid passport', 'Degree or vocational certificates and recognition proof', 'Language certificates', 'CV and work experience evidence', 'Proof of funds', 'Health insurance and accommodation details'],
    faqs: [
      { q: 'Can I work on an Opportunity Card?', a: 'The card allows limited work alongside your job search, plus trial employment. The rules and hours are set by German law, so we confirm the current conditions with you.' },
      { q: 'Do I need to speak German?', a: 'Language skills earn points and help your job search. Requirements depend on your profile, so we check what applies to you.' },
      { q: 'What happens when I find a job?', a: 'You can usually change to a work visa or residence permit tied to your employment. We advise on the steps.' },
    ],
  },
  {
    slug: 'business-visa',
    title: 'Business Visa',
    tagline: 'Meetings, trade and expansion abroad',
    metaTitle: 'Business Visa Services — Business Visit & Entrepreneur Visas',
    metaDescription: 'Business visa support for meetings, conferences, trade and entrepreneur routes. Migrantly prepares complete applications and invitation documents.',
    keywords: ['business visa', 'business visit visa', 'entrepreneur visa', 'start-up visa'],
    description: 'Business visas cover short trips for meetings and conferences as well as longer routes for entrepreneurs and investors. We help you choose the right category and prepare the evidence.',
    image: IMG.portrait,
    intro: [
      'Business visit visas allow short stays for meetings, negotiations, conferences and site visits, but not normal employment. Longer routes exist for founders, start-ups and investors who plan to build a business abroad.',
      'We help you pick the right category, prepare invitation letters and company evidence, and present your plans clearly.',
    ],
    whoFor: ['Business owners and executives travelling for meetings', 'Delegates attending conferences and trade fairs', 'Entrepreneurs planning a company abroad', 'Investors exploring a new market'],
    features: ['Visa category selection', 'Invitation letter and company document guidance', 'Business plan review for entrepreneur routes', 'Application preparation and submission', 'Multiple-entry visa planning', 'Guidance on moving to longer-term business residence'],
    steps: standardSteps('Tell us the purpose of your trip or the business you plan to run.', 'We submit your application, track the decision and advise on future trips or longer-term options.'),
    documents: ['Passport', 'Company registration and letters', 'Invitation letter from the host', 'Bank statements and tax records', 'Travel itinerary', 'Business plan for entrepreneur routes'],
    faqs: [
      { q: 'Can I work on a business visit visa?', a: 'Business visit visas allow meetings and similar activities, not regular employment. Doing paid work needs a different visa.' },
      { q: 'How long can I stay?', a: 'Stay limits depend on the country and visa category. They are listed in the visa conditions.' },
      { q: 'Can I start a company with a business visa?', a: 'Visit visas are not for setting up a business. Entrepreneur and investor routes are designed for that, and we help you assess them.' },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);
