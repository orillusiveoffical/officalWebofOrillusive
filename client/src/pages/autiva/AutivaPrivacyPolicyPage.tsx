import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { StructuredData } from '../../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../../data/seoData';
import { ShieldCheck, Mail } from 'lucide-react';

export const AutivaPrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <SEOHead page={PAGE_SEO.autivaPrivacy} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/projects' },
          { name: 'Autiva', path: '/products/autiva' },
          { name: 'Privacy Policy', path: '/products/autiva/privacy-policy' },
        ])}
        id="breadcrumb-autiva-privacy"
      />

      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[#4F6B85]">
            <ShieldCheck className="size-4" />
            <span>AUTIVA PRODUCT LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-sans">
            Privacy Policy — Autiva
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-mono">
            Effective Date: August 12, 2026 • Last Updated: August 12, 2026 • Operated by Orillusive
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
          
          <p className="text-sm sm:text-base">
            Autiva ("we," "us," "our," or "the App") is an expense, habit, and goal tracking mobile application developed and operated by Orillusive ("the Company"). This Privacy Policy explains how we collect, use, store, and protect your information when you use the Autiva app on iOS or Android.
          </p>

          <p>
            By creating an account or using Autiva, you agree to the collection and use of information as described in this Privacy Policy.
          </p>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">1. Information We Collect</h2>
            
            <div className="space-y-2">
              <h3 className="font-bold text-[#111111]">1.1 Account Information</h3>
              <p>When you register for Autiva, we collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Password (stored in encrypted/hashed form)</li>
                <li>Optional profile details (e.g., profile picture, phone number, if provided)</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#111111]">1.2 Financial and Expense Data</h3>
              <p>To provide expense tracking features, we collect information you enter, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expense entries (amount, category, date, description)</li>
                <li>Income entries, if applicable</li>
                <li>Budgets and spending limits you set</li>
                <li>Payment method labels you choose to add (e.g., "Cash," "Card") — we do not collect actual card numbers or banking credentials</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#111111]">1.3 Habit and Goal Data</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Habits you create and track (name, frequency, completion status, streaks)</li>
                <li>Goals you set (targets, deadlines, progress notes)</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#111111]">1.4 AI Feature Data</h3>
              <p>Autiva uses our own, internally developed AI model to provide features such as spending insights, habit suggestions, and goal recommendations. To generate these, the AI model processes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your expense, habit, and goal entries</li>
                <li>Usage patterns within the app (e.g., which features you use, how often you log entries)</li>
              </ul>
              <p className="pt-1 text-[#555555]">
                This processing happens using our own AI infrastructure. We do not send your personal financial or habit data to third-party AI providers (such as OpenAI, Google, or Anthropic) for this purpose.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#111111]">1.5 Payment and Subscription Information</h3>
              <p>
                If you purchase a subscription or in-app purchase, payment is processed through the Apple App Store or Google Play Store. We do not directly collect or store your card, bank, or payment credentials — these are handled entirely by Apple/Google. We only receive confirmation of purchase status (e.g., active subscription, plan type, renewal date).
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-[#111111]">1.6 Device and Technical Information</h3>
              <p>
                We may automatically collect limited technical information necessary for the app to function and remain secure, including device type, operating system version, app version, and crash/error logs.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create and manage your Autiva account</li>
              <li>Provide core features: expense tracking, habit tracking, and goal tracking</li>
              <li>Generate AI-powered insights, suggestions, and summaries based on your own data</li>
              <li>Process and manage subscriptions or in-app purchases</li>
              <li>Sync your data securely across your devices via our cloud servers</li>
              <li>Maintain, secure, and improve the App</li>
              <li>Respond to support requests</li>
            </ul>
            <p className="pt-1 font-semibold text-[#111111]">
              We do not use your financial, habit, or goal data for advertising or sell it to third parties.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">3. Data Storage and Security</h2>
            <p>
              Your data is stored on our cloud servers, protected using industry-standard security measures, including encryption in transit (HTTPS/TLS) and access controls limiting who at Orillusive can access user data. Passwords are stored in hashed form and are never visible to our staff in plain text.
            </p>
            <p>
              While we take reasonable precautions to protect your data, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">4. Data Sharing</h2>
            <p>We do not sell your personal, financial, habit, or goal data to third parties. Your information may only be shared:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>With payment processors (Apple App Store / Google Play) solely to process subscriptions and purchases</li>
              <li>Where required by law or a valid legal request from a competent authority in Pakistan</li>
              <li>With your explicit consent</li>
            </ul>
            <p className="pt-1 text-[#555555]">
              Since our AI model is developed and run internally, your data is not shared with external AI providers for processing.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">5. Data Retention</h2>
            <p>
              We retain your account data, expense entries, habits, and goals for as long as your account remains active. If you delete your account, we will delete or anonymize your personal data within a reasonable period, except where retention is required for legal, tax, or accounting obligations under the laws of Pakistan.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data directly within the app, where applicable</li>
              <li>Request deletion of your account and associated data (<a href="/products/autiva/delete-account" className="text-[#4F6B85] font-semibold underline">Account Deletion Portal</a>)</li>
              <li>Export your data, where technically supported</li>
              <li>Withdraw consent for non-essential processing at any time</li>
            </ul>
            <p className="pt-1">To exercise these rights, contact us using the details in Section 10.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">7. Children's Privacy</h2>
            <p>
              Autiva is not intended for individuals under the age of 13 (or the applicable minimum age in your jurisdiction). We do not knowingly collect data from children below this age. If we become aware of such data being collected, we will delete it promptly.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">8. In-App Purchases and Subscriptions</h2>
            <p>
              Subscription payments are billed and managed through the Apple App Store or Google Play Store, subject to their respective terms and privacy policies. Refunds, cancellations, and billing disputes for subscriptions are handled according to the policies of the relevant app store, not directly by Orillusive.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices, features, or legal requirements. We will notify users of material changes through the app or via email, and the "Last Updated" date above will be revised accordingly.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 pt-4 border-t border-black/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">10. Contact Us</h2>
            <p>If you have questions or requests regarding this Privacy Policy or your data, contact us at:</p>
            
            <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-black/10 space-y-3">
              <p className="font-bold text-base text-[#111111]">Orillusive (developer of Autiva)</p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#111111]">
                <Mail className="size-4 text-[#4F6B85]" />
                <span>Email: <a href="mailto:info@orillusive.com" className="text-[#4F6B85] underline">info@orillusive.com</a></span>
              </div>
              <p className="text-xs text-[#666666]">Location: Pakistan</p>
            </div>

            <p className="text-xs italic text-[#777777] pt-2">
              This Privacy Policy is governed by and construed in accordance with the laws of Pakistan.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
