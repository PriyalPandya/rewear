'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Scissors, Award } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/transformations/BeforeAfterSlider';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface HeroSectionProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function HeroSection({ onOpenEnquiry }: HeroSectionProps) {
  const sampleBefore = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
  const sampleAfter = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#F8F5EF]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-10 right-0 -mr-40 w-96 h-96 rounded-full bg-[#B9C9B1]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 w-96 h-96 rounded-full bg-[#C96F4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35]/10 border border-[#173F35]/15 text-[#173F35] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
              <span>Bespoke Clothing Upcycling & Repair Atelier</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#173F35] leading-[1.12]">
              Your Old Clothes.{' '}
              <span className="italic font-normal text-[#C96F4A] block sm:inline">
                Their Next Chapter.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#252824]/80 max-w-2xl font-normal leading-relaxed">
              Repair what you love. Reimagine what you don’t. Turn forgotten garments into pieces worth wearing again through our master artisan tailoring and creative redesign studio.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#173F35] text-[#F8F5EF] font-medium text-base shadow-lg hover:bg-[#123129] hover:shadow-xl active:scale-98 transition-all duration-200 group"
              >
                <span>Transform My Clothes</span>
                <ArrowRight className="w-4 h-4 text-[#C96F4A] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#transformations"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#173F35]/25 text-[#173F35] font-medium text-base hover:bg-[#173F35]/5 transition-colors"
              >
                <span>Explore Transformations</span>
              </a>
            </div>

            {/* Trust & Craft Highlights */}
            <div className="pt-6 border-t border-[#173F35]/15 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="font-serif text-2xl font-bold text-[#173F35]">1.4k+</p>
                <p className="text-xs text-[#252824]/70 mt-0.5">Garments Revitalized</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#173F35]">0%</p>
                <p className="text-xs text-[#252824]/70 mt-0.5">Virgin Fabric Used</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#C96F4A]">100%</p>
                <p className="text-xs text-[#252824]/70 mt-0.5">Artisanal Precision</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Before/After Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Background card accent */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#173F35]/10 via-[#B9C9B1]/30 to-[#C96F4A]/20 transform rotate-1 blur-sm" />

            <div className="relative rounded-3xl bg-[#FFFFFF] p-4 sm:p-5 shadow-2xl border border-[#173F35]/10">
              {/* Header inside showcase card */}
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#173F35]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C96F4A]" />
                  <span className="font-serif text-sm font-semibold text-[#173F35]">Featured Transformation</span>
                </div>
                <span className="text-[11px] font-medium text-[#173F35]/70 px-2 py-0.5 rounded-full bg-[#173F35]/5">
                  Upcycling • 5 Days
                </span>
              </div>

              {/* Interactive Before & After Slider */}
              <BeforeAfterSlider
                beforeImage={sampleBefore}
                afterImage={sampleAfter}
                beforeLabel="Worn 90s Jeans"
                afterLabel="Denim Shopper Tote"
                aspectRatio="aspect-[4/3]"
              />

              {/* Transformation card caption */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#252824]/80">
                <div>
                  <p className="font-semibold text-[#173F35] text-sm">Worn Levi’s to Heavy Tote</p>
                  <p className="text-[11px] text-[#252824]/60">Reinforced handles & deadstock lining</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenEnquiry({
                      garment_type: 'Denim & Jeans',
                      service_type: 'Upcycled Bags & Accessories',
                      description: 'I would like to transform an old pair of denim jeans into a reusable tote bag.',
                    })
                  }
                  className="px-3 py-1.5 rounded-full bg-[#173F35] text-[#F8F5EF] text-xs font-medium hover:bg-[#123129] transition-colors"
                >
                  Order Similar
                </button>
              </div>

              {/* Floating artisan guarantee tag */}
              <div className="mt-3 py-2 px-3 rounded-xl bg-[#F8F5EF] border border-[#173F35]/10 flex items-center gap-2.5 text-[11px] text-[#173F35]">
                <ShieldCheck className="w-4 h-4 text-[#173F35] flex-shrink-0" />
                <span>Individually hand-tailored by master craftsmen. Zero mass production.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
