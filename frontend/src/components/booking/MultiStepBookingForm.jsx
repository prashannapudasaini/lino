import React, { useState } from 'react';
import { 
  Car, Calendar, Clock, MapPin, Users, Briefcase, 
  Plane, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  ShieldCheck, Copy, Check
} from 'lucide-react';
import Button from '../common/Button';
import { createBooking } from '../../services/api';

const SERVICE_TYPES = [
  "Airport Transportation",
  "Corporate & Executive Travel",
  "Private Hourly Chauffeur",
  "Special Events Transportation"
];

const AIRPORTS = [
  { code: "MDT", name: "Harrisburg International Airport (MDT)" },
  { code: "PHL", name: "Philadelphia International Airport (PHL)" },
  { code: "EWR", name: "Newark Liberty International Airport (EWR)" },
  { code: "JFK", name: "John F. Kennedy International Airport (JFK)" },
  { code: "LGA", name: "LaGuardia Airport (LGA)" },
  { code: "OTHER", name: "Other Regional / Private FBO Airport" }
];

const VEHICLE_PREFERENCES = [
  "Executive Luxury Sedan (Up to 3 Passengers)",
  "Executive Luxury SUV (Up to 6 Passengers)",
  "Executive Jet Sprinter (Up to 14 Passengers)",
  "Executive Stretch Limousine (Up to 8-10 Passengers)",
  "Best Available / Dispatch Recommendation"
];

const MultiStepBookingForm = ({ preselectedService = '', className = '' }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    service_type: preselectedService || 'Airport Transportation',
    pickup_location: '',
    dropoff_location: '',
    pickup_date: '',
    pickup_time: '',
    trip_type: 'one_way',
    return_date: '',
    return_time: '',
    passengers: 1,
    luggage: 1,
    vehicle_preference: 'Executive Luxury Sedan (Up to 3 Passengers)',
    special_requests: '',
    airport_code: 'MDT',
    flight_type: 'arrival',
    airline: '',
    flight_number: '',
    full_name: '',
    email: '',
    phone: '',
    country_code: '+1',
    customer_notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateStep1 = () => {
    if (!formData.pickup_location.trim()) {
      setError("Please provide a pickup location or address.");
      return false;
    }
    if (!formData.dropoff_location.trim()) {
      setError("Please provide a destination location or address.");
      return false;
    }
    if (!formData.pickup_date) {
      setError("Please select your requested pickup date.");
      return false;
    }
    if (!formData.pickup_time) {
      setError("Please select your requested pickup time.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    // If airport transportation is selected, validate flight info
    if (formData.service_type === "Airport Transportation") {
      if (!formData.airport_code) {
        setError("Please select the airport for your transfer.");
        return false;
      }
    }
    return true;
  };

  const validateStep4 = () => {
    if (!formData.full_name.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError("Please enter a valid email address for your quote.");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Please provide a contact phone number.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      // If Airport Transportation, go to Step 3; otherwise go straight to Step 4 (contact)
      if (formData.service_type === "Airport Transportation") {
        setStep(3);
      } else {
        setStep(4);
      }
    } else if (step === 3) {
      if (!validateStep3()) return;
      setStep(4);
    } else if (step === 4) {
      if (!validateStep4()) return;
      setStep(5);
    }
  };

  const handlePrev = () => {
    setError(null);
    if (step === 5) {
      setStep(4);
    } else if (step === 4) {
      if (formData.service_type === "Airport Transportation") {
        setStep(3);
      } else {
        setStep(2);
      }
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await createBooking(formData);
      setSubmittedBooking(res);
    } catch (err) {
      console.error("Booking submission error:", err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : "Unable to submit your request at this time. Please check your network or call dispatch directly at +1 (717) 555-0199.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (submittedBooking?.reference_code) {
      navigator.clipboard.writeText(submittedBooking.reference_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedBooking) {
    return (
      <div className={`bg-luxury-surface border border-luxury-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-luxury-glow">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold block mb-2">
          Request Received Successfully
        </span>

        <h3 className="font-serif text-3xl font-normal text-luxury-textPrimary mb-3">
          Your Executive Quote Request is Under Review
        </h3>

        <p className="text-sm text-luxury-textSecondary leading-relaxed mb-6">
          Thank you, <strong className="text-luxury-textPrimary">{submittedBooking.full_name}</strong>. Our executive dispatch team has received your itinerary and is calculating your personalized, all-inclusive quote. An acknowledgment email has been delivered to <strong className="text-luxury-textPrimary">{submittedBooking.email}</strong>.
        </p>

        {/* Reference Code Card */}
        <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 sm:p-5 mb-8 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-luxury-textMuted block">
              Reference Code
            </span>
            <span className="font-mono text-lg font-bold text-luxury-gold tracking-wider">
              {submittedBooking.reference_code}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-luxury-elevated border border-luxury-border text-xs text-luxury-textSecondary hover:text-luxury-gold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Next Steps Card */}
        <div className="bg-luxury-bg/80 border border-luxury-border rounded-xl p-5 text-left text-xs space-y-3 mb-8">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold shrink-0 text-[11px]">1</span>
            <p className="text-luxury-textSecondary">
              <strong className="text-luxury-textPrimary">Dispatch Itinerary Review:</strong> We verify route timing, requested vehicle class, and airport coordination.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold shrink-0 text-[11px]">2</span>
            <p className="text-luxury-textSecondary">
              <strong className="text-luxury-textPrimary">Custom Quotation Delivery:</strong> You will receive a direct quote with final pricing and chauffeur details.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold shrink-0 text-[11px]">3</span>
            <p className="text-luxury-textSecondary">
              <strong className="text-luxury-textPrimary">Reservation Confirmation:</strong> Your journey is officially locked in once you review and accept the quotation.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setSubmittedBooking(null);
              setStep(1);
            }}
          >
            Submit Another Request
          </Button>
          <a href="tel:+17175550199">
            <Button variant="primary">
              Call Dispatch Directly
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-luxury-surface/95 border border-luxury-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Progress Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-luxury-textSecondary mb-3">
          <span className="uppercase tracking-widest font-semibold text-luxury-gold">
            Step {step} of {formData.service_type === "Airport Transportation" ? 5 : 4}
          </span>
          <span className="text-luxury-textMuted">
            {step === 1 && "Journey Details"}
            {step === 2 && "Vehicle & Passengers"}
            {step === 3 && "Airport Details"}
            {step === 4 && "Contact & Details"}
            {step === 5 && "Review & Submit"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-luxury-card rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-luxury-gold to-luxury-goldHover transition-all duration-300 rounded-full"
            style={{ 
              width: `${(step / (formData.service_type === "Airport Transportation" ? 5 : 4)) * 100}%` 
            }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ================= STEP 1: JOURNEY DETAILS ================= */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
              Select Service & Itinerary
            </h3>
            <p className="text-xs text-luxury-textSecondary mb-4">
              Enter your pickup and destination locations across PA, NY, NJ, or DC.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Service Category *
              </label>
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-3 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold min-h-[44px]"
              >
                {SERVICE_TYPES.map((type, i) => (
                  <option key={i} value={type} className="bg-luxury-card text-luxury-textPrimary">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Trip Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, trip_type: 'one_way' }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                      formData.trip_type === 'one_way'
                        ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                        : 'bg-luxury-card border-luxury-border text-luxury-textSecondary'
                    }`}
                  >
                    One-Way
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, trip_type: 'round_trip' }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                      formData.trip_type === 'round_trip'
                        ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                        : 'bg-luxury-card border-luxury-border text-luxury-textSecondary'
                    }`}
                  >
                    Round-Trip
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  name="pickup_date"
                  value={formData.pickup_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Pickup Location / Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="pickup_location"
                    value={formData.pickup_location}
                    onChange={handleChange}
                    placeholder="e.g. 100 Hotel Rd, Harrisburg, PA or MDT Terminal"
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Destination / Drop-off *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="dropoff_location"
                    value={formData.dropoff_location}
                    onChange={handleChange}
                    placeholder="e.g. PHL Airport, Manhattan, or NYC Address"
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Pickup Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <input
                    type="time"
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleChange}
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold min-h-[44px]"
                  />
                </div>
              </div>

              {formData.trip_type === 'round_trip' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                    Return Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleChange}
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-2 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                    <input
                      type="time"
                      name="return_time"
                      value={formData.return_time}
                      onChange={handleChange}
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-2 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 2: PASSENGERS & VEHICLE ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
              Passengers & Vehicle Preference
            </h3>
            <p className="text-xs text-luxury-textSecondary mb-4">
              Tell us your group size and vehicle class preference.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Luggage Bags
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <select
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleChange}
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Bag' : 'Bags'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Preferred Vehicle Class
              </label>
              <select
                name="vehicle_preference"
                value={formData.vehicle_preference}
                onChange={handleChange}
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-3 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
              >
                {VEHICLE_PREFERENCES.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Special Requests or Accommodations (Optional)
              </label>
              <textarea
                name="special_requests"
                rows="3"
                value={formData.special_requests}
                onChange={handleChange}
                placeholder="e.g. Booster seat needed, quiet cabin requested, meet-and-greet inside terminal, beverages..."
                className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: AIRPORT DETAILS (CONDITIONAL) ================= */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
              Airport Transfer Details
            </h3>
            <p className="text-xs text-luxury-textSecondary mb-4">
              Provide your flight information for precise arrival tracking and terminal coordination.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Airport *
              </label>
              <select
                name="airport_code"
                value={formData.airport_code}
                onChange={handleChange}
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-3 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
              >
                {AIRPORTS.map(a => (
                  <option key={a.code} value={a.code}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Transfer Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, flight_type: 'arrival' }))}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                      formData.flight_type === 'arrival'
                        ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                        : 'bg-luxury-card border-luxury-border text-luxury-textSecondary'
                    }`}
                  >
                    Arrival (Pickup)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, flight_type: 'departure' }))}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                      formData.flight_type === 'departure'
                        ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                        : 'bg-luxury-card border-luxury-border text-luxury-textSecondary'
                    }`}
                  >
                    Departure (Drop)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Airline (Optional)
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  placeholder="e.g. Delta, United, American"
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Flight Number (Optional)
              </label>
              <div className="relative">
                <Plane className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="flight_number"
                  value={formData.flight_number}
                  onChange={handleChange}
                  placeholder="e.g. DL 1492 or UA 210"
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
              <p className="text-[11px] text-luxury-textMuted mt-1.5">
                Our operations team reviews flight timing to accommodate any inbound delays.
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CONTACT INFORMATION ================= */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
              Contact & Quotation Details
            </h3>
            <p className="text-xs text-luxury-textSecondary mb-4">
              Where should we send your quote and itinerary acknowledgment?
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Primary Passenger / Contact Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Jonathan Vance"
                required
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="client@executive.com"
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Phone Number (SMS / Calls) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (717) 555-0199"
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Additional Instructions for Dispatch (Optional)
              </label>
              <textarea
                name="customer_notes"
                rows="2"
                value={formData.customer_notes}
                onChange={handleChange}
                placeholder="Any gate codes, corporate billing references, or specific timing notes..."
                className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 5: REVIEW & CONFIRM ================= */}
        {step === 5 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
              Review Your Quote Request
            </h3>
            <p className="text-xs text-luxury-textSecondary mb-4">
              Please verify your journey details before submitting to dispatch.
            </p>

            <div className="bg-luxury-card border border-luxury-border rounded-xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                <span className="text-luxury-textMuted">Service:</span>
                <span className="font-semibold text-luxury-gold text-right">{formData.service_type}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                <span className="text-luxury-textMuted">Pickup:</span>
                <span className="font-medium text-luxury-textPrimary text-right">{formData.pickup_location}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                <span className="text-luxury-textMuted">Destination:</span>
                <span className="font-medium text-luxury-textPrimary text-right">{formData.dropoff_location}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                <span className="text-luxury-textMuted">Date & Time:</span>
                <span className="font-medium text-luxury-textPrimary text-right">{formData.pickup_date} at {formData.pickup_time}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                <span className="text-luxury-textMuted">Vehicle & Group:</span>
                <span className="font-medium text-luxury-textPrimary text-right">{formData.passengers} Passengers / {formData.luggage} Bags</span>
              </div>
              {formData.airport_code && (
                <div className="grid grid-cols-2 gap-2 border-b border-luxury-border/60 pb-2.5">
                  <span className="text-luxury-textMuted">Airport / Flight:</span>
                  <span className="font-medium text-luxury-textPrimary text-right">{formData.airport_code} {formData.flight_number || ''}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <span className="text-luxury-textMuted">Client:</span>
                <span className="font-semibold text-luxury-textPrimary text-right">{formData.full_name} ({formData.phone})</span>
              </div>
            </div>

            {/* Privacy & Quotation Reassurance Notice */}
            <div className="bg-luxury-elevated/80 border-l-2 border-luxury-gold p-4 rounded-r-xl text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-luxury-textPrimary">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>Complimentary, No-Obligation Quote Request</span>
              </div>
              <p className="text-luxury-textSecondary leading-relaxed">
                By clicking "Submit Quote Request", you authorize our executive team to review your route and deliver a customized quote. No automated credit card charges or commitments are made at this step.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-luxury-border flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-luxury-border text-xs text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-white/5 transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < (formData.service_type === "Airport Transportation" ? 5 : 4) ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className="tracking-wider text-xs uppercase"
            >
              Continue <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              className="tracking-wider text-xs uppercase font-bold"
            >
              Submit Quote Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepBookingForm;
