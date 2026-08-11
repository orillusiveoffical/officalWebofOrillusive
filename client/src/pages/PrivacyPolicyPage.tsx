import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <SEOHead page={PAGE_SEO.privacy} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
        id="breadcrumb-privacy"
      />

      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[#4F6B85]">
            <ShieldCheck className="size-4" />
            <span>ORILLUSIVE STUDIO LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-sans">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-mono">
            Effective Date: August 11, 2026 • Last Updated: August 11, 2026 • Operated by Orillusive
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
          
          <p className="text-sm sm:text-base">
            Orillusive ("we," "us," "our," or "the Company") operates the website <strong>orillusive.com</strong> (the "Site") and provides web development and software services. This Privacy Policy explains how we collect, use, store, and protect information when you visit our Site or contact us through it.
          </p>

          <p>
            By using our Site, you agree to the collection and use of information in accordance with this policy.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">1. Information We Collect</h2>
            <p>We collect information you voluntarily provide to us when you use the contact form on our Site, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Any message or project details you choose to share with us</li>
            </ul>
            <p className="pt-1 text-[#555555]">
              We do not use cookies, tracking pixels, analytics tools, or any third-party services to collect data about your visit to our Site. We do not automatically collect technical information such as your IP address, browser type, or browsing behavior through any tracking software.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">2. How We Use Your Information</h2>
            <p>The information you submit through our contact form is used solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your inquiry</li>
              <li>Discuss potential projects, proposals, or services with you</li>
              <li>Prepare quotes, proposals, invoices, or contracts if you choose to proceed with our services</li>
              <li>Communicate with you regarding ongoing or completed projects</li>
            </ul>
            <p className="pt-1 font-semibold text-[#111111]">
              We do not use your information for advertising, marketing automation, or any purpose unrelated to your inquiry or engagement with Orillusive.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">3. How We Share Your Information</h2>
            <p>
              We do not sell, rent, trade, or otherwise share your personal information with third parties for marketing purposes.
            </p>
            <p>Your information may only be shared in the following limited circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>With your explicit consent</li>
              <li>Where required by applicable law, regulation, or a valid legal request from a competent authority in Pakistan</li>
              <li>With subcontractors or collaborators directly involved in delivering a project you have engaged us for, and only to the extent necessary to complete that work</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">4. Data Storage and Security</h2>
            <p>
              Information submitted through our contact form is stored securely and is accessible only to authorized personnel at Orillusive. We take reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              While we take reasonable precautions, no method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">5. Data Retention</h2>
            <p>
              We retain the personal information you submit for as long as necessary to respond to your inquiry, fulfil any resulting engagement, and comply with our legal, accounting, or record-keeping obligations under the laws of Pakistan. You may request deletion of your information at any time, as described in Section 6 below.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information, subject to any legal or contractual retention requirements</li>
              <li>Withdraw consent to be contacted at any time</li>
            </ul>
            <p className="pt-1">To exercise any of these rights, please contact us using the details in Section 9 below.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">7. Children's Privacy</h2>
            <p>
              Our Site and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 pt-4 border-t border-black/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">9. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your information, please contact us at:</p>
            
            <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-black/10 space-y-3">
              <p className="font-bold text-base text-[#111111]">Orillusive</p>
              <div className="flex items-center space-x-2 text-xs text-[#555555]">
                <Globe className="size-4 text-[#4F6B85]" />
                <span>Website: <a href="https://orillusive.com" className="text-[#111111] font-semibold hover:underline">orillusive.com</a></span>
              </div>
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
