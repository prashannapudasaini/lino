import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const TermsPage = () => {
  return (
    <div className="bg-[#0B0B0C] text-white">
      {/* Hero */}
      <PageHero
        eyebrow="LEGAL & TERMS"
        title="Terms and Conditions"
        subtitle="General service guidelines, quotation processes, and reservation terms governing your ground travel."
        breadcrumb={[{ name: "Terms and Conditions" }]}
        backgroundImage="/images/custom/service-airport.jpg"
      />

      {/* Main Content Section */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-[#151517] border border-[#242428] rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-bold block mb-1">
                Standard Terms of Service
              </span>
              <h2 className="font-serif text-2xl font-normal text-white">
                Everest Executive Limo LLC
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Applicable to All Private Chauffeur & Executive Ground Charters &bull; Version 2026.1
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#1D1D20] border border-[#C5A46D]/30 text-xs text-[#C5A46D] font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Service Agreement</span>
            </div>
          </div>

          {/* Legal Article Sections */}
          <div className="space-y-12 text-sm text-zinc-300 leading-relaxed font-normal">
            {/* 1. Website Usage */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  01
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Website Usage & Electronic Communications
                </h3>
              </div>
              <p>
                By accessing, browsing, or submitting information through the Everest Executive Limo LLC website, you agree to comply with and be bound by these Terms and Conditions. This website is provided to facilitate executive ground transportation inquiries, fleet browsing, and dispatch coordination.
              </p>
              <p>
                Any transmission of itinerary data constitutes authorization for our dispatch desk to communicate with you via telephone, email, or SMS regarding your requested itinerary.
              </p>
            </div>

            {/* 2. Booking Request Process */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  02
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Booking Request & Quotation Inquiry Process
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 text-amber-200/90 text-xs leading-relaxed">
                <strong className="text-amber-300 block mb-1">Important Notice on Quotation Requests:</strong>
                Submissions made through our web portal represent a <em>request for quotation</em> and do not constitute a guaranteed reservation or binding contract of carriage. All requests are subject to review, route evaluation, and official acceptance by our dispatch operations.
              </div>
              <p>
                No automated charges, financial commitments, or card debits occur upon form submission. A journey is officially confirmed only when our team provides a personalized quotation and the client accepts the written terms.
              </p>
            </div>

            {/* 3. Quote and Reservation Process */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  03
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Quotations, Pricing & Payment Terms
                </h3>
              </div>
              <p>
                All quotations issued by Everest Executive Limo LLC are all-inclusive of vehicle, professional chauffeur, standard tolls, and base airport arrival fees, unless specifically itemized otherwise.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li><strong className="text-white">Route Alterations:</strong> Unscheduled stops, multi-city route modifications, or extended waiting time requested by the passenger during the trip will be billed at our standard hourly charter rate.</li>
                <li><strong className="text-white">Commercial Aviation Delays:</strong> We monitor published airline schedules. Arrival pickups include a complimentary 45-minute grace period for domestic flights and 60 minutes for international flights from recorded touchdown.</li>
                <li><strong className="text-white">Invoicing:</strong> Corporate clients with pre-approved billing arrangements receive consolidated net-30 invoicing. Private clients finalize billing through secure digital payment authorizations.</li>
              </ul>
            </div>

            {/* 4. Cancellation & Rescheduling Policies */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  04
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Cancellation & Rescheduling Policies
                </h3>
              </div>
              <p>
                To provide dependable luxury service, our fleet and chauffeurs are exclusively reserved in advance. The following standard cancellation windows apply:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li><strong className="text-white">Airport Transfers & Standard One-Way:</strong> Cancellations made more than 12 hours prior to scheduled pickup incur no cancellation charge. Cancellations within 12 hours may be subject to a dispatch fee.</li>
                <li><strong className="text-white">Executive Sprinter & Multi-Hour Charters:</strong> Cancellations made more than 24 to 48 hours prior to scheduled charter time incur no fee. Late cancellations within 24 hours may incur a partial charter retention fee.</li>
                <li><strong className="text-white">Weather Emergencies:</strong> Cancellations or delays caused by severe FAA airport ground stops or severe state-declared winter road closures are rescheduled without penalty.</li>
              </ul>
            </div>

            {/* 5. Customer Responsibilities & Vehicle Conduct */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  05
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Customer Conduct & Passenger Responsibilities
                </h3>
              </div>
              <p>
                To preserve vehicle cleanliness and ensure passenger safety:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                <li><strong className="text-white">Non-Smoking Policy:</strong> All vehicles are strictly 100% smoke-free and vape-free environments. A minimum $350 deep-sanitization detailing fee applies to any violation.</li>
                <li><strong className="text-white">Passenger Safety:</strong> Seatbelt usage is mandated under state motor vehicle laws. Chauffeurs reserve the right to refuse transport to intoxicated or disorderly individuals whose behavior threatens vehicular safety.</li>
                <li><strong className="text-white">Luggage & Valuables:</strong> While chauffeurs take extreme care handling baggage, passengers are responsible for verifying personal items (passports, electronics, jewelry) upon departure from the vehicle cabin.</li>
              </ul>
            </div>

            {/* 6. General Service Terms & Limitation of Liability */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/40 text-[#C5A46D] flex items-center justify-center font-mono font-bold text-xs">
                  06
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  General Service Terms & Operating Jurisdiction
                </h3>
              </div>
              <p>
                Everest Executive Limo LLC operates in full compliance with Pennsylvania Public Utility Commission (PA PUC) carrier licensing, Federal Motor Carrier Safety Administration (FMCSA), and USDOT regulations.
              </p>
              <p>
                While we employ proactive dispatch monitoring and backup vehicle staging, the Company is not liable for indirect transit delays resulting from unforeseen extreme traffic gridlock, highway closures, severe weather, or force majeure events beyond human control. In any rare mechanical incident, a replacement luxury vehicle is immediately mobilized.
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-16 pt-8 border-t border-[#242428] flex items-center justify-between">
            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A46D] hover:text-[#D5B982] transition-colors"
            >
              &larr; View Privacy Policy
            </Link>

            <Link
              to="/book-now"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            >
              Request a Ride Quotation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;

