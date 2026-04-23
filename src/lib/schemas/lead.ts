import { z } from 'zod';

export const BUDGETS = ['b1', 'b2', 'b3', 'b4', 'b5'] as const;
export const BRANDS_KEYS = [
  'jinzo',
  'shakencake',
  'ktown',
  'haret',
  'stravo',
  'tokyotreats',
  'any'
] as const;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(180),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(40)
    .regex(/^[+0-9()\-\s]+$/, 'Invalid phone'),
  city: z.string().trim().min(2).max(120),
  budget: z.enum(BUDGETS),
  brand: z.enum(BRANDS_KEYS),
  message: z.string().trim().max(2000).optional().default(''),
  locale: z.enum(['ar', 'en']).default('ar')
});

export type LeadInput = z.infer<typeof leadSchema>;
