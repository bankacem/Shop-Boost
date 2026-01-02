
export enum BlockType {
  HERO = 'HERO',
  FEATURES = 'FEATURES',
  TESTIMONIALS = 'TESTIMONIALS',
  PRICING = 'PRICING',
  PRODUCT_GALLERY = 'PRODUCT_GALLERY',
  CTA = 'CTA',
  FOOTER = 'FOOTER',
  TRUST_BADGES = 'TRUST_BADGES',
  URGENCY_TIMER = 'URGENCY_TIMER',
  REVIEWS = 'REVIEWS',
  BUNDLE = 'BUNDLE',
  SOCIAL_PROOF = 'SOCIAL_PROOF'
}

export interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export interface PageData {
  id: string;
  title: string;
  status: 'draft' | 'published';
  blocks: Block[];
  views: number;
  revenue: number; // New: tracking money generated
  lastModified: string;
  abTesting?: {
    enabled: boolean;
    variantName: string;
    conversionRate: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'pro';
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string;
  description: string;
}
