'use client';

import React from 'react';
import { Sparkles, RefreshCcw, Scissors, Repeat, Layers, CheckCircle2, BookOpen } from 'lucide-react';

export function SustainabilitySection() {
  const definitions = [
    {
      term: 'Repair & Mending',
      tagline: 'Restoring structural function to original state.',
      icon: RefreshCcw,
      description: 'Fixing physical faults—such as repairing blown crotches on jeans, replacing broken zipper sliders, or darning moth-eaten knitwear. Extends garment wearability without changing its fundamental form.',
      example: 'Example: Seamless Swiss darning of a cashmere cardigan.',
    },
    {
      term: 'Reuse & Alteration',
      tagline: 'Refitting garments to keep them circulating.',
      icon: Repeat,
      description: 'Adjusting hemlines, waistlines, or sleeve widths so ill-fitting clothes fit your body comfortably. Keeps high-quality garments in active daily rotation rather than stagnant in storage.',
      example: 'Example: Hemming and tapering thrifted vintage wool trousers.',
    },
    {
      term: 'Redesign & Resculpt',
      tagline: 'Morphing outdated styles into contemporary silhouettes.',
      icon: Scissors,
      description: 'Taking an existing garment and substantially altering its pattern design—such as cropping an oversized men’s dress shirt into a feminine wrap blouse or removing shoulder pads and recutting collars.',
      example: 'Example: Converting an unworn maxi gown into a modern 2-piece set.',
    },
    {
      term: 'Upcycling & Transformation',
      tagline: 'Repurposing end-of-life textiles into higher-value items.',
      icon: Layers,
      description: 'When a garment can no longer be worn as clothing, its durable fabric panels are disassembled and crafted into entirely new utility goods such as heavy tote bags, bucket hats, or tech cases.',
      example: 'Example: Deconstructing shredded denim jeans into a reinforced shopper tote.',
    },
  ];

  return (
    <section id="sustainability" className="py-20 md:py-28 bg-[#173F35] text-[#F8F5EF] relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#B9C9B1]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#C96F4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F5EF]/10 text-[#B9C9B1] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Circularity Principles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EF]">
            The Circular Garment Lifecycle
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F8F5EF]/80">
            Understanding the distinction between repairing, reusing, redesigning, and upcycling empowers conscious wardrobe decisions.
          </p>
        </div>

        {/* 4 Definitions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {definitions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8F5EF]/5 border border-[#F8F5EF]/15 rounded-3xl p-6 hover:bg-[#F8F5EF]/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#C96F4A] text-white flex items-center justify-center mb-4 shadow">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F8F5EF] mb-1">
                    {item.term}
                  </h3>
                  <p className="text-xs text-[#B9C9B1] font-medium mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#F8F5EF]/75 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F8F5EF]/10 text-[11px] text-[#F8F5EF]/60 italic">
                  {item.example}
                </div>
              </div>
            );
          })}
        </div>

        {/* Credible Textile & Ecological Research Banner */}
        <div className="bg-[#F8F5EF] text-[#173F35] rounded-3xl p-8 sm:p-10 border border-[#B9C9B1]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#C96F4A]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documented Environmental Impact</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35]">
                Why Garment Longevity Outweighs Fast Recycling
              </h3>
              <p className="text-xs sm:text-sm text-[#252824]/80 leading-relaxed">
                According to the <strong>Ellen MacArthur Foundation Circular Fibres Initiative</strong>, extending the active life of clothing by just <strong>9 months</strong> reduces its carbon, water, and waste footprints by an estimated <strong>20 to 30 percent</strong>.
              </p>
              <p className="text-xs sm:text-sm text-[#252824]/80 leading-relaxed">
                Textile recycling is energy intensive, and less than 1% of clothing material is currently turned into new clothes. By contrast, direct repair and creative upcycling preserve 100% of the embedded energy already invested in fabric production.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#173F35] text-[#F8F5EF] rounded-2xl p-6 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#F8F5EF]">Our Studio Pledge</h4>
              <ul className="text-xs space-y-2 text-[#F8F5EF]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B9C9B1] flex-shrink-0 mt-0.5" />
                  <span>100% zero-waste cutting floor; all remnants repurposed or composted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B9C9B1] flex-shrink-0 mt-0.5" />
                  <span>Natural deadstock linings and organic GOTS-certified threads only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B9C9B1] flex-shrink-0 mt-0.5" />
                  <span>Plastic-free, unbleached kraft paper packaging for garment returns.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
