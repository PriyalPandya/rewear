'use client';

import React from 'react';
import { servicesData } from '@/lib/data/services';
import { ServiceItem } from '@/types';
import { Sparkles, ArrowRight, Check, Clock } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface ServicesSectionProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function ServicesSection({ onOpenEnquiry }: ServicesSectionProps) {
  const handleServiceEnquiry = (service: ServiceItem) => {
    onOpenEnquiry({
      service_type: service.name,
      description: `I am interested in ${service.name}. I have a garment requiring ${service.tagline.toLowerCase()}`,
    });
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8F5EF] relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#173F35]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/8 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
            <span>Atelier Capabilities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#173F35]">
            Tailored Services For Every Garment
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252824]/80">
            From precision invisible darning to complete couture redesigns, our specialized craftspeople handle each piece with care.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#173F35]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 overflow-hidden bg-[#173F35]/10">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#173F35]/90 backdrop-blur-md text-[#F8F5EF] text-[11px] font-medium tracking-wide uppercase">
                    {service.category}
                  </div>
                  {/* Turnaround Badge */}
                  <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[#173F35] text-[11px] font-medium flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-[#C96F4A]" />
                    <span>{service.estimatedTurnaround}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#173F35] group-hover:text-[#C96F4A] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#C96F4A] font-medium mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#252824]/75 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-1.5 pt-2 border-t border-[#173F35]/10">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#173F35]/70 mb-2">
                      Key Craft Specialties:
                    </p>
                    {service.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#252824]/80">
                        <Check className="w-3.5 h-3.5 text-[#C96F4A] flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Working CTA */}
              <div className="p-6 pt-0 border-t border-[#173F35]/5 mt-4">
                <div className="flex items-center justify-between pt-4 mb-4">
                  <div>
                    <span className="text-[11px] text-[#252824]/60 block">Indicative Cost</span>
                    <span className="font-serif text-lg font-bold text-[#173F35]">
                      {service.priceRange}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#252824]/60">
                    From ${service.startingPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleServiceEnquiry(service)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#173F35] text-[#F8F5EF] text-xs font-medium hover:bg-[#123129] active:scale-98 transition-colors shadow-sm"
                >
                  <span>Enquire For This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C96F4A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
