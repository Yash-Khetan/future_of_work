export const WORLDS = [
  {
    id: 'red',
    name: 'Red World',
    tagline: 'Innovation Rules',
    color: '#FF4444',
    icon: '⚡',
    available: true,
    description: 'Few rules. Specialists win. Startups eat corporations. Your career is a portfolio of skills, not a job title.',
    indiaLens: 'Zomato · CRED · Ola · India\'s startup surge',
  },
  {
    id: 'blue',
    name: 'Blue World',
    tagline: 'Corporate is King',
    color: '#1A6EFF',
    icon: '🏢',
    available: true,
    description: 'Big firms dominate. AI augments elite workers. A corporate career separates the haves from the have-nots.',
    indiaLens: 'Infosys · TCS · HDFC · Big 4 consulting',
  },
  {
    id: 'green',
    name: 'Green World',
    tagline: 'Companies Care',
    color: '#22C55E',
    icon: '🌱',
    available: false,
    description: 'ESG is survival. Trust is currency. Your social licence to operate matters more than your margins.',
    indiaLens: 'Tata Group · SEBI ESG mandates · B Corp India',
  },
  {
    id: 'yellow',
    name: 'Yellow World',
    tagline: 'Humans First',
    color: '#F59E0B',
    icon: '🤝',
    available: false,
    description: 'Fairness dominates. Worker guilds emerge. Meaning beats money. Community businesses thrive.',
    indiaLens: 'Gig worker protests · ASHA workers · Artisan economy',
  },
]

export const STATS = [
  { value: '92M', label: 'Jobs displaced by 2030', color: '#FF6B35', source: 'Source: WEF 2025' },
  { value: '170M', label: 'New jobs created by 2030', color: '#00C2A8', source: 'Source: WEF 2025' },
  { value: '63%', label: 'Indian workers need retraining', color: '#1A6EFF', source: 'Source: McKinsey' },
  { value: '42.6%', label: 'Indian graduates employable', color: '#F59E0B', source: 'Source: ISR 2025' },
]

export const STEPS = [
  { num: 1, title: 'Choose Your World', desc: 'Pick from 4 possible futures, each grounded in global research' },
  { num: 2, title: 'Pick Your Role', desc: 'CEO, HR Lead, or Strategy Consultant — your lens changes everything' },
  { num: 3, title: 'Face Real Decisions', desc: '8-12 branching scenarios. No easy answers. Real stakes.' },
  { num: 4, title: 'Watch the Consequences', desc: 'A live dashboard tracks workforce health, revenue, trust, and talent' },
  { num: 5, title: 'Ask Aanya', desc: 'Your AI advisor explains what the research says about what just happened' },
  { num: 6, title: 'Compare & Reflect', desc: 'See how your classmates played the same world differently' },
]

export const SOURCES = [
  { abbr: 'WEF', label: 'WEF Future of Jobs 2025', color: '#1A6EFF', stat: '170M new jobs by 2030', desc: 'The defining macro dataset on automation and skills' },
  { abbr: 'MGI', label: 'McKinsey Global Institute', color: '#0D1B2A', stat: '375M workers must reskill', desc: 'Quantifying the scale of workforce transition required' },
  { abbr: 'PwC', label: 'PwC Workforce 2030', color: '#FF6B35', stat: '4 possible worlds', desc: 'The Four Worlds framework powering our simulation engine' },
  { abbr: 'ISR', label: 'India Skills Report 2025', color: '#00C2A8', stat: '42.6% employable', desc: 'India-specific data on graduate readiness and skills gap' },
]

export const CHAT_MESSAGES = [
  {
    from: 'aanya',
    text: 'You just automated 40% of your analyst team. Here\'s what the data says about that decision...',
  },
  {
    from: 'aanya',
    text: 'According to McKinsey, 375 million workers globally need to switch occupational categories by 2030. In India alone, 63% need retraining. Your decision just reflected that tension.',
  },
  {
    from: 'user',
    text: 'What should I have done instead?',
  },
  {
    from: 'aanya',
    text: 'There\'s no universally right answer — and that\'s the point. In the Red World, speed beats loyalty. In the Yellow World, that decision would have destroyed your social licence to operate. The world you\'re in changes everything.',
  },
]

export const INDUSTRIES = [
  { id: 'tech', label: 'Tech & Software', icon: '💻', available: true },
  { id: 'bfsi', label: 'BFSI', icon: '🏦', available: true },
  { id: 'consulting', label: 'Consulting', icon: '📊', available: false },
  { id: 'fmcg', label: 'FMCG', icon: '🛒', available: false },
]

export const ROLES = [
  { id: 'strategy', label: 'Strategy Lead', icon: '🎯', available: true },
  { id: 'hr', label: 'HR Director', icon: '👥', available: false },
  { id: 'ceo', label: 'CEO', icon: '⭐', available: false },
]
