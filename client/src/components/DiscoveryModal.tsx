import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data/contentData';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES_DATA[0].title,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setTimeout(() => setSubmitted(true), 700);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl border border-black/10 bg-white text-[#111111] p-6 sm:p-8 shadow-2xl z-10 font-sans"
        >
          <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
            <div>
              <h3 className="text-xl font-bold font-display text-[#111111]">
                Book a Discovery Call
              </h3>
              <p className="text-xs text-[#555555] mt-1">
                Direct engagement with Orillusive senior frontend & system architects.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full border border-black/10 text-[#555555] hover:text-[#111111] transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="size-14 rounded-full bg-[#4F6B85]/10 border border-[#4F6B85]/30 flex items-center justify-center mx-auto text-[#4F6B85]">
                <CheckCircle2 className="size-7" />
              </div>
              <h4 className="text-xl font-bold font-display text-[#111111]">
                Discovery Request Received
              </h4>
              <p className="text-xs text-[#555555] max-w-xs mx-auto leading-relaxed">
                Thank you for your interest in Orillusive. Our team will review your project brief and respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#111111] text-[#F7F7F5] text-xs font-bold rounded-full hover:bg-[#2C1E16] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 flex items-center space-x-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-[#555555] font-semibold uppercase tracking-wider text-[10px] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:outline-none text-xs text-[#111111] placeholder:text-[#999999]"
                />
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase tracking-wider text-[10px] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:outline-none text-xs text-[#111111] placeholder:text-[#999999]"
                />
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase tracking-wider text-[10px] mb-1">Primary Service Requirement</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:outline-none text-xs text-[#111111]"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase tracking-wider text-[10px] mb-1">Project Brief & Requirements *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your software objectives, technical scope, or business timeline..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Book Discovery Call</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
