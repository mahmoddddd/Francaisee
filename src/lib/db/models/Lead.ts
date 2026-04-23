import mongoose, { Schema, model, models, type InferSchemaType } from 'mongoose';

const LeadSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    budget: { type: String, required: true, maxlength: 40 },
    brand: { type: String, required: true, maxlength: 40 },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
    locale: { type: String, enum: ['ar', 'en'], default: 'ar' },
    source: { type: String, default: 'website' },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'rejected'], default: 'new' },
    userAgent: { type: String, maxlength: 500 },
    ip: { type: String, maxlength: 64 }
  },
  { timestamps: true, collection: 'leads' }
);

export type LeadDoc = InferSchemaType<typeof LeadSchema>;

export const Lead =
  (models.Lead as mongoose.Model<LeadDoc>) ||
  model<LeadDoc>('Lead', LeadSchema);
