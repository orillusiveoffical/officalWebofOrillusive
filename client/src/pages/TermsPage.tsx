import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { PAGE_SEO, buildBreadcrumbSchema } from '../data/seoData';
import { FileText, Mail, Globe } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-16 bg-[#F7F7F5] text-[#111111] font-sans min-h-screen">
      <SEOHead page={PAGE_SEO.terms} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms' },
        ])}
        id="breadcrumb-terms"
      />

      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[#4F6B85]">
            <FileText className="size-4" />
            <span>ORILLUSIVE STUDIO LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-sans">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] font-mono">
            Effective Date: August 11, 2026 • Last Updated: August 11, 2026 • Operated by Orillusive
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-black/10 rounded-3xl p-6 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
          
          <p className="text-sm sm:text-base">
            Please read these Terms and Conditions ("Terms") carefully before using the website <strong>orillusive.com</strong> (the "Site") or engaging the services of Orillusive ("we," "us," "our," or "the Company"). By accessing our Site or engaging our services, you agree to be bound by these Terms.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">1. About Orillusive</h2>
            <p>
              Orillusive is a web development and software business based in Pakistan, providing services including but not limited to website design and development, custom software and system development, web application development, and related digital services for clients on a project or contractual basis.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">2. Use of the Site</h2>
            <p>
              The content on this Site is provided for general informational purposes about Orillusive and its services. You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the Site by, any third party.
            </p>
            <p>
              You may not use this Site to transmit any material that is unlawful, harmful, threatening, defamatory, or otherwise objectionable, or to attempt to gain unauthorized access to any part of the Site or its underlying systems.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">3. Contact Form Submissions</h2>
            <p>
              Any information you submit through our contact form is used solely to respond to your inquiry and, where applicable, to prepare proposals, quotes, or agreements for services. Submission of an inquiry does not create any binding obligation on either party until a separate written agreement or contract is signed.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">4. Services and Engagements</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All project work, timelines, fees, and deliverables are governed by a separate, individually agreed proposal, quotation, invoice, and/or service agreement between Orillusive and the client.</li>
              <li>These Terms apply to your use of the Site itself. Where a conflict arises between these Terms and a signed project agreement, the signed project agreement will govern for that specific engagement.</li>
              <li>Orillusive reserves the right to accept or decline any project inquiry at its sole discretion.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">5. Payments</h2>
            <p>
              Payment terms, including any advance payments, milestones, or final balances, will be specified in the individual proposal, invoice, or agreement issued for each project. Unless otherwise agreed in writing, payments are due as per the terms stated in the relevant invoice or agreement.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">6. Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All content on this Site, including but not limited to text, graphics, logos, and design, is the property of Orillusive unless otherwise stated, and may not be copied, reproduced, or distributed without prior written permission.</li>
              <li>Ownership and rights to work product delivered as part of a client project (e.g., custom code, designs, systems) will be governed by the terms of the individual project agreement with that client, not by these general Terms.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">7. No Warranty</h2>
            <p>
              This Site and its content are provided on an "as is" and "as available" basis. While we strive to keep information on this Site accurate and up to date, we make no warranties or representations, express or implied, about the completeness, accuracy, reliability, or availability of the Site or its content.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Orillusive shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this Site. Liability arising from actual client project engagements will instead be governed by the terms of the relevant signed project agreement.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">9. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. We do not control and are not responsible for the content, privacy practices, or policies of any third-party sites. Accessing such links is at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">10. Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Pakistan. Any disputes arising out of or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the competent courts of Pakistan.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4 pt-4 border-t border-black/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">12. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            
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
              This Terms and Conditions document is governed by and construed in accordance with the laws of Pakistan.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
