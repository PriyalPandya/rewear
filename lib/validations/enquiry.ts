import { z } from 'zod';

export const garmentTypes = [
  'Denim & Jeans',
  'Jacket & Outerwear',
  'Shirt & Blouse',
  'Dress & Gown',
  'Sweater & Knitwear',
  'Trousers & Pants',
  'T-Shirt & Tops',
  'Leather & Suede',
  'Other / Mixed Textiles',
] as const;

export const garmentConditions = [
  'Minor wear / small tears or missing buttons',
  'Broken zipper / seams unstitched',
  'Poor fit / too oversized or tight',
  'Outdated silhouette / needs redesign',
  'Heavy distress / fabric thinning',
  'Stained / faded but quality fabric',
  'Sentimental heirloom garment',
] as const;

export const serviceTypes = [
  'Clothing Repair & Invisible Mending',
  'Fit & Size Alterations',
  'Creative Garment Redesign',
  'Denim Restoration & Re-craft',
  'Artisan Embroidery & Patchwork',
  'Upcycled Bags & Accessories',
] as const;

export const budgetRanges = [
  '₹299 - ₹699 (Essential Repair)',
  '₹699 - ₹1,499 (Standard Alteration / Mending)',
  '₹1,499 - ₹2,999 (Creative Redesign / Heavy Denim)',
  '₹2,999+ (Bespoke Transformation & Art Piece)',
  'Need artisan guidance / Flexible',
] as const;

export const timeframeOptions = [
  'Standard (7 - 10 business days)',
  'Priority Express (3 - 5 business days)',
  'No rush / Circular pace (Flexible)',
] as const;

export const enquirySchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(80, { message: 'Name cannot exceed 80 characters' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Please enter a valid email address' })
    .max(120, { message: 'Email cannot exceed 120 characters' }),
  phone: z
    .string()
    .trim()
    .min(10, { message: 'Please enter a valid 10-digit Indian contact number' })
    .max(25, { message: 'Contact number cannot exceed 25 characters' })
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length === 10 || (digits.length === 12 && digits.startsWith('91'));
      },
      { message: 'Please enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210)' }
    ),
  garment_type: z
    .string()
    .trim()
    .min(1, { message: 'Please select a garment type' }),
  garment_condition: z
    .string()
    .trim()
    .min(1, { message: 'Please select the current garment condition' }),
  service_type: z
    .string()
    .trim()
    .min(1, { message: 'Please select the requested service' }),
  budget_range: z
    .string()
    .trim()
    .min(1, { message: 'Please select an indicative budget range' }),
  preferred_timeframe: z
    .string()
    .trim()
    .min(1, { message: 'Please select your preferred turnaround timeframe' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Please describe your garment and desired transformation (min 10 characters)' })
    .max(1200, { message: 'Description cannot exceed 1200 characters' }),
  image_url: z
    .string()
    .trim()
    .url({ message: 'Please enter a valid image URL' })
    .optional()
    .or(z.literal(''))
    .nullable(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to our privacy terms to submit an enquiry' }),
  }),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
