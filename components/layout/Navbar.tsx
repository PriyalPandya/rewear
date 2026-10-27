'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Menu, X, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { EnquiryFormData } from '@/lib/validations/enquiry';

interface NavbarProps {
  onOpenEnquiry: (prefill?: Partial<EnquiryFormData>) => void;
  onOpenLookup?: () => void;
}

export function Navbar({ onOpenEnquiry, onOpenLookup }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['services', 'transformations', 'finder', 'how-it-works', 'sustainability', 'stories', 'faqs'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Transformations', href: '#transformations', id: 'transformations' },
    { label: 'Garment Finder', href: '#finder', id: 'finder' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Sustainability', href: '#sustainability', id: 'sustainability' },
    { label: 'FAQs', href: '#faqs', id: 'faqs' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5EF]/90 backdrop-blur-md shadow-sm border-b border-[#173F35]/10 py-3.5'
            : 'bg-[#F8F5EF] border-b border-[#173F35]/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F35] rounded-lg"
              aria-label="ReWear homepage"
            >
              <BrandLogo showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#173F35] font-semibold bg-[#173F35]/8'
                        : 'text-[#252824]/80 hover:text-[#173F35] hover:bg-[#173F35]/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C96F4A] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              {onOpenLookup && (
                <button
                  type="button"
                  onClick={onOpenLookup}
                  className="text-xs text-[#173F35]/80 hover:text-[#173F35] font-medium px-2.5 py-1.5 rounded-md hover:bg-[#173F35]/5 transition-colors"
                >
                  Check Enquiry Status
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173F35] text-[#F8F5EF] text-sm font-medium shadow-md hover:bg-[#123129] active:scale-98 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#173F35] focus:ring-offset-2 focus:ring-offset-[#F8F5EF]"
              >
                <Sparkles className="w-4 h-4 text-[#C96F4A]" />
                <span>Transform My Clothes</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden gap-2">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="px-3 py-1.5 rounded-full bg-[#173F35] text-[#F8F5EF] text-xs font-medium"
              >
                Transform
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#173F35] hover:bg-[#173F35]/10 focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#F8F5EF] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#173F35]/10">
                <BrandLogo showTagline={false} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#173F35] hover:bg-[#173F35]/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium text-[#252824] hover:bg-[#173F35]/8 hover:text-[#173F35] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#B9C9B1]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#173F35]/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#173F35] text-[#F8F5EF] font-medium shadow hover:bg-[#123129] transition-colors text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#C96F4A]" />
                <span>Transform My Clothes</span>
              </button>

              {onOpenLookup && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLookup();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#173F35]/20 text-[#173F35] font-medium text-xs hover:bg-[#173F35]/5"
                >
                  Track Existing Enquiry
                </button>
              )}

              <p className="text-[11px] text-center text-[#252824]/60 pt-2">
                ReWear Circular Studio • Mon–Sat, 9:30am–7:30pm IST • +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
