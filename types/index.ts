export type ServiceCategory = 'all' | 'repair' | 'alteration' | 'redesign' | 'upcycling';

export interface TransformationItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'repair' | 'alteration' | 'redesign' | 'upcycling';
  beforeImage: string;
  afterImage: string;
  originalGarment: string;
  transformedResult: string;
  description: string;
  indicativePrice: number;
  currency: string;
  estimatedTurnaround: string;
  craftTechniques: string[];
  impactNote: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  startingPrice: number;
  priceRange: string;
  estimatedTurnaround: string;
  image: string;
  category: 'repair' | 'alteration' | 'redesign' | 'upcycling';
  highlights: string[];
  idealFor: string[];
}

export interface GarmentRecommendationInput {
  garmentType: string;
  condition: string;
  desiredOutcome: string;
  budgetRange: string;
}

export interface RecommendationResult {
  recommendedService: string;
  recommendedServiceSlug: string;
  explanation: string;
  estimatedCost: string;
  turnaroundTime: string;
  suggestedTransformations: string[];
}

export interface CustomerStory {
  id: string;
  author: string;
  location: string;
  garment: string;
  story: string;
  quote: string;
  avatar: string;
  rating: number;
  serviceUsed: string;
  isIllustrative: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'services' | 'pricing' | 'process' | 'sustainability';
}

export interface EnquirySubmission {
  id?: string;
  reference_code?: string;
  customer_name: string;
  email: string;
  phone?: string | null;
  garment_type: string;
  garment_condition: string;
  service_type: string;
  budget_range: string;
  preferred_timeframe: string;
  description: string;
  image_url?: string | null;
  status?: string;
  created_at?: string;
}
