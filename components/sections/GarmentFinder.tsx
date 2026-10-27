'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, Scissors, Compass, ShieldAlert } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface GarmentFinderProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function GarmentFinder({ onOpenEnquiry }: GarmentFinderProps) {
  const [garmentType, setGarmentType] = useState('Denim & Jeans');
  const [condition, setCondition] = useState('Heavy distress / fabric thinning');
  const [desiredOutcome, setDesiredOutcome] = useState('Convert into accessory');
  const [budget, setBudget] = useState('₹699 - ₹1,499 (Standard Alteration / Mending)');

  const garmentOptions = [
    { label: 'Denim & Jeans', icon: '👖' },
    { label: 'Jacket & Outerwear', icon: '🧥' },
    { label: 'Shirt & Blouse', icon: '👔' },
    { label: 'Dress & Gown', icon: '👗' },
    { label: 'Sweater & Knitwear', icon: '🧶' },
    { label: 'Trousers & Pants', icon: '🧵' },
    { label: 'T-Shirt & Tops', icon: '👕' },
  ];

  const conditionOptions = [
    { label: 'Minor wear / small tears or missing buttons', desc: 'Light wear on seams or missing buttons' },
    { label: 'Broken zipper / seams unstitched', desc: 'Hardware failure or separated hemline' },
    { label: 'Poor fit / too oversized or tight', desc: 'High quality textile that sits uncomfortably' },
    { label: 'Outdated silhouette / needs redesign', desc: 'Good condition fabric with dated 80s/90s cut' },
    { label: 'Heavy distress / fabric thinning', desc: 'Crotch blowouts, thinning knees, or shredded elbows' },
    { label: 'Stained / faded but quality fabric', desc: 'Permanent dye stains or sun fade marks' },
  ];

  const outcomeOptions = [
    { label: 'Restore to original wearable state', desc: 'Invisible mending, original hems, seamless repairs' },
    { label: 'Modernize & sculpt silhouette', desc: 'Crop, taper, rebalance shoulders, transform fit' },
    { label: 'Artful visible mending (Sashiko / Boro)', desc: 'Contrast embroidery, vintage patch inlays' },
    { label: 'Convert into accessory / tote bag', desc: 'Repurpose fabric into bags, bucket hats, or pouches' },
  ];

  const budgetOptions = [
    '₹299 - ₹699 (Essential Repair)',
    '₹699 - ₹1,499 (Standard Alteration / Mending)',
    '₹1,499 - ₹2,999 (Creative Redesign / Heavy Denim)',
    '₹2,999+ (Bespoke Transformation & Art Piece)',
  ];

  // Dynamic recommendation logic
  const recommendation = useMemo(() => {
    let service = 'Creative Garment Redesign';
    let turnaround = '4 - 6 business days';
    let cost = '₹999 - ₹2,199';
    let explanation = '';

    if (desiredOutcome.includes('Convert into accessory')) {
      service = 'Upcycled Bags & Accessories';
      cost = '₹699 - ₹1,299';
      turnaround = '3 - 5 business days';
      explanation = `Deconstructing ${garmentType.toLowerCase()} with ${condition.toLowerCase()} preserves the strongest structural panels, converting them into a high-utility tote or accessory.`;
    } else if (desiredOutcome.includes('visible mending')) {
      service = 'Artisan Embroidery & Patchwork';
      cost = '₹799 - ₹1,699';
      turnaround = '5 - 7 business days';
      explanation = `Japanese Sashiko or Boro hand-needlework will embrace the ${condition.toLowerCase()} as a visual tapestry, reinforcing the fiber grid with artistic contrast thread.`;
    } else if (desiredOutcome.includes('Modernize')) {
      service = 'Creative Garment Redesign';
      cost = '₹999 - ₹2,199';
      turnaround = '5 - 7 business days';
      explanation = `Tailoring and restructuring ${garmentType.toLowerCase()} to adjust proportions and remove dated volume while retaining original high-character details.`;
    } else if (condition.includes('Poor fit')) {
      service = 'Fit & Size Alterations';
      cost = '₹399 - ₹899';
      turnaround = '3 - 5 business days';
      explanation = `Precision tapering, hemming, and waist suppression will adapt this piece to your exact personal measurements.`;
    } else {
      service = garmentType.includes('Denim')
        ? 'Denim Restoration & Re-craft'
        : 'Clothing Repair & Invisible Mending';
      cost = '₹499 - ₹1,199';
      turnaround = '3 - 5 business days';
      explanation = `Targeted structural reweaving and reinforcement will stabilize the ${condition.toLowerCase()} to restore longevity.`;
    }

    return {
      service,
      cost,
      turnaround,
      explanation,
    };
  }, [garmentType, condition, desiredOutcome]);

  const handleStartRecommendation = () => {
    onOpenEnquiry({
      garment_type: garmentType,
      garment_condition: condition,
      service_type: recommendation.service,
      budget_range: budget,
      description: `Recommendation from Garment Life Finder: I have a ${garmentType} with "${condition}". I want to "${desiredOutcome}". Recommended studio path: ${recommendation.service}.`,
    });
  };

  return (
    <section id="finder" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Interactive Diagnostic</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Find Your Garment’s Next Life
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            Tell us about the garment in your closet. Our recommendation engine suggests the ideal craft pathway, estimated turnaround, and indicative budget.
          </p>
        </div>

        {/* Finder Layout: Controls on Left, Live Recommendation Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#F8F5EF] rounded-3xl p-6 sm:p-8 border border-[#173F35]/10 shadow-sm space-y-8">
            {/* Step 1: Garment Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-3">
                1. Select Garment Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {garmentOptions.map((opt) => {
                  const isSelected = garmentType === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setGarmentType(opt.label)}
                      className={`p-3 rounded-2xl text-left border text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#173F35] text-[#F8F5EF] border-[#173F35] shadow-sm'
                          : 'bg-[#FFFFFF] text-[#252824] border-[#173F35]/15 hover:border-[#173F35]/40'
                      }`}
                    >
                      <span className="text-base block mb-1">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Garment Condition */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-3">
                2. Current Garment Condition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {conditionOptions.map((opt) => {
                  const isSelected = condition === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setCondition(opt.label)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#173F35] text-[#F8F5EF] border-[#173F35] shadow-sm'
                          : 'bg-[#FFFFFF] text-[#252824] border-[#173F35]/15 hover:border-[#173F35]/40'
                      }`}
                    >
                      <p className="text-xs font-semibold">{opt.label}</p>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#B9C9B1]' : 'text-[#252824]/60'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Desired Outcome */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-3">
                3. Desired Transformation Result
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {outcomeOptions.map((opt) => {
                  const isSelected = desiredOutcome === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setDesiredOutcome(opt.label)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#173F35] text-[#F8F5EF] border-[#173F35] shadow-sm'
                          : 'bg-[#FFFFFF] text-[#252824] border-[#173F35]/15 hover:border-[#173F35]/40'
                      }`}
                    >
                      <p className="text-xs font-semibold">{opt.label}</p>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#B9C9B1]' : 'text-[#252824]/60'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Budget Range */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-3">
                4. Approximate Budget Comfort
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((opt) => {
                  const isSelected = budget === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBudget(opt)}
                      className={`p-2.5 rounded-xl text-center border text-[11px] font-medium transition-all ${
                        isSelected
                          ? 'bg-[#C96F4A] text-[#F8F5EF] border-[#C96F4A]'
                          : 'bg-[#FFFFFF] text-[#252824] border-[#173F35]/15 hover:border-[#173F35]/40'
                      }`}
                    >
                      {opt.split(' ')[0]} {opt.split(' ')[1]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Recommendation Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#173F35] text-[#F8F5EF] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#B9C9B1]/20 relative overflow-hidden">
              {/* Background watermark icon */}
              <Scissors className="absolute -bottom-8 -right-8 w-44 h-44 text-[#F8F5EF]/5 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-[#F8F5EF]/15 mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#B9C9B1] font-semibold">
                    Studio Recommendation
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C96F4A] text-white text-[11px] font-medium">
                    Best Match
                  </span>
                </div>

                <p className="text-xs text-[#B9C9B1]">Recommended Service Path</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF] mt-1 mb-4">
                  {recommendation.service}
                </h3>

                <div className="p-4 rounded-2xl bg-[#F8F5EF]/10 border border-[#F8F5EF]/15 text-xs text-[#F8F5EF]/90 leading-relaxed mb-6">
                  <p className="font-semibold text-[#B9C9B1] mb-1">Why This Works For You:</p>
                  <p>{recommendation.explanation}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-[#F8F5EF]/15 text-xs">
                  <div>
                    <span className="text-[#B9C9B1] block">Indicative Cost</span>
                    <span className="font-serif text-xl font-bold text-[#F8F5EF]">{recommendation.cost}</span>
                  </div>
                  <div>
                    <span className="text-[#B9C9B1] block">Est. Turnaround</span>
                    <span className="font-serif text-xl font-bold text-[#F8F5EF]">{recommendation.turnaround}</span>
                  </div>
                </div>

                {/* Summary of selections */}
                <div className="space-y-1.5 text-xs text-[#F8F5EF]/75 mb-6">
                  <div className="flex items-center justify-between">
                    <span>Garment:</span>
                    <span className="font-medium text-[#F8F5EF]">{garmentType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Condition:</span>
                    <span className="font-medium text-[#F8F5EF] truncate max-w-[200px]">{condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Outcome:</span>
                    <span className="font-medium text-[#F8F5EF] truncate max-w-[200px]">{desiredOutcome}</span>
                  </div>
                </div>

                {/* CTA prefilling enquiry */}
                <button
                  type="button"
                  onClick={handleStartRecommendation}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C96F4A] hover:bg-[#b55e3a] text-white text-sm font-medium shadow-lg hover:shadow-xl active:scale-98 transition-all"
                >
                  <span>Start This Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#F8F5EF]/60 mt-3">
                  Prefills your enquiry with these diagnostic selections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
