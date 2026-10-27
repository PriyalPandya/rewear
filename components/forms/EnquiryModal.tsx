'use client';

import React, { useState, useEffect } from 'react';
import {
  enquirySchema,
  EnquiryFormData,
  garmentTypes,
  garmentConditions,
  serviceTypes,
  budgetRanges,
  timeframeOptions,
} from '@/lib/validations/enquiry';
import { X, Sparkles, CheckCircle2, AlertCircle, Copy, Check, ArrowRight, Loader2, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<EnquiryFormData>;
}

export function EnquiryModal({ isOpen, onClose, initialData }: EnquiryModalProps) {
  const [formData, setFormData] = useState<Partial<EnquiryFormData>>({
    customer_name: '',
    email: '',
    phone: '',
    garment_type: garmentTypes[0],
    garment_condition: garmentConditions[0],
    service_type: serviceTypes[0],
    budget_range: budgetRanges[1],
    preferred_timeframe: timeframeOptions[0],
    description: '',
    image_url: '',
    consent: false as unknown as true,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Sync initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      setServerError(null);
      setFieldErrors({});
      setSubmissionSuccess(null);
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        garment_type: initialData?.garment_type || prev.garment_type || garmentTypes[0],
        service_type: initialData?.service_type || prev.service_type || serviceTypes[0],
        budget_range: initialData?.budget_range || prev.budget_range || budgetRanges[1],
        description: initialData?.description || prev.description || '',
      }));
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field: keyof EnquiryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error on change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setServerError(null);
    setFieldErrors({});

    // 1. Client-side Zod validation
    const validation = enquirySchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      setFieldErrors(errors);

      // Scroll modal to first error
      const firstErrorKey = Object.keys(errors)[0];
      const targetElement = document.getElementById(`field-${firstErrorKey}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 2. Submit to backend API endpoint POST /api/enquiries
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setServerError(result.error || 'Failed to submit enquiry. Please check your details and try again.');
        return;
      }

      // Success
      setSubmissionSuccess(result.enquiry);

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#173F35', '#C96F4A', '#B9C9B1', '#F8F5EF'],
        });
      } catch {
        // Confetti is optional progressive enhancement
      }
    } catch (err: any) {
      setServerError('A network error occurred while connecting to the studio API. Your entered information has been preserved.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = (refCode: string) => {
    navigator.clipboard.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F8F5EF] text-[#252824] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-[#173F35]/15">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#173F35] hover:bg-[#173F35]/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submissionSuccess ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#173F35] text-[#F8F5EF] flex items-center justify-center mx-auto shadow-lg ring-8 ring-[#173F35]/10">
              <CheckCircle2 className="w-9 h-9 text-[#C96F4A]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#C96F4A] font-semibold">
                Enquiry Successfully Registered
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#173F35] mt-1">
                Your Clothes Are in Good Hands
              </h3>
              <p className="text-xs sm:text-sm text-[#252824]/75 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{submissionSuccess.customer_name}</strong>. Our lead artisan has received your enquiry and will review your garment details within 24 business hours.
              </p>
            </div>

            {/* Reference Code Box */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#173F35]/15 shadow-sm max-w-md mx-auto space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#252824]/60 block">
                Your Unique Enquiry Reference
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold tracking-wider text-[#173F35]">
                  {submissionSuccess.reference_code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyReference(submissionSuccess.reference_code)}
                  className="p-2 rounded-xl bg-[#173F35]/5 hover:bg-[#173F35]/10 text-[#173F35] transition-colors"
                  title="Copy Reference Code"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-[#252824]/60">
                Save this code to track your transformation status or provide updates.
              </p>
            </div>

            {/* Submission summary breakdown */}
            <div className="p-4 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/10 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#252824]/60">Requested Service:</span>
                <span className="font-semibold text-[#173F35]">{submissionSuccess.service_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252824]/60">Garment Type:</span>
                <span className="font-semibold text-[#173F35]">{submissionSuccess.garment_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#252824]/60">Workflow Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-[#173F35] text-white text-[10px] font-medium uppercase">
                  {submissionSuccess.status || 'Pending Review'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(null);
                  setFormData({
                    customer_name: '',
                    email: '',
                    phone: '',
                    garment_type: garmentTypes[0],
                    garment_condition: garmentConditions[0],
                    service_type: serviceTypes[0],
                    budget_range: budgetRanges[1],
                    preferred_timeframe: timeframeOptions[0],
                    description: '',
                    image_url: '',
                    consent: false as unknown as true,
                  });
                }}
                className="px-5 py-2.5 rounded-full border border-[#173F35]/25 text-[#173F35] text-xs font-semibold hover:bg-[#173F35]/5"
              >
                Submit Another Garment
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#173F35] text-[#F8F5EF] text-xs font-semibold hover:bg-[#123129]"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
                <span>Atelier Intake Consultation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35]">
                Submit a Garment Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#252824]/75 mt-1">
                Share details about your piece. Our studio team will evaluate the fabric and respond with design proposals and exact pricing.
              </p>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Submission Note</p>
                  <p>{serverError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-customer_name">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Your Name <span className="text-[#C96F4A]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customer_name || ''}
                    onChange={(e) => handleChange('customer_name', e.target.value)}
                    placeholder="e.g. Maya Lin"
                    maxLength={80}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#252824] placeholder-[#252824]/40 focus:outline-none focus:ring-2 ${
                      fieldErrors.customer_name
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#173F35]/20 focus:ring-[#173F35]'
                    }`}
                  />
                  {fieldErrors.customer_name && (
                    <p className="text-[11px] text-red-600 mt-1">{fieldErrors.customer_name}</p>
                  )}
                </div>

                <div id="field-email">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Email Address <span className="text-[#C96F4A]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="maya@example.com"
                    maxLength={120}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#252824] placeholder-[#252824]/40 focus:outline-none focus:ring-2 ${
                      fieldErrors.email
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#173F35]/20 focus:ring-[#173F35]'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Preferred Timeframe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-phone">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Contact Number (+91) <span className="text-[#C96F4A]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    maxLength={25}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#252824] placeholder-[#252824]/40 focus:outline-none focus:ring-2 ${
                      fieldErrors.phone
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#173F35]/20 focus:ring-[#173F35]'
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div id="field-preferred_timeframe">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Preferred Timeframe <span className="text-[#C96F4A]">*</span>
                  </label>
                  <select
                    value={formData.preferred_timeframe || timeframeOptions[0]}
                    onChange={(e) => handleChange('preferred_timeframe', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    {timeframeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Garment Type and Service Requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-garment_type">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Garment Type <span className="text-[#C96F4A]">*</span>
                  </label>
                  <select
                    value={formData.garment_type || garmentTypes[0]}
                    onChange={(e) => handleChange('garment_type', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    {garmentTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div id="field-service_type">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Requested Service <span className="text-[#C96F4A]">*</span>
                  </label>
                  <select
                    value={formData.service_type || serviceTypes[0]}
                    onChange={(e) => handleChange('service_type', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    {serviceTypes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Condition and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-garment_condition">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Current Condition <span className="text-[#C96F4A]">*</span>
                  </label>
                  <select
                    value={formData.garment_condition || garmentConditions[0]}
                    onChange={(e) => handleChange('garment_condition', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    {garmentConditions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div id="field-budget_range">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                    Indicative Budget <span className="text-[#C96F4A]">*</span>
                  </label>
                  <select
                    value={formData.budget_range || budgetRanges[1]}
                    onChange={(e) => handleChange('budget_range', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Description & Requested Changes */}
              <div id="field-description">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#173F35]">
                    Garment Description & Transformation Vision <span className="text-[#C96F4A]">*</span>
                  </label>
                  <span className="text-[10px] text-[#252824]/50">
                    {formData.description?.length || 0} / 1200
                  </span>
                </div>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  maxLength={1200}
                  placeholder="Describe the fabric, tears, fit problems, or styling ideas you have in mind..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#252824] placeholder-[#252824]/40 focus:outline-none focus:ring-2 leading-relaxed ${
                    fieldErrors.description
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-[#173F35]/20 focus:ring-[#173F35]'
                  }`}
                />
                {fieldErrors.description && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.description}</p>
                )}
              </div>

              {/* Row 6: Optional Reference Image Link */}
              <div id="field-image_url">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1.5">
                  Optional Image URL / Inspiration Link{' '}
                  <span className="text-[10px] text-[#252824]/50 font-normal">(Pinterest, Unsplash, or Cloud photo)</span>
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-[#252824]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.image_url || ''}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="https://images.unsplash.com/... or https://..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#173F35]/20 text-xs sm:text-sm text-[#252824] placeholder-[#252824]/40 focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                  />
                </div>
                {fieldErrors.image_url && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.image_url}</p>
                )}
              </div>

              {/* Row 7: Consent Checkbox */}
              <div id="field-consent" className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.consent)}
                    onChange={(e) => handleChange('consent', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#173F35] focus:ring-[#173F35]"
                  />
                  <span className="text-xs text-[#252824]/80 leading-relaxed">
                    I consent to ReWear saving and handling my enquiry information and garment details for the purpose of receiving an artisan review and indicative quotation.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="text-[11px] text-red-600 mt-1 ml-7">{fieldErrors.consent}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#173F35]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#252824]/60 order-2 sm:order-1">
                  🔒 Zero spam • End-to-end craft privacy
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#173F35] hover:bg-[#123129] text-[#F8F5EF] text-sm font-semibold shadow-lg hover:shadow-xl active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C96F4A]" />
                      <span>Saving to Studio Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Garment Enquiry</span>
                      <ArrowRight className="w-4 h-4 text-[#C96F4A]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
