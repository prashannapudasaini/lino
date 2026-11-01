import React, { useState } from 'react';
import PageHero from '../components/common/PageHero';

const PrivacyTermsPage = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div>
      <PageHero
        eyebrow="Legal & Policies"
        title="Privacy Policy & Terms of Service"
        subtitle="Transparent policies governing quotation inquiries, client personal data, and limousine transportation service terms."
        breadcrumb={[{ name: "Legal Terms" }]}
        backgroundImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 md:py-24 bg-luxury-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Policy Selector Tabs */}
          <div className="flex border-b border-luxury-border mb-10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-4 px-6 text-sm font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'privacy'
                  ? 'text-luxury-gold border-b-2 border-luxury-gold'
                  : 'text-luxury-textSecondary hover:text-luxury-textPrimary'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-4 px-6 text-sm font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'terms'
                  ? 'text-luxury-gold border-b-2 border-luxury-gold'
                  : 'text-luxury-textSecondary hover:text-luxury-textPrimary'
              }`}
            >
              Terms & Conditions
            </button>
          </div>

          {/* Privacy Policy Content */}
          {activeTab === 'privacy' && (
            <div className="prose prose-invert max-w-none space-y-8 text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">1. Information We Collect</h3>
                <p>
                  Everest Executive Limo LLC ("we", "our", or "us") respects your privacy. When you submit a booking quotation request or contact message through our website, we collect necessary contact and travel information including your full name, email address, telephone number, pickup and drop-off addresses, requested travel dates and times, passenger counts, and optional airline flight numbers.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">2. How Your Information is Used</h3>
                <p>
                  Information collected is utilized exclusively for the following operational purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Preparing and delivering your personalized executive transportation quotation.</li>
                  <li>Coordinating dispatch schedules, route planning, and assigned chauffeur logistics.</li>
                  <li>Tracking commercial flight arrivals when flight details are provided.</li>
                  <li>Direct customer service communication regarding your itinerary.</li>
                </ul>
                <p className="mt-2">
                  We do not sell, rent, monetize, or disclose your personal information to third-party marketing companies.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">3. Data Security & Storage</h3>
                <p>
                  We implement industry-standard technical measures, secure servers, and encrypted protocols to safeguard the personal information submitted through our quotation portal. Access is restricted to authorized dispatch coordinators and operations personnel.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">4. Contact For Privacy Matters</h3>
                <p>
                  If you have questions regarding our privacy practices or wish to request the deletion of past quotation records, please email <a href="mailto:reservations@everestlimo.com" className="text-luxury-gold underline">reservations@everestlimo.com</a> or call +1 (717) 555-0199.
                </p>
              </div>
            </div>
          )}

          {/* Terms & Conditions Content */}
          {activeTab === 'terms' && (
            <div className="prose prose-invert max-w-none space-y-8 text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">1. Nature of Booking Enquiries</h3>
                <p>
                  Submission of an itinerary request via this website constitutes a quotation enquiry. It does not constitute an instant confirmed reservation or contractual contract of carriage until our dispatch team verifies vehicle availability, delivers a formal quote, and you accept the terms of the booking.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">2. Rates, Estimates & Waiting Time</h3>
                <p>
                  All quotations delivered are based on the itinerary specifics provided at the time of inquiry. Additional stops, extensive route deviations, parking fees, bridge/tunnel tolls, or excessive waiting times outside complimentary airport grace periods may be subject to standard rates outlined in your quotation.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">3. Vehicle Class & Substitutions</h3>
                <p>
                  Everest Executive Limo LLC reserves the right to upgrade a passenger to a higher vehicle class (for example, providing a luxury SUV instead of a sedan) at no additional charge in the rare event of mechanical maintenance or dispatch logistics.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-luxury-textPrimary mb-3">4. Conduct & Passenger Safety</h3>
                <p>
                  For the safety and hygiene of all guests, smoking, vaping, and illegal substances are strictly prohibited inside all Everest Executive Limo vehicles. Chauffeurs reserve the right to terminate service without refund if passenger behavior endangers road safety or vehicle integrity.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PrivacyTermsPage;
