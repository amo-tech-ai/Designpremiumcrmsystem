export interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export const TEMPLATES: Template[] = [
  {
    id: 'minimal-dark',
    name: 'Obsidian Minimal',
    description: 'A sleek, high-contrast dark theme optimized for readability and modern SaaS aesthetics.',
    color: '#1e293b', 
    category: 'Modern',
    fonts: { heading: 'Inter', body: 'Inter' },
    colors: { primary: '#ffffff', background: '#0f172a', text: '#f8fafc', accent: '#3b82f6' }
  },
  {
    id: 'swiss-grid',
    name: 'Swiss Grid',
    description: 'Clean typography and rigid grid systems inspired by international typographic style.',
    color: '#dc2626', 
    category: 'Corporate',
    fonts: { heading: 'Helvetica', body: 'Arial' },
    colors: { primary: '#111827', background: '#ffffff', text: '#374151', accent: '#dc2626' }
  },
  {
    id: 'nature-soft',
    name: 'Nature Soft',
    description: 'Calming earth tones and organic shapes for wellness and sustainable brands.',
    color: '#059669', 
    category: 'Lifestyle',
    fonts: { heading: 'DM Serif Display', body: 'DM Sans' },
    colors: { primary: '#064e3b', background: '#f0fdf4', text: '#166534', accent: '#059669' }
  },
  {
    id: 'tech-neon',
    name: 'Cyber Neon',
    description: 'Vibrant gradients and bold futuristic fonts for crypto, AI, and gaming startups.',
    color: '#7c3aed', 
    category: 'Tech',
    fonts: { heading: 'Space Grotesk', body: 'Inter' },
    colors: { primary: '#ffffff', background: '#1e1b4b', text: '#e0e7ff', accent: '#8b5cf6' }
  },
  {
    id: 'paper-serif',
    name: 'Editorial Paper',
    description: 'Classic serif typography on textured backgrounds for a sophisticated look.',
    color: '#ea580c', 
    category: 'Editorial',
    fonts: { heading: 'Playfair Display', body: 'Merriweather' },
    colors: { primary: '#431407', background: '#fff7ed', text: '#78350f', accent: '#ea580c' }
  }
];
