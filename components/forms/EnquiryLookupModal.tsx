'use client';

import React, { useState } from 'react';
import { X, Search, Loader2, CheckCircle2, Clock, Calendar, Tag } from 'lucide-react';

interface EnquiryLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryLookupModal({ isOpen, onClose }: EnquiryLookupModalProps) {
  const [referenceInput, setReferenceInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceInput.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch(`/api/enquiries?reference=${encodeURIComponent(referenceInput.trim().toUpperCase())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'No enquiry found with this reference code.');
      } else {
        setResult(data.enquiry);
      }
    } catch {
      setErrorMsg('Failed to look up enquiry. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'quote_sent':
        return { label: 'Quote Prepared', color: 'bg-[#C96F4A] text-white' };
      case 'in_review':
        return { label: 'In Artisan Review', color: 'bg-[#173F35] text-white' };
      case 'in_progress':
        return { label: 'Crafting in Atelier', color: 'bg-emerald-700 text-white' };
      case 'completed':
        return { label: 'Completed & Dispatched', color: 'bg-green-700 text-white' };
      default:
        return { label: 'Pending Assessment', color: 'bg-[#B9C9B1] text-[#173F35]' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F8F5EF] text-[#252824] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#173F35]/15">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#173F35] hover:bg-[#173F35]/10 transition-colors"
          aria-label="Close lookup"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#C96F4A] font-semibold">
            Real-Time Enquiry Tracker
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#173F35] mt-1 mb-2">
            Check Your Enquiry Status
          </h3>
          <p className="text-xs text-[#252824]/75 mb-6">
            Enter the reference code you received upon submission (or try demo codes: <code className="bg-[#173F35]/10 px-1 py-0.5 rounded text-[#173F35] font-semibold">RW-2026-DEMO1</code> or <code className="bg-[#173F35]/10 px-1 py-0.5 rounded text-[#173F35] font-semibold">RW-2026-DEMO2</code>).
          </p>

          <form onSubmit={handleLookup} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={referenceInput}
                onChange={(e) => setReferenceInput(e.target.value)}
                placeholder="e.g. RW-2026-DEMO1"
                required
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#173F35]/20 font-mono text-sm tracking-wider uppercase text-[#173F35] placeholder-[#252824]/40 focus:outline-none focus:ring-2 focus:ring-[#173F35]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !referenceInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#173F35] hover:bg-[#123129] text-[#F8F5EF] text-xs font-semibold shadow disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C96F4A]" />
                  <span>Looking up status...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#C96F4A]" />
                  <span>Search Database</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {result && (
            <div className="mt-6 p-5 rounded-2xl bg-white border border-[#173F35]/15 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#173F35]/10">
                <span className="font-mono text-xs font-bold text-[#173F35]">
                  {result.reference_code}
                </span>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(result.status).color}`}>
                  {getStatusBadge(result.status).label}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#252824]/60">Customer:</span>
                  <span className="font-semibold text-[#173F35]">{result.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252824]/60">Garment:</span>
                  <span className="font-semibold text-[#173F35]">{result.garment_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#252824]/60">Service:</span>
                  <span className="font-semibold text-[#173F35]">{result.service_type}</span>
                </div>
                {result.budget_range && (
                  <div className="flex justify-between">
                    <span className="text-[#252824]/60">Budget Guide:</span>
                    <span className="font-semibold text-[#173F35]">{result.budget_range}</span>
                  </div>
                )}
                {result.created_at && (
                  <div className="flex justify-between">
                    <span className="text-[#252824]/60">Received:</span>
                    <span className="text-[#252824]/80">
                      {new Date(result.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
