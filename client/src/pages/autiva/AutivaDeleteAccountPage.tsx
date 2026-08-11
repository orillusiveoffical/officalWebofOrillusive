import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { StructuredData } from '../../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../../data/seoData';
import { Trash2, AlertTriangle, CheckCircle2, Loader2, Mail, ShieldAlert } from 'lucide-react';

export const AutivaDeleteAccountPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Autiva Deletion User',
          email: email.trim(),
          service: 'Autiva Account Deletion Request',
          message: `ACCOUNT DELETION REQUESTED for email: ${email.trim()}.\nUser Reason: ${reason || 'Not specified'}`
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit deletion request. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <SEOHead page={PAGE_SEO.autivaDeleteAccount} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
          { name: 'Autiva', path: '/products/autiva' },
          { name: 'Delete Account', path: '/products/autiva/delete-account' },
        ])}
        id="breadcrumb-autiva-delete"
      />

      <div className="mx-auto max-w-3xl space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-black/10 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-bold font-mono text-rose-600">
            <Trash2 className="size-4" />
            <span>GOOGLE PLAY DATA COMPLIANCE PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-sans">
            Delete Autiva Account & Data
          </h1>
          <p className="text-xs sm:text-sm text-[#555555]">
            Instructions and external request form for deleting your Autiva account and associated data under Google Play User Data policies.
          </p>
        </div>

        {/* 1. Account Deletion Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="size-4" />
              <span>METHOD A (RECOMMENDED)</span>
            </div>
            <h3 className="font-bold text-base text-[#111111]">In-App Instant Deletion</h3>
            <ol className="text-xs text-[#555555] space-y-1.5 list-decimal pl-4">
              <li>Open <strong>Autiva</strong> mobile app.</li>
              <li>Navigate to <code>Settings -&gt; Privacy & Legal</code>.</li>
              <li>Tap <strong>Delete Account</strong>.</li>
              <li>Confirm prompt to immediately cascade-delete all data.</li>
            </ol>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-[#4F6B85] font-bold text-xs">
              <Mail className="size-4" />
              <span>METHOD B</span>
            </div>
            <h3 className="font-bold text-base text-[#111111]">External Web Form</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              If you no longer have access to the mobile app, submit the web deletion form below to request account removal.
            </p>
          </div>
        </div>

        {/* 2. Deletion Scope Information */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4 text-xs text-[#333333]">
          <h3 className="font-bold text-sm text-[#111111] flex items-center space-x-2">
            <ShieldAlert className="size-4 text-amber-600" />
            <span>Data Retention & Cascade Deletion Details</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <p className="font-bold text-rose-700">Permanently Deleted Data:</p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#555555]">
                <li>Account profile, name, and email address</li>
                <li>All logged expenses, income records, and budgets</li>
                <li>All habit trackers, target frequencies, and streaks</li>
                <li>All AI chat history and stored AI memories</li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <p className="font-bold text-[#555555]">Retained Data (Tax & Accounting):</p>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                Anonymous subscription purchase tokens and receipt records managed independently by Google Play Billing are retained as required for statutory accounting compliance.
              </p>
            </div>
          </div>
        </div>

        {/* 3. External Web Deletion Form */}
        <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-bold font-sans text-[#111111]">Submit Account Deletion Request</h2>
            <p className="text-xs text-[#666666] mt-1">
              Enter your registered Autiva email address to initiate manual deletion processing.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="size-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-[#111111]">Deletion Request Transmitted</h4>
              <p className="text-xs text-[#555555]">
                Your request has been recorded. Our engineering operations team will process and confirm deletion within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#111111] uppercase tracking-wider text-[10px] mb-1">
                  Registered Account Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#111111] uppercase tracking-wider text-[10px] mb-1">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us why you are deleting your account..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-rose-600 text-white font-bold text-xs rounded-full hover:bg-rose-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 uppercase tracking-wider shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    <span>Request Account Deletion</span>
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#777777] text-center">
            You may also email your deletion request directly to <a href="mailto:info@orillusive.com" className="text-[#4F6B85] underline">info@orillusive.com</a> from your registered address.
          </p>
        </div>

      </div>
    </div>
  );
};
