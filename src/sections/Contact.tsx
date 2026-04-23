'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import { leadSchema, type LeadInput, BUDGETS, BRANDS_KEYS } from '@/lib/schemas/lead';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const t = useTranslations('contact');
  const bt = useTranslations('brands.items');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { locale: locale as 'ar' | 'en', brand: 'any' as LeadInput['brand'] }
  });

  const onSubmit = async (data: LeadInput) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale })
      });
      if (!res.ok) throw new Error('bad_response');
      setStatus('success');
      reset({ locale: locale as 'ar' | 'en', brand: 'any' as LeadInput['brand'] });
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100';
  const labelBase = 'mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-500';

  return (
    <section id="contact" className="section bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left info */}
          <div>
            <div className="eyebrow mb-4 sm:mb-5">{t('eyebrow')}</div>
            <h2 className="h-display text-3xl sm:text-4xl md:text-5xl">{t('title')}</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-500 sm:mt-5 sm:text-base">
              {t('subtitle')}
            </p>

            <div className="mt-8 space-y-4 sm:mt-10">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@cityhub.eg" className="hover:text-brand-500 transition">
                  info@cityhub.eg
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+201000000000" className="hover:text-brand-500 transition" dir="ltr">
                  +20 100 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Cairo · Middle East · Africa</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-5 shadow-card sm:p-8 md:p-10"
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelBase}>{t('form.fullName')}</label>
                <input
                  {...register('fullName')}
                  placeholder={t('form.fullNamePlaceholder')}
                  className={inputBase}
                />
                {errors.fullName && <FieldError msg={t('form.errors.required')} />}
              </div>

              <div>
                <label className={labelBase}>{t('form.email')}</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder={t('form.emailPlaceholder')}
                  className={inputBase}
                  dir="ltr"
                />
                {errors.email && <FieldError msg={t('form.errors.email')} />}
              </div>

              <div>
                <label className={labelBase}>{t('form.phone')}</label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder={t('form.phonePlaceholder')}
                  className={inputBase}
                  dir="ltr"
                />
                {errors.phone && <FieldError msg={t('form.errors.phone')} />}
              </div>

              <div>
                <label className={labelBase}>{t('form.city')}</label>
                <input
                  {...register('city')}
                  placeholder={t('form.cityPlaceholder')}
                  className={inputBase}
                />
                {errors.city && <FieldError msg={t('form.errors.required')} />}
              </div>

              <div>
                <label className={labelBase}>{t('form.budget')}</label>
                <select {...register('budget')} className={inputBase} defaultValue="">
                  <option value="" disabled>
                    {t('form.budgetPlaceholder')}
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {t(`form.budgets.${b}`)}
                    </option>
                  ))}
                </select>
                {errors.budget && <FieldError msg={t('form.errors.required')} />}
              </div>

              <div className="md:col-span-2">
                <label className={labelBase}>{t('form.brand')}</label>
                <select {...register('brand')} className={inputBase}>
                  <option value="any">—</option>
                  {BRANDS_KEYS.filter((k) => k !== 'any').map((k) => (
                    <option key={k} value={k}>
                      {bt(`${k}.name`)} · {bt(`${k}.cuisine`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelBase}>{t('form.message')}</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder={t('form.messagePlaceholder')}
                  className={inputBase + ' resize-none'}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary disabled:opacity-60"
              >
                {status === 'submitting' ? t('form.submitting') : t('form.submit')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>

              {status === 'success' && (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {t('form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  {t('form.error')}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );
}
