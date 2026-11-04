import React, { useState } from 'react';
import { 
  Car, Calendar, Clock, MapPin, Users, Briefcase, 
  Plane, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  ShieldCheck, Copy, Check, Edit3, HelpCircle, Info
} from 'lucide-react';
import Button from '../common/Button';
import GoogleAddressAutocomplete from './GoogleAddressAutocomplete';
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
  { code: "BWI", name: "Baltimore/Washington International (BWI)" },
  { code: "IAD", name: "Washington Dulles International (IAD)" },
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
    // Airport & Flight Information
    airport_code: 'MDT',
    flight_type: 'arrival',
    airline: '',
    flight_number: '',
    flight_date: '',
    flight_time: '',
    // Customer Contact Details
    full_name: '',
    email: '',
    phone: '',
    customer_notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Field Validations
  const validateStep1 = () => {
    if (!formData.pickup_location.trim()) {
      setError("Please provide a valid pickup location or street address.");
      return false;
    }
    if (!formData.dropoff_location.trim()) {
      setError("Please provide a destination or drop-off location.");
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
    if (formData.trip_type === 'round_trip' && (!formData.return_date || !formData.return_time)) {
      setError("Please provide return date and time for round-trip reservation.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.passengers < 1) {
      setError("Please specify at least 1 passenger.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address to receive your quotation.");
      return false;
    }
    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setError("Please enter a valid contact phone number.");
      return false;
    }
    return true;
  };

  const isAirportService = formData.service_type === "Airport Transportation";
  const totalSteps = isAirportService ? 5 : 4;

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      if (isAirportService) {
        setStep(3);
      } else {
        setStep(4);
      }
    } else if (step === 3) {
      if (!validateStep3()) return;
      setStep(4);
    } else if (step === 4) {
      if (!validateStep4()) return;
      setStep(5); // Review Step
    }
  };

  const handlePrev = () => {
    setError(null);
    if (step === 5) {
      setStep(4);
    } else if (step === 4) {
      if (isAirportService) {
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
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await createBooking(formData);
      setSubmittedBooking(res);
    } catch (err) {
      console.error("Booking submission error:", err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : "Unable to submit your quote request at this time. Please check your connection or contact our 24/7 dispatch at +1 (717) 555-0199.");
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

  // ================= SUCCESS SCREEN =================
  if (submittedBooking) {
    return (
      <div className={`bg-luxury-surface border border-luxury-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-luxury-glow">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-luxury-gold block mb-2">
          Request Acknowledged
        </span>

        {/* Exact required heading and success message */}
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary mb-4">
          Your ride request has been successfully submitted!
        </h3>

        <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed mb-6 max-w-xl mx-auto">
          Thank you for choosing <strong className="text-luxury-textPrimary">Everest Executive Limo</strong>. Our team has received your request and will contact you shortly with your personalized quotation.
        </p>

        {/* Clear Explanation that this is a request, not a confirmed reservation */}
        <div className="bg-amber-950/25 border border-amber-500/30 rounded-xl p-3.5 sm:p-4 mb-6 text-left max-w-lg mx-auto">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90 leading-relaxed">
              <strong>Notice:</strong> This is a reservation enquiry and quotation request. Your ride is not confirmed until our dispatch team verifies vehicle availability and you accept your customized quote. No charges have been made.
            </p>
          </div>
        </div>

        {/* Reference Code Card */}
        <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 sm:p-5 mb-8 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-luxury-textMuted block">
              Request Reference Number
            </span>
            <span className="font-mono text-lg font-bold text-luxury-gold tracking-wider">
              {submittedBooking.reference_code}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            type="button"
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
              <strong className="text-luxury-textPrimary">Dispatch Route Review:</strong> We verify route timing, requested vehicle class, and airport coordination.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold shrink-0 text-[11px]">2</span>
            <p className="text-luxury-textSecondary">
              <strong className="text-luxury-textPrimary">Personalized Quotation:</strong> You will receive an all-inclusive quote via email at <strong className="text-luxury-textPrimary">{submittedBooking.email}</strong>.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold shrink-0 text-[11px]">3</span>
            <p className="text-luxury-textSecondary">
              <strong className="text-luxury-textPrimary">Booking Confirmation:</strong> Your reservation is locked in once you approve the quotation details.
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

  // ================= MAIN MULTI-STEP FORM =================
  return (
    <div className={`bg-luxury-surface/95 border border-luxury-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Progress Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-luxury-textSecondary mb-3">
          <span className="uppercase tracking-widest font-semibold text-luxury-gold">
            Step {step} of {totalSteps}
          </span>
          <span className="text-luxury-textMuted">
            {step === 1 && "Journey Details"}
            {step === 2 && "Passenger & Vehicle"}
            {step === 3 && (isAirportService ? "Airport & Flight Details" : "Passenger & Vehicle")}
            {step === 4 && "Customer Information"}
            {step === 5 && "Review & Submit"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-luxury-card rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-luxury-gold to-luxury-goldHover transition-all duration-300 rounded-full"
            style={{ 
              width: `${(step / totalSteps) * 100}%` 
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
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
                Journey & Route Details
              </h3>
              <p className="text-xs text-luxury-textSecondary">
                Enter your pickup and destination locations. We service Central PA, Philadelphia, New York, New Jersey, and Washington D.C.
              </p>
            </div>

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

            {/* Trip Type Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Trip Type
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, trip_type: 'one_way' }))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                    formData.trip_type === 'one_way'
                      ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                      : 'bg-luxury-card border-luxury-border text-luxury-textSecondary hover:border-luxury-border/80'
                  }`}
                >
                  One-Way Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, trip_type: 'round_trip' }))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors min-h-[44px] ${
                    formData.trip_type === 'round_trip'
                      ? 'bg-luxury-gold/15 border-luxury-gold text-luxury-gold font-semibold'
                      : 'bg-luxury-card border-luxury-border text-luxury-textSecondary hover:border-luxury-border/80'
                  }`}
                >
                  Round-Trip
                </button>
              </div>
            </div>

            {/* Google Places Autocomplete: Pickup Address */}
            <div>
              <GoogleAddressAutocomplete
                id="pickup_location"
                label="Pickup Address / Location *"
                value={formData.pickup_location}
                onChange={(val) => handleAddressChange('pickup_location', val)}
                placeholder="e.g. 100 Hotel Rd, Hershey, PA or MDT Terminal"
                required
              />
            </div>

            {/* Google Places Autocomplete: Destination Address */}
            <div>
              <GoogleAddressAutocomplete
                id="dropoff_location"
                label="Destination / Drop-off Address *"
                value={formData.dropoff_location}
                onChange={(val) => handleAddressChange('dropoff_location', val)}
                placeholder="e.g. PHL Airport, Midtown Manhattan, or Washington DC"
                required
              />
            </div>

            {/* Pickup Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Pickup Date *
                </label>
                <div className="relative">
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

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Pickup Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5 pointer-events-none" />
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
            </div>

            {/* Round Trip Return Date & Time */}
            {formData.trip_type === 'round_trip' && (
              <div className="p-4 bg-luxury-card/60 border border-luxury-border rounded-xl space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold block">
                  Return Journey Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-luxury-textSecondary mb-1.5">
                      Return Date *
                    </label>
                    <input
                      type="date"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleChange}
                      min={formData.pickup_date || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-luxury-textSecondary mb-1.5">
                      Return Time *
                    </label>
                    <input
                      type="time"
                      name="return_time"
                      value={formData.return_time}
                      onChange={handleChange}
                      required
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: PASSENGERS & VEHICLE ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
                Passenger & Vehicle Preferences
              </h3>
              <p className="text-xs text-luxury-textSecondary">
                Select your group size, luggage count, and preferred vehicle class.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Number of Passengers *
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
                      <option key={num} value={num} className="bg-luxury-card text-luxury-textPrimary">
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Number of Luggage Items *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <select
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleChange}
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map(num => (
                      <option key={num} value={num} className="bg-luxury-card text-luxury-textPrimary">
                        {num} {num === 1 ? 'Luggage Item' : 'Luggage Items'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Preferred Vehicle Class *
              </label>
              <select
                name="vehicle_preference"
                value={formData.vehicle_preference}
                onChange={handleChange}
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-3 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
              >
                {VEHICLE_PREFERENCES.map((v, i) => (
                  <option key={i} value={v} className="bg-luxury-card text-luxury-textPrimary">
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Additional Transportation Requirements / Special Requests
              </label>
              <textarea
                name="special_requests"
                rows="3"
                value={formData.special_requests}
                onChange={handleChange}
                placeholder="e.g. Child safety seat required, quiet executive cabin, meet-and-greet inside terminal, chilled sparkling water, multi-stop pickup..."
                className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: AIRPORT & FLIGHT DETAILS (CONDITIONAL) ================= */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
                Airport & Flight Information
              </h3>
              <p className="text-xs text-luxury-textSecondary">
                Flight tracking allows your chauffeur to adjust for delays or early arrivals automatically.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Select Airport *
              </label>
              <select
                name="airport_code"
                value={formData.airport_code}
                onChange={handleChange}
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-3 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
              >
                {AIRPORTS.map(a => (
                  <option key={a.code} value={a.code} className="bg-luxury-card text-luxury-textPrimary">
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Arrival or Departure *
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
                    Arrival (Airport Pickup)
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
                    Departure (Airport Drop)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Airline Name
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  placeholder="e.g. American Airlines, Delta, United"
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Flight Number
                </label>
                <div className="relative">
                  <Plane className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="flight_number"
                    value={formData.flight_number}
                    onChange={handleChange}
                    placeholder="e.g. AA 2108"
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Flight Date (Optional)
                </label>
                <input
                  type="date"
                  name="flight_date"
                  value={formData.flight_date}
                  onChange={handleChange}
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Flight Scheduled Time (Optional)
                </label>
                <input
                  type="time"
                  name="flight_time"
                  value={formData.flight_time}
                  onChange={handleChange}
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CUSTOMER CONTACT DETAILS ================= */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
                Customer & Contact Details
              </h3>
              <p className="text-xs text-luxury-textSecondary">
                Where should dispatch deliver your personalized quotation and itinerary updates?
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Jonathan Vance"
                required
                className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[44px]"
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
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                  Telephone Number (Direct / Mobile) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (717) 555-0199"
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                Special Requests or Additional Messages for Dispatch
              </label>
              <textarea
                name="customer_notes"
                rows="3"
                value={formData.customer_notes}
                onChange={handleChange}
                placeholder="Any special handling, preferred contact method, gate access instructions, or corporate billing requirements..."
                className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 5: BOOKING SUMMARY & REVIEW ================= */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-textPrimary mb-1">
                Review Your Journey Details
              </h3>
              <p className="text-xs text-luxury-textSecondary">
                Please review your submitted itinerary before sending to dispatch. Click "Edit" on any section to make adjustments.
              </p>
            </div>

            {/* Section 1 Review: Journey */}
            <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-luxury-border/60 pb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Journey & Itinerary
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-luxury-gold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Service Category:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.service_type}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Trip Type:</span>
                  <span className="font-medium text-luxury-textPrimary capitalize">
                    {formData.trip_type === 'round_trip' ? 'Round-Trip' : 'One-Way'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-luxury-textMuted block text-[11px]">Pickup Location:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.pickup_location}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-luxury-textMuted block text-[11px]">Destination:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.dropoff_location}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Pickup Date & Time:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.pickup_date} at {formData.pickup_time}</span>
                </div>
                {formData.trip_type === 'round_trip' && (
                  <div>
                    <span className="text-luxury-textMuted block text-[11px]">Return Schedule:</span>
                    <span className="font-medium text-luxury-textPrimary">{formData.return_date} at {formData.return_time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2 Review: Passengers & Vehicle */}
            <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-luxury-border/60 pb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" /> Vehicle & Passengers
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[11px] text-luxury-gold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Preferred Vehicle:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.vehicle_preference}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Capacity Requested:</span>
                  <span className="font-medium text-luxury-textPrimary">
                    {formData.passengers} Passengers &bull; {formData.luggage} Luggage
                  </span>
                </div>
                {formData.special_requests && (
                  <div className="sm:col-span-2">
                    <span className="text-luxury-textMuted block text-[11px]">Special Requests:</span>
                    <span className="font-medium text-luxury-textSecondary">{formData.special_requests}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3 Review: Airport & Flight (if applicable) */}
            {isAirportService && (
              <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-luxury-border/60 pb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" /> Airport & Flight Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-[11px] text-luxury-gold hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-luxury-textMuted block text-[11px]">Airport:</span>
                    <span className="font-medium text-luxury-textPrimary">{formData.airport_code}</span>
                  </div>
                  <div>
                    <span className="text-luxury-textMuted block text-[11px]">Transfer Type:</span>
                    <span className="font-medium text-luxury-textPrimary capitalize">
                      {formData.flight_type === 'arrival' ? 'Arrival (Pickup)' : 'Departure (Drop)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-luxury-textMuted block text-[11px]">Airline & Flight:</span>
                    <span className="font-medium text-luxury-textPrimary">
                      {formData.airline || '—'} {formData.flight_number ? `(${formData.flight_number})` : ''}
                    </span>
                  </div>
                  {(formData.flight_date || formData.flight_time) && (
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Flight Timing:</span>
                      <span className="font-medium text-luxury-textPrimary">
                        {formData.flight_date} {formData.flight_time}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 4 Review: Customer Contact */}
            <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-luxury-border/60 pb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Contact Details
                </span>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="text-[11px] text-luxury-gold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Client Name:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.full_name}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Telephone:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.phone}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-luxury-textMuted block text-[11px]">Email for Quote:</span>
                  <span className="font-medium text-luxury-textPrimary">{formData.email}</span>
                </div>
                {formData.customer_notes && (
                  <div className="sm:col-span-2">
                    <span className="text-luxury-textMuted block text-[11px]">Customer Notes:</span>
                    <span className="font-medium text-luxury-textSecondary">{formData.customer_notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy & Quotation Reassurance Notice */}
            <div className="bg-luxury-elevated/90 border-l-2 border-luxury-gold p-4 rounded-r-xl text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-luxury-textPrimary">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>Complimentary, No-Obligation Quote Request</span>
              </div>
              <p className="text-luxury-textSecondary leading-relaxed">
                By submitting this request, you authorize our dispatch operations to calculate a personalized, all-inclusive quotation based on your itinerary. This is an inquiry request and does not incur any automated fees or credit card charges.
              </p>
            </div>
          </div>
        )}

        {/* ================= NAVIGATION BUTTONS ================= */}
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

          {step < totalSteps ? (
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
              className="tracking-wider text-xs uppercase font-bold px-6"
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
