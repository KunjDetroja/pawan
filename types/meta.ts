export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app';
  canonical?: string;
}
