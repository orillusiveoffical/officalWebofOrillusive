import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data/contentData';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';
import { useAuth } from '../context/AuthContext';

export const ContactPage: React.FC = () => {
  const { user, token, fetchMyBookings } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES_DATA[0].title,
    message: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        if (token) {
          fetchMyBookings();
        }
      } else {
        setErrorMsg(data.error || 'Failed to submit contact inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Unable to reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] min-h-screen font-sans">
      <SEOHead page={PAGE_SEO.contact} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
        id="breadcrumb"
      />
      <div className="mx-auto max-w-[1360px] grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <div className="space-y-4 sm:space-y-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F6B85]">Direct Engagement</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold leading-tight text-[#111111]">
            Let's Build Something <br />
            <span className="text-[#4F6B85]">Meaningful & Scalable.</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#555555] leading-relaxed">
            Whether you're starting a new custom product or modernizing existing enterprise software, our studio is ready to consult and build.
          </p>

          <div className="space-y-4 text-xs font-sans pt-6 border-t border-black/10">
            <div className="flex items-center space-x-3">
              <Mail className="size-4.5 text-[#4F6B85]" />
              <a href="mailto:info@orillusive.com" className="font-bold text-[#111111] hover:text-[#4F6B85] transition-colors">
                info@orillusive.com
              </a>
            </div>
            <p className="text-[#777777]">Global operations &bull; Response within 24 hours</p>
          </div>
        </div>

        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="size-14 rounded-full bg-[#4F6B85]/10 border border-[#4F6B85]/30 flex items-center justify-center mx-auto text-[#4F6B85]">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="text-2xl font-bold font-sans text-[#111111]">Message Received</h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-sm mx-auto leading-relaxed">
                Thank you for contacting Orillusive. A senior software engineer will review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
              <h3 className="text-xl font-bold font-sans text-[#111111] mb-2">Send an Inquiry</h3>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 flex items-center space-x-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Service Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] transition-all"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your product goals, timeline, or engineering challenges..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-sheen group w-full min-h-12 py-3.5 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2.5 disabled:opacity-50 uppercase tracking-wider shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
