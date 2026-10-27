'use client';

import React from 'react';
import { featuredStoriesData } from '@/lib/data/stories';
import { Sparkles, ArrowRight, BookOpen, Quote, ShieldCheck } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface FeaturedStoriesProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function FeaturedStories({ onOpenEnquiry }: FeaturedStoriesProps) {
  return (
    <section id="stories" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Editorial Atelier Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Featured Garment Case Studies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            A deeper look at the artistic challenges, historical context, and bespoke craft decisions behind memorable client transformations.
          </p>
        </div>

        {/* Featured Stories List with varied layout */}
        <div className="space-y-16">
          {featuredStoriesData.map((story, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-3xl bg-[#F8F5EF] border border-[#173F35]/10 shadow-sm ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-[#173F35]/10 group">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                      <span className="px-2.5 py-1 rounded-full bg-[#173F35]/90 backdrop-blur-md uppercase text-[10px] tracking-wider">
                        Case #{story.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Information */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-xs uppercase tracking-widest text-[#C96F4A] font-semibold">
                    Client Context: {story.clientContext}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] leading-snug">
                    {story.title}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-[#252824]/80 leading-relaxed">
                    <p>
                      <strong className="text-[#173F35]">The Craft Challenge:</strong> {story.challenge}
                    </p>
                    <p>
                      <strong className="text-[#173F35]">The Studio Solution:</strong> {story.solution}
                    </p>
                  </div>

                  {/* Artisan Note Quote */}
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-l-4 border-[#C96F4A] text-xs sm:text-sm text-[#173F35] italic">
                    <Quote className="w-4 h-4 text-[#C96F4A] mb-1 opacity-70" />
                    {story.artisanNote}
                  </div>

                  {/* Environmental Citation Pill */}
                  <div className="text-[11px] text-[#252824]/70 bg-[#173F35]/5 p-3 rounded-xl border border-[#173F35]/10 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#173F35] flex-shrink-0 mt-0.5" />
                    <span>{story.environmentalFact}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenEnquiry({
                          description: `I would like to explore a transformation inspired by Case Study: ${story.title}.`,
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173F35] text-[#F8F5EF] text-xs font-medium hover:bg-[#123129] transition-colors"
                    >
                      <span>Inquire About Similar Work</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C96F4A]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
