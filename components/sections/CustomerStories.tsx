'use client';

import React from 'react';
import { customerStoriesData } from '@/lib/data/stories';
import { Sparkles, Star, Quote, Info } from 'lucide-react';

export function CustomerStories() {
  return (
    <section className="py-20 md:py-28 bg-[#F8F5EF] border-t border-[#173F35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Community Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Stories From Our Closets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            Real garment dilemmas transformed into everyday wardrobe staples.
          </p>

          {/* Explicit disclosure banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35]/5 border border-[#173F35]/10 text-xs text-[#252824]/70">
            <Info className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Illustrative sample experiences presented for prototype evaluation.</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerStoriesData.map((story) => (
            <div
              key={story.id}
              className="bg-[#FFFFFF] rounded-3xl p-7 border border-[#173F35]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & illustrative badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C96F4A] text-[#C96F4A]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#173F35]/5 text-[#173F35]/70 font-semibold">
                    Sample Project
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif text-base font-semibold text-[#173F35] italic mb-3 leading-snug">
                  “{story.quote}”
                </p>

                {/* Story Body */}
                <p className="text-xs sm:text-sm text-[#252824]/75 leading-relaxed mb-6">
                  {story.story}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#173F35]/10 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#173F35]/10"
                  loading="lazy"
                />
                <div>
                  <p className="font-serif text-sm font-bold text-[#173F35]">
                    {story.author}
                  </p>
                  <p className="text-[11px] text-[#252824]/60">
                    {story.location} • <span className="text-[#C96F4A]">{story.garment}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
