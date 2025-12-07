export type SlideType = 
  | 'title' 
  | 'vision' 
  | 'problem' 
  | 'solution' 
  | 'market' 
  | 'product' 
  | 'traction' 
  | 'competition' 
  | 'team' 
  | 'ask' 
  | 'roadmap' 
  | 'generic';

export interface Deck {
  id: string;
  org_id: string;
  user_id?: string;
  startup_id?: string;
  title: string;
  description?: string;
  template: string;
  format: 'standard' | 'yc' | 'sequoia';
  status: 'draft' | 'published';
  theme_config?: Record<string, any>;
  slides_snapshot?: Slide[];
  meta?: Record<string, any>;
  last_accessed_at?: string;
  created_at: string;
  updated_at: string;
}

export type ChartData = Record<string, any>;
export type TableData = Record<string, any>;

export interface Slide {
  id: string;
  deck_id: string;
  position: number;
  type: SlideType;
  title: string;
  content?: string;
  bullets?: string[];
  image_url?: string;
  template?: string;
  layout: 'default' | 'grid' | 'image-left' | 'image-right';
  chart_data?: ChartData;
  table_data?: TableData;
  speaker_notes?: string;
  meta?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ShareLink {
  id: string;
  deck_id: string;
  token: string;
  view_count: number;
  expires_at?: string;
  created_at: string;
}

export interface Asset {
  id: string;
  slide_id: string;
  bucket_id: string;
  object_path: string;
  asset_type: 'image' | 'chart_spec' | 'other';
  created_at: string;
}

export interface Citation {
  id: string;
  slide_id: string;
  source_url: string;
  quote?: string;
  created_at: string;
}
