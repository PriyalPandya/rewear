import { CustomerStory } from '@/types';

export const customerStoriesData: CustomerStory[] = [
  {
    id: 'story-1',
    author: 'Elena Vance',
    location: 'Design Student, Brooklyn',
    garment: 'Grandmother’s 1970s Wool Trench',
    story: 'The coat was drowning me in fabric and the lining was shredding, but the houndstooth wool was too beautiful to donate. ReWear recut the shoulders and cropped it into an incredible modern car coat. I wear it nearly every autumn day.',
    quote: 'They respected the soul of an heirloom while giving it an effortless, modern edge.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    serviceUsed: 'Creative Garment Redesign',
    isIllustrative: true,
  },
  {
    id: 'story-2',
    author: 'Marcus Chen',
    location: 'Software Engineer & Selvedge Collector',
    garment: '14.5oz Japanese Raw Denim Jeans',
    story: 'After 4 years of daily wear, I had crotch blowouts and frayed back pockets. Traditional tailors would just patch a crude denim square inside. ReWear did museum-grade darning that preserved the honeycomb fades and reinforced the pocket bags.',
    quote: 'The repair work blends so naturally into the denim character that people ask where I bought them.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    serviceUsed: 'Denim Restoration & Re-craft',
    isIllustrative: true,
  },
  {
    id: 'story-3',
    author: 'Sora Tanaka',
    location: 'Vintage Curator, Portland',
    garment: 'Stained Silk Slip & Unwearable Jeans',
    story: 'I had two pieces destined for textile recycling: a silk slip with an oil stain and jeans with worn-out cuffs. ReWear transformed the denim into a gorgeous structured tote bag and used the silk as an inner luxury lining.',
    quote: 'Instead of two pieces ending up in a landfill, I now have a timeless bespoke bag I treasure.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    serviceUsed: 'Upcycled Accessories',
    isIllustrative: true,
  },
];

export interface FeaturedStory {
  id: string;
  title: string;
  clientContext: string;
  artisanNote: string;
  challenge: string;
  solution: string;
  environmentalFact: string;
  image: string;
  transformationId: string;
}

export const featuredStoriesData: FeaturedStory[] = [
  {
    id: 'feat-1',
    title: 'Reviving a 1982 Levi’s Trucker with Japanese Boro Stitching',
    clientContext: 'Inherited from a father who wore it through college in the early 1980s.',
    challenge: 'Severe collar abrasion, blown elbows, and brittle seams across both shoulders that could no longer hold tension.',
    solution: 'Reinforced the underside with vintage indigo sashiko cloth, hand-stitched 800+ micro-stitches across stress zones, and replaced corroded snap buttons with reclaimed antique brass hardware.',
    artisanNote: '"We deliberately allowed the indigo thread to contrast gently against the aged blue denim, treating each historical tear like an intentional design line."',
    environmentalFact: 'Extending the life of a cotton garment by just 9 months reduces its combined carbon, waste, and water footprint by ~20-30% (WRAP UK Sustainable Clothing Action Plan).',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80',
    transformationId: 'trans-2',
  },
  {
    id: 'feat-2',
    title: 'Transforming an Unworn XL Poplin Shirt into a Sculptural Wrap Crop',
    clientContext: 'Purchased during a sample sale but sat unworn in the wardrobe for three years due to disproportionate sizing.',
    challenge: 'Excessive torso volume, droopy dropped shoulders, and sleeves that extended past the fingertips.',
    solution: 'Recut the armholes, introduced architectural bust darts, removed 14 inches from the lower hem to construct self-fabric wrap ties, and converted cuffs into clean lantern cuffs.',
    artisanNote: '"High-grade cotton poplin is an absolute joy to recut. With the right tension and tailored proportions, a corporate men’s shirt becomes high-fashion street couture."',
    environmentalFact: 'Keeping existing clothing in active use avoids the high water intensity of virgin cotton agriculture (~10,000 to 20,000 liters per kg of cotton fabric).',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    transformationId: 'trans-3',
  },
];
