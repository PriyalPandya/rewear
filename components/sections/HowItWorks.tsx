'use client';

import React from 'react';
import { Sparkles, FileText, Palette, Send, PackageCheck, ArrowRight } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface HowItWorksProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function HowItWorks({ onOpenEnquiry }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Describe Your Garment',
      icon: FileText,
      description: 'Tell us about the piece in your closet—its fabric, current condition, and your transformation ideas. Upload or link reference photos.',
      detail: 'Takes less than 2 minutes via our quick interactive form.',
    },
    {
      number: '02',
      title: 'Receive Artisan Assessment',
      icon: Palette,
      description: 'Our lead tailors evaluate the garment structure and reply within 24 hours with custom design options, indicative pricing, and turnaround estimates.',
      detail: 'Zero commitment until you approve the design path.',
    },
    {
      number: '03',
      title: 'Send or Drop Off',
      icon: Send,
      description: 'Upon approving your proposal, drop your garment off at our studio in Brooklyn or mail it securely with our prepaid tracked shipping guide.',
      detail: 'Clear intake instructions provided with your reference code.',
    },
    {
      number: '04',
      title: 'Wear & Cherish Again',
      icon: PackageCheck,
      description: 'Our craftspeople execute bespoke darning, tailoring, or redesign. Receive your beautifully revitalized garment ready for years of wear.',
      detail: 'Includes personalized care instructions and repair warranty.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F8F5EF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>The Atelier Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            How ReWear Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            A simple, transparent 4-step process connecting your wardrobe directly with master craftsmanship.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-7 border border-[#173F35]/10 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Header with Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#C96F4A]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#173F35]/5 text-[#173F35] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#173F35]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#173F35] mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#252824]/75 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#173F35]/10 text-[11px] text-[#C96F4A] font-medium">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#173F35] text-[#F8F5EF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">Have a garment in mind right now?</h4>
            <p className="text-xs sm:text-sm text-[#F8F5EF]/80 mt-1">
              Start with step one by submitting a quick garment enquiry for artisan review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C96F4A] hover:bg-[#b55e3a] text-white text-xs font-semibold shadow transition-colors"
          >
            <span>Submit Your Garment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
