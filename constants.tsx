
import React from 'react';
import { Layout, Star, ShoppingCart, Clock, CheckCircle, Image, List, CreditCard, MessageSquare, ShieldCheck, Users, Box } from 'lucide-react';
import { BlockType } from './types';

export const EDITOR_BLOCK_DEFINITIONS = [
  { type: BlockType.HERO, label: 'Hero Section', icon: <Layout className="w-5 h-5" /> },
  { type: BlockType.FEATURES, label: 'Features Grid', icon: <List className="w-5 h-5" /> },
  { type: BlockType.TESTIMONIALS, label: 'Testimonials', icon: <MessageSquare className="w-5 h-5" /> },
  { type: BlockType.PRICING, label: 'Pricing Table', icon: <CreditCard className="w-5 h-5" /> },
  { type: BlockType.PRODUCT_GALLERY, label: 'Product Gallery', icon: <Image className="w-5 h-5" /> },
  { type: BlockType.BUNDLE, label: 'Product Bundle', icon: <Box className="w-5 h-5" /> },
  { type: BlockType.CTA, label: 'CTA Button', icon: <ShoppingCart className="w-5 h-5" /> },
  { type: BlockType.TRUST_BADGES, label: 'Trust Badges', icon: <ShieldCheck className="w-5 h-5" /> },
  { type: BlockType.URGENCY_TIMER, label: 'Urgency Timer', icon: <Clock className="w-5 h-5" /> },
  { type: BlockType.SOCIAL_PROOF, label: 'Social Proof', icon: <Users className="w-5 h-5" /> },
  { type: BlockType.REVIEWS, label: 'Reviews', icon: <Star className="w-5 h-5" /> },
];

export const MOCK_PRODUCTS = [
  { id: '1', title: 'Luxe Glow Serum', price: '$49.00', image: 'https://picsum.photos/400/400?random=1', handle: 'luxe-glow', description: 'Transform your skin with our best-selling serum.' },
  { id: '2', title: 'Pure Hydration Cream', price: '$35.00', image: 'https://picsum.photos/400/400?random=2', handle: 'pure-hydration', description: 'Deep hydration for 24-hour radiance.' },
  { id: '3', title: 'Midnight Recovery Oil', price: '$58.00', image: 'https://picsum.photos/400/400?random=3', handle: 'midnight-recovery', description: 'Wake up to rejuvenated skin every morning.' },
];
