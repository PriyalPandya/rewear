'use client';

import React from 'react';
import { Sparkles, Check, X, Shield, Clock, Heart, Award, Gem, Sliders } from 'lucide-react';

export function WhyChooseUs() {
  const comparisonRows = [
    {
      feature: 'Fit & Silhouette',
      rewear: 'Custom tailored to your exact measurements and preferred aesthetic drape.',
      fastFashion: 'Generic mass-market sizing; often ill-fitting or unflattering proportions.',
    },
    {
      feature: 'Fabric & Material Quality',
      rewear: 'Leverages high-grade vintage natural fibers (100% cotton, wool, silk) built to last.',
      fastFashion: 'Predominantly cheap virgin synthetic blends (polyester, acrylic) prone to pilling.',
    },
    {
      feature: 'Individuality & Uniqueness',
      rewear: 'One-of-one bespoke design with visible artisan needlework and personal character.',
      fastFashion: 'Identical mass-produced copies worn by tens of thousands worldwide.',
    },
    {
      feature: 'Sentimental Preservation',
      rewear: 'Preserves cherished stories, travel memories, and family heirlooms.',
      fastFashion: 'Disposable, detached, and quickly discarded after a few wears.',
    },
    {
      feature: 'Circularity Impact',
      rewear: 'Zero virgin resource extraction; directly diverts textiles from incinerators and landfills.',
      fastFashion: 'High chemical, pesticide, and water usage alongside massive end-of-season waste.',
    },
  ];

  const pillars = [
    {
      icon: Heart,
      title: 'Sentimental Value Preserved',
      desc: 'Clothes carry stories. That vintage chore jacket from a parent or thrifted concert tee shouldn’t be retired just because of a blown seam.',
    },
    {
      icon: Gem,
      title: 'Bespoke Individuality',
      desc: 'Nothing off a commercial rack compares to a garment modified specifically for your body and embellished with hand-stitched craft.',
    },
    {
      icon: Award,
      title: 'Master Craftsmen Quality',
      desc: 'Our studio is staffed by generational tailors and textile preservationists using heritage Union Special machines and traditional techniques.',
    },
    {
      icon: Sliders,
      title: 'Conscious Consumption',
      desc: 'The most sustainable garment is already hanging in your closet. Choosing repair is a deliberate vote against disposable fashion culture.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>The Value of Repair</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Why Revitalize with ReWear?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            Investing in the clothes you already own delivers superior fit, unmatched character, and authentic sustainability.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8F5EF] rounded-3xl p-6 border border-[#173F35]/10 hover:border-[#173F35]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#173F35] text-[#F8F5EF] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#C96F4A]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#173F35] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#252824]/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-[#F8F5EF] rounded-3xl p-6 sm:p-10 border border-[#173F35]/15 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#173F35]">
              ReWear Craft vs. Buying Cheap Replacement
            </h3>
            <p className="text-xs text-[#252824]/70 mt-1">
              Direct comparison of values, longevity, and everyday experience.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#173F35]/15">
                  <th className="py-3 px-4 font-semibold text-[#173F35] w-1/4">Evaluation Point</th>
                  <th className="py-3 px-4 font-semibold text-[#173F35] bg-[#173F35]/8 rounded-t-xl w-3/8">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-[#173F35]">
                      <Check className="w-4 h-4 text-[#C96F4A]" />
                      ReWear Transformation
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold text-[#252824]/70 w-3/8">
                    <span className="flex items-center gap-1.5 text-sm text-[#252824]/70">
                      <X className="w-4 h-4 text-red-500/70" />
                      Discard & Buy Fast Fashion
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#173F35]/10">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 font-medium text-[#173F35]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-[#173F35] bg-[#173F35]/5 font-normal leading-relaxed">
                      {row.rewear}
                    </td>
                    <td className="py-4 px-4 text-[#252824]/70 font-normal leading-relaxed">
                      {row.fastFashion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
