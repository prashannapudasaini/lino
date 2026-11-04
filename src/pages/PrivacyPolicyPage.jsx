import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, Phone } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#0B0B0C] text-white">
      {/* Hero */}
      <PageHero
        eyebrow="LEGAL & TRANSPARENCY"
        title="Privacy Policy"
        subtitle="How Everest Executive Limo LLC collects, protects, and handles your personal and itinerary information."
        breadcrumb={[{ name: "Privacy Policy" }]}
        backgroundImage="/images/custom/service-corporate.jpg"
      />

      {/* Main Document Section */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-[#151517] border border-[#242428] rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-bold block mb-1">
                Official Company Policy
              </span>
              <h2 className="font-serif text-2xl font-normal text-white">
                Everest Executive Limo LLC
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Effective Date: January 1, 2026 &bull; Last Updated: November 2026
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#1D1D20] border border-[#C5A46D]/30 text-xs text-[#C5A46D] font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Client Discretion Guaranteed</span>
            </div>
          </div>

          {/* Legal Article Sections */}
          <div className="space-y-12 text-sm text-zinc-300 leading-relaxed font-normal">
            {/* 1. Information Collection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  01
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Information Collection
                </h3>
              </div>
              <p>
                Everest Executive Limo LLC ("we," "our," or "the Company") collects information directly provided by clients and prospective passengers when requesting quotations, coordinating itineraries, or contacting our dispatch operations.
              </p>
              <p>
                The personal data collected may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li><strong className="text-white">Contact Information:</strong> Full name, executive title, business email address, and direct telephone numbers.</li>
                <li><strong className="text-white">Journey Details:</strong> Exact street pickup addresses, destination addresses, flight schedules, airline designations, and dates/times of required transportation.</li>
                <li><strong className="text-white">Passenger Specifications:</strong> Group size, luggage counts, accessibility requirements, and vehicle class preferences.</li>
              </ul>
            </div>

            {/* 2. Customer Information Handling */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  02
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Customer Information Handling & Use
                </h3>
              </div>
              <p>
                Client information is handled under strict corporate privacy standards. We utilize your data solely for lawful business operations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li>Preparing accurate, customized quotations and travel confirmations.</li>
                <li>Staging professional chauffeurs and assigning suitable vehicles.</li>
                <li>Delivering timely SMS and email itinerary updates, flight status revisions, and chauffeur arrival notifications.</li>
                <li>Fulfilling legal, safety, and regulatory recordkeeping under Pennsylvania Public Utility Commission (PA PUC) and USDOT requirements.</li>
              </ul>
              <p>
                We do not sell, rent, monetize, or publicly disclose customer information to third-party marketing companies under any circumstances.
              </p>
            </div>

            {/* 3. Booking Enquiry Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  03
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Booking & Quotation Enquiry Data
                </h3>
              </div>
              <p>
                Submissions made through our Get a Quote and Booking portals constitute initial quotation inquiries. Data submitted during this step is transmitted directly to our secure internal dispatch system to calculate distance, tolls, and chauffeur availability.
              </p>
              <p>
                Our inquiry system does not process credit cards or online payment transactions directly on this website. Any future payment arrangements or corporate accounts are finalized separately via secure, encrypted invoicing channels.
              </p>
            </div>

            {/* 4. Cookies & Web Analytics */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  04
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Cookies & Technical Tracking
                </h3>
              </div>
              <p>
                Our digital platforms utilize standard technical cookies and local storage tokens to ensure responsive site performance, preserve session state in the administrative dispatch portal, and maintain user preferences.
              </p>
              <p>
                You may configure your browser to decline non-essential cookies; however, certain interactive components—such as auto-completing previous addresses—may require active browser sessions to function smoothly.
              </p>
            </div>

            {/* 5. Third-Party Services */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  05
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Third-Party Services & Integrations
                </h3>
              </div>
              <p>
                To provide premium executive services, we interface with select specialized infrastructure providers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li><strong className="text-white">Google Maps Places API:</strong> Powers real-time address validation and destination autocomplete suggestions. Subject to Google's Privacy Policy.</li>
                <li><strong className="text-white">Aviation Tracking Gateways:</strong> Provides real-time flight status monitoring (FlightAware radar feeds) for commercial airport arrivals.</li>
                <li><strong className="text-white">Secure SMTP Email Relays:</strong> Dispatches immediate confirmation emails and booking reference receipts.</li>
              </ul>
            </div>

            {/* 6. Data Protection & Security */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  06
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Data Protection & Confidentiality
                </h3>
              </div>
              <p>
                We implement comprehensive administrative, technical, and physical safeguards designed to secure personal data from unauthorized access, accidental destruction, alteration, or disclosure. All web communications utilize TLS/SSL encryption.
              </p>
              <p>
                Furthermore, all Everest Executive Limo chauffeurs and dispatch personnel are bound by strict non-disclosure obligations, ensuring high-profile and executive travelers enjoy total itinerary privacy.
              </p>
            </div>

            {/* 7. Customer Privacy Rights */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  07
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Customer Privacy Rights & Inquiries
                </h3>
              </div>
              <p>
                Clients have the right to request access to their personal itinerary records, request corrections to inaccurate contact information, or request the deletion of non-regulatory booking history.
              </p>
              <p>
                To exercise any privacy rights, or if you have questions regarding this Privacy Policy, please contact our administrative office:
              </p>

              <div className="bg-[#151517] border border-[#242428] rounded-2xl p-6 mt-4 space-y-3">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#C5A46D]">
                  Privacy Inquiries & Compliance Desk:
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <div><strong>Company:</strong> Everest Executive Limo LLC</div>
                  <div><strong>Email:</strong> <a href="mailto:privacy@everestlimo.com" className="text-[#C5A46D] hover:underline">privacy@everestlimo.com</a></div>
                  <div><strong>Telephone:</strong> <a href="tel:+17175550199" className="text-white hover:underline">+1 (717) 555-0199</a></div>
                  <div><strong>Location:</strong> Harrisburg, Pennsylvania, United States</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-[#242428] flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>

            <Link
              to="/terms-and-conditions"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A46D] hover:text-[#D5B982] transition-colors"
            >
              View Terms & Conditions &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;

