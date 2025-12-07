export interface Slide {
  id: string;
  deck_id?: string;
  type: 'Title' | 'Vision' | 'Problem' | 'Solution' | 'Market' | 'Product' | 'Traction' | 'BusinessModel' | 'Team' | 'Vision' | 'Ask';
  title: string;
  content: string[]; // Bullet points
  imageUrl?: string;
  notes?: string;
  layout?: 'default' | 'grid' | 'image-left' | 'image-right';
}

export const MOCK_SLIDES: Slide[] = [
  {
    id: '1',
    type: 'Title',
    title: 'StartupAI',
    content: ['The Future of Venture Capital', 'Seed Round Pitch Deck'],
    notes: 'Introduce yourself and the company mission briefly.',
    imageUrl: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    type: 'Problem',
    title: 'The Problem',
    content: [
      'Founders spend 40+ hours on pitch decks.',
      'Design agencies charge $5k+ for static slides.',
      'Investors reject 99% of decks due to poor narrative.'
    ],
    notes: 'Focus on the pain point. 40 hours is a lot of time lost.'
  },
  {
    id: '3',
    type: 'Solution',
    title: 'Our Solution',
    content: [
      'AI-powered narrative generation.',
      'Professional design system included.',
      'Real-time feedback from investor personas.'
    ],
    notes: 'Highlight the AI aspect heavily here.'
  },
  {
    id: '4',
    type: 'Market',
    title: 'Market Size',
    content: [
      'TAM: $50B Global Productivity Software',
      'SAM: $10B Design Tools',
      'SOM: $2B Early Stage Startups'
    ],
    notes: 'Be prepared to defend these numbers.'
  },
  {
    id: '5',
    type: 'Traction',
    title: 'Current Traction',
    content: [
      '$50k ARR in 3 months',
      '500+ Active Users',
      '3 Enterprise Pilots signed'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }
];
