'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ArrowUpRight, Heart, Sparkles, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface FooterProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
}

export function Footer({ onOpenEnquiry }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = 2026;

  return (
    <>
      <footer className="bg-[#173F35] text-[#F8F5EF] relative overflow-hidden pt-16 pb-12">
        {/* Subtle decorative thread line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B9C9B1]/30 via-[#C96F4A] to-[#B9C9B1]/30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Closing Headline Banner */}
          <div className="pb-16 mb-12 border-b border-[#F8F5EF]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F5EF]/10 text-[#B9C9B1] text-xs font-medium tracking-wide uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C96F4A]" />
                Join the Circular Fashion Movement
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F5EF] leading-tight">
                Don’t replace it. <span className="italic font-normal text-[#B9C9B1]">Reimagine</span> it.
              </h2>
              <p className="mt-4 text-base text-[#F8F5EF]/80 max-w-xl">
                Every repair keeps high-character fabrics out of landfills and celebrates personal craftsmanship. Let our studio craft your garment’s next chapter.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C96F4A] hover:bg-[#b55e3a] text-[#F8F5EF] font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl active:scale-98"
              >
                <span>Start Your Transformation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#F8F5EF]/20 hover:bg-[#F8F5EF]/10 text-[#F8F5EF] font-medium text-sm transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Main Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F8F5EF]/10 text-sm">
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo variant="dark" showTagline={true} />
              <p className="text-[#F8F5EF]/75 text-sm leading-relaxed max-w-sm pt-2">
                ReWear is an independent clothing upcycling and tailoring atelier dedicated to giving forgotten, worn, or ill-fitting garments a beautiful second life through bespoke craft.
              </p>
              <div className="pt-2 text-xs text-[#B9C9B1] space-y-1">
                <p>Studio Hours: Mon–Sat, 9:30 AM – 7:30 PM IST</p>
                <p>Atelier: 12 Creative Textile Hub, Indiranagar, Bengaluru, India</p>
                <p>Contact: +91 98765 43210</p>
                <p>Support: studio@rewear-craft.com</p>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="font-serif text-base font-semibold text-[#F8F5EF] mb-4">Artisan Services</h3>
              <ul className="space-y-2.5 text-[#F8F5EF]/75">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Clothing Repair & Invisible Mending' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Clothing Repair & Mending
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Fit & Size Alterations' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Fit & Size Alterations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Creative Garment Redesign' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Creative Garment Redesign
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Denim Restoration & Re-craft' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Denim Restoration & Re-craft
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Artisan Embroidery & Patchwork' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Embroidery & Patchwork
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry({ service_type: 'Upcycled Bags & Accessories' })}
                    className="hover:text-[#F8F5EF] transition-colors text-left"
                  >
                    Upcycled Accessories
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Navigation */}
            <div>
              <h3 className="font-serif text-base font-semibold text-[#F8F5EF] mb-4">Explore</h3>
              <ul className="space-y-2.5 text-[#F8F5EF]/75">
                <li><a href="#hero" className="hover:text-[#F8F5EF] transition-colors">Home</a></li>
                <li><a href="#transformations" className="hover:text-[#F8F5EF] transition-colors">Before & After Gallery</a></li>
                <li><a href="#finder" className="hover:text-[#F8F5EF] transition-colors">Garment Life Finder</a></li>
                <li><a href="#how-it-works" className="hover:text-[#F8F5EF] transition-colors">The 4-Step Process</a></li>
                <li><a href="#sustainability" className="hover:text-[#F8F5EF] transition-colors">Circular Manifesto</a></li>
                <li><a href="#stories" className="hover:text-[#F8F5EF] transition-colors">Customer Stories</a></li>
                <li><a href="#faqs" className="hover:text-[#F8F5EF] transition-colors">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="font-serif text-base font-semibold text-[#F8F5EF] mb-2">The Stitch Letter</h3>
              <p className="text-xs text-[#F8F5EF]/70 mb-4">
                Monthly mending tutorials, textile history, and first access to limited redesign slots.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-[#F8F5EF]/10 border border-[#B9C9B1]/30 text-xs text-[#B9C9B1] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B9C9B1] flex-shrink-0" />
                  <span>Welcome to the circle! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EF]/10 border border-[#F8F5EF]/20 text-[#F8F5EF] placeholder-[#F8F5EF]/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#C96F4A] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F8F5EF] text-[#173F35] font-medium text-xs hover:bg-[#F8F5EF]/90 transition-colors"
                  >
                    Subscribe
                  </button>
                  <p className="text-[10px] text-[#F8F5EF]/50 pt-1">
                    No spam ever. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F5EF]/60 gap-4">
            <div className="flex items-center gap-1.5">
              <span>© {currentYear} ReWear Studio. Handcrafted with care.</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-[#F8F5EF] transition-colors underline-offset-4 hover:underline"
              >
                Privacy & Data Policy
              </button>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-[#F8F5EF] transition-colors underline-offset-4 hover:underline"
              >
                Terms of Service
              </button>
              <span className="text-[#B9C9B1] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero-Waste Studio
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#F8F5EF] text-[#252824] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-[#173F35] mb-3">
              ReWear Privacy & Handling Policy
            </h3>
            <div className="text-xs text-[#252824]/80 space-y-3 leading-relaxed">
              <p>
                <strong>Customer Enquiry Handling:</strong> Information submitted through our garment enquiry form (name, email, phone, garment specifications, and photo links) is used exclusively by our artisan workshop to evaluate project viability and prepare indicative quotes.
              </p>
              <p>
                <strong>Data Storage:</strong> Enquiries are securely persisted in Supabase PostgreSQL cloud storage with encrypted in-transit transit and restricted row-level security. We do not sell or lease customer contact information to third parties.
              </p>
              <p>
                <strong>Photographs & Garment Media:</strong> Any photos shared of your garments remain your property. We only showcase completed transformation photos in our portfolio after obtaining explicit customer permission upon project completion.
              </p>
              <p>
                <strong>Illustrative Demonstrations:</strong> Certain sample testimonials, transformation listings, and indicative price figures on this platform serve illustrative demonstration purposes for the prototype.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#173F35]/15 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2 rounded-full bg-[#173F35] text-[#F8F5EF] text-xs font-medium hover:bg-[#123129]"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
