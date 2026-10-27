'use client';

import React, { useState } from 'react';
import { transformationGalleryData } from '@/lib/data/transformations';
import { TransformationItem, ServiceCategory } from '@/types';
import { BeforeAfterSlider } from '@/components/transformations/BeforeAfterSlider';
import { Clock, DollarSign, Sparkles, ArrowRight, Eye, Info, X } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface TransformationGalleryProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function TransformationGallery({ onOpenEnquiry }: TransformationGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<TransformationItem | null>(null);

  const categories: { label: string; value: ServiceCategory }[] = [
    { label: 'All Transformations', value: 'all' },
    { label: 'Repair & Mending', value: 'repair' },
    { label: 'Fit & Alterations', value: 'alteration' },
    { label: 'Creative Redesign', value: 'redesign' },
    { label: 'Upcycling & Bags', value: 'upcycling' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? transformationGalleryData
    : transformationGalleryData.filter((item) => item.category === selectedCategory);

  const handleSelectTransformation = (item: TransformationItem) => {
    // Map transformation category to form service type
    let mappedService = 'Creative Garment Redesign';
    if (item.category === 'repair') mappedService = 'Clothing Repair & Invisible Mending';
    if (item.category === 'alteration') mappedService = 'Fit & Size Alterations';
    if (item.category === 'upcycling') mappedService = 'Upcycled Bags & Accessories';

    onOpenEnquiry({
      service_type: mappedService,
      description: `I am interested in a transformation similar to "${item.title}". Original garment: ${item.originalGarment}. Desired result: ${item.transformedResult}.`,
      budget_range: `₹699 - ₹1,499 (Standard Alteration / Mending)`,
    });
  };

  return (
    <section id="transformations" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Before & After Archive</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Artisan Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/75">
            Slide horizontally on any transformation to examine original garments alongside their bespoke second lives.
          </p>
          <p className="mt-1 text-xs text-[#252824]/50 italic">
            *Indicative turnaround times and pricing reflect typical atelier craft complexity.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#173F35] text-[#F8F5EF] shadow-md ring-2 ring-[#173F35]/20'
                    : 'bg-[#F8F5EF] text-[#252824]/80 hover:bg-[#173F35]/10 hover:text-[#173F35]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Transformation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#F8F5EF] rounded-3xl overflow-hidden border border-[#173F35]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Before / After Comparison Slider Container */}
                <div className="p-3">
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeLabel="Before"
                    afterLabel="After"
                    aspectRatio="aspect-[4/3]"
                  />
                </div>

                {/* Card Information */}
                <div className="p-5 sm:p-6">
                  {/* Category Pill and turnaround */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35]">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#252824]/60">
                      <Clock className="w-3.5 h-3.5 text-[#C96F4A]" />
                      {item.estimatedTurnaround}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#173F35] group-hover:text-[#C96F4A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C96F4A] font-medium mt-0.5">
                    {item.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#252824]/80 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Craft Techniques Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.craftTechniques.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFFFFF] border border-[#173F35]/10 text-[#252824]/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Action & Indicative Price */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#173F35]/5 mt-4">
                <div className="flex items-center justify-between pt-4 mb-3">
                  <div>
                    <span className="text-[11px] text-[#252824]/60 block">Indicative Cost</span>
                    <span className="font-serif text-xl font-bold text-[#173F35]">
                      ₹{item.indicativePrice.toLocaleString('en-IN')} <span className="text-xs font-normal text-[#252824]/60">INR</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="p-2 rounded-full border border-[#173F35]/20 text-[#173F35] hover:bg-[#173F35] hover:text-[#F8F5EF] transition-colors"
                    title="View Transformation Story Details"
                    aria-label={`View details for ${item.title}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectTransformation(item)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#173F35] hover:bg-[#123129] text-[#F8F5EF] text-xs font-medium transition-colors active:scale-98"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C96F4A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail View for a selected transformation */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#F8F5EF] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#173F35]/15">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#173F35] hover:bg-[#173F35]/10"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35]">
              {activeModalItem.category} Case Study
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] mt-2">
              {activeModalItem.title}
            </h3>
            <p className="text-sm text-[#C96F4A] font-medium">
              {activeModalItem.subtitle}
            </p>

            {/* Slider inside modal */}
            <div className="my-5">
              <BeforeAfterSlider
                beforeImage={activeModalItem.beforeImage}
                afterImage={activeModalItem.afterImage}
                beforeLabel="Original Garment"
                afterLabel="Revitalized Result"
                aspectRatio="aspect-[16/10]"
              />
            </div>

            <div className="space-y-3 text-sm text-[#252824]/85 leading-relaxed">
              <p>
                <strong>Original State:</strong> {activeModalItem.originalGarment}
              </p>
              <p>
                <strong>Final Result:</strong> {activeModalItem.transformedResult}
              </p>
              <p>
                <strong>Studio Notes:</strong> {activeModalItem.description}
              </p>
              <div className="p-3.5 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/10 text-xs text-[#173F35] flex items-start gap-2.5">
                <Info className="w-4 h-4 flex-shrink-0 text-[#C96F4A] mt-0.5" />
                <span>
                  <strong>Circularity Impact:</strong> {activeModalItem.impactNote}
                </span>
              </div>
            </div>

            {/* Price & Turnaround summary */}
            <div className="mt-6 pt-4 border-t border-[#173F35]/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#252824]/60 block">Indicative Atelier Cost</span>
                <span className="font-serif text-2xl font-bold text-[#173F35]">
                  ₹{activeModalItem.indicativePrice.toLocaleString('en-IN')} INR
                </span>
                <span className="text-xs text-[#252824]/60 block mt-0.5">
                  Est. {activeModalItem.estimatedTurnaround}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const item = activeModalItem;
                  setActiveModalItem(null);
                  handleSelectTransformation(item);
                }}
                className="px-6 py-3 rounded-full bg-[#173F35] text-[#F8F5EF] text-sm font-medium hover:bg-[#123129] transition-colors"
              >
                Prefill Enquiry with This Piece
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
