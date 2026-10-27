'use client';

import React, { useState } from 'react';
import { faqsData } from '@/lib/data/faqs';
import { FAQItem } from '@/types';
import { Sparkles, ChevronDown, HelpCircle, Search } from 'lucide-react';

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { label: 'All FAQs', value: 'all' },
    { label: 'Services & Scope', value: 'services' },
    { label: 'Pricing & Estimates', value: 'pricing' },
    { label: 'Process & Turnaround', value: 'process' },
    { label: 'Sustainability', value: 'sustainability' },
  ];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faqs" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#173F35]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            Everything you need to know about garment condition, indicative costs, craft turnaround, and enquiry steps.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="mb-10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#252824]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. turnaround, pricing, cashmere, shipping)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8F5EF] border border-[#173F35]/15 text-xs sm:text-sm text-[#252824] placeholder-[#252824]/50 focus:outline-none focus:ring-2 focus:ring-[#173F35] focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-[#173F35] text-[#F8F5EF]'
                    : 'bg-[#F8F5EF] text-[#252824]/70 hover:bg-[#173F35]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#F8F5EF] border border-[#173F35]/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35]"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#173F35] pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#173F35]/5 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#173F35] text-[#F8F5EF]' : 'text-[#173F35]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-[#252824]/80 leading-relaxed border-t border-[#173F35]/5 animate-in fade-in duration-150">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-[#F8F5EF] rounded-2xl border border-[#173F35]/10">
              <p className="text-sm text-[#252824]/60">
                No questions found matching &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
