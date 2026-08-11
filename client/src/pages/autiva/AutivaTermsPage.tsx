import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { StructuredData } from '../../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../../data/seoData';
import { FileText, Mail } from 'lucide-react';

export const AutivaTermsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <SEOHead page={PAGE_SEO.autivaTerms} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
          { name: 'Autiva', path: '/products/autiva' },
          { name: 'Terms & Conditions', path: '/products/autiva/terms-and-conditions' },
        ])}
        id="breadcrumb-autiva-terms"
      />

      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[#4F6B85]">
            <FileText className="size-4" />
            <span>AUTIVA PRODUCT LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-sans">
            Terms and Conditions — Autiva
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-mono">
            Effective Date: August 12, 2026 • Last Updated: August 12, 2026 • Operated by Orillusive
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
          
          <p className="text-sm sm:text-base">
            Please read these Terms and Conditions ("Terms") carefully before using Autiva (the "App"), developed and operated by Orillusive ("we," "us," "our," or "the Company"). By creating an account or using the App, you agree to be bound by these Terms.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">1. About Autiva</h2>
            <p>
              Autiva is a mobile application (iOS and Android) that helps users track expenses, build habits, and manage personal goals, with AI-powered insights generated using our internally developed AI model.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">2. Eligibility</h2>
            <p>
              You must be at least 13 years old (or the minimum legal age in your jurisdiction) to create an account and use Autiva. By using the App, you confirm that you meet this requirement.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">3. Account Registration</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for providing accurate information when creating your account and for keeping your login credentials confidential.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must notify us promptly if you suspect any unauthorized access to your account.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">4. Use of the App</h2>
            <p>You agree to use Autiva only for lawful, personal purposes. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the App to store or transmit unlawful, fraudulent, or harmful content</li>
              <li>Attempt to reverse-engineer, decompile, or extract the underlying AI model or source code</li>
              <li>Attempt to gain unauthorized access to our servers, other users' accounts, or data</li>
              <li>Use automated tools (bots, scrapers) to access or interact with the App outside normal use</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">5. Financial Data Disclaimer</h2>
            <p>
              Autiva is a personal tracking tool intended to help you organize and understand your own expenses, habits, and goals. It is <strong>not</strong> a financial, investment, tax, or professional advisory service. Any AI-generated insights, suggestions, or summaries are provided for informational purposes only and should not be relied upon as professional financial advice. You remain solely responsible for your financial decisions.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">6. AI Features</h2>
            <p>
              Autiva uses our own internally developed AI model to generate insights, suggestions, and recommendations based on the data you enter. While we aim for these insights to be helpful and accurate, they are generated automatically and may not always be complete, accurate, or applicable to your situation. Use your own judgment when acting on AI-generated suggestions.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">7. Subscriptions and In-App Purchases</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Autiva offers optional subscription plans and/or in-app purchases for premium features.</li>
              <li>All payments are processed through the Apple App Store or Google Play Store and are subject to their respective payment terms, billing cycles, and refund policies.</li>
              <li>Subscriptions may auto-renew unless cancelled before the renewal date, in accordance with the applicable app store's policies.</li>
              <li>We do not directly process or store your payment card details.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">8. Your Data</h2>
            <p>
              Your use of the App and the data you provide is also governed by our <a href="/products/autiva/privacy-policy" className="text-[#4F6B85] font-semibold underline">Privacy Policy</a>, which explains what data we collect, how we use it, and how it is protected. By using Autiva, you also agree to our Privacy Policy.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">9. Intellectual Property</h2>
            <p>
              The App, including its design, features, underlying AI model, and all associated content, is the property of Orillusive and is protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial purposes. You may not copy, modify, distribute, or create derivative works based on the App without our prior written permission.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">10. Service Availability</h2>
            <p>
              We aim to keep Autiva available and functioning reliably, but we do not guarantee uninterrupted or error-free operation. The App may occasionally be unavailable for maintenance, updates, or reasons beyond our control.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Orillusive shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, Autiva, including but not limited to financial decisions made based on data or insights within the App.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">12. Termination</h2>
            <p>
              You may stop using Autiva and delete your account at any time (see <a href="/products/autiva/delete-account" className="text-[#4F6B85] font-semibold underline">Account Deletion Portal</a>). We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or misuse the App.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time to reflect changes in features, legal requirements, or business practices. Material changes will be communicated through the App or via email. Continued use of Autiva after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">14. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Pakistan. Any disputes arising out of or relating to these Terms or your use of Autiva shall be subject to the exclusive jurisdiction of the competent courts of Pakistan.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4 pt-4 border-t border-black/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">15. Contact Us</h2>
            <p>If you have questions about these Terms, contact us at:</p>
            
            <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-black/10 space-y-3">
              <p className="font-bold text-base text-[#111111]">Orillusive (developer of Autiva)</p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#111111]">
                <Mail className="size-4 text-[#4F6B85]" />
                <span>Email: <a href="mailto:info@orillusive.com" className="text-[#4F6B85] underline">info@orillusive.com</a></span>
              </div>
              <p className="text-xs text-[#666666]">Location: Pakistan</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
