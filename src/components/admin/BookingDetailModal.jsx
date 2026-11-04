import React, { useState } from 'react';
import { 
  X, Calendar, Clock, MapPin, Users, Briefcase, 
  Plane, User, Phone, Mail, FileText, CheckCircle2, 
  ShieldCheck, AlertCircle, Trash2 
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { updateBookingStatus, deleteBooking } from '../../services/api';

const STATUS_OPTIONS = [
  "New Request",
  "Under Review",
  "Quote Sent",
  "Awaiting Customer Response",
  "Confirmed",
  "Completed",
  "Cancelled"
];

const BookingDetailModal = ({ booking, onClose, onUpdated, onDeleted }) => {
  const [status, setStatus] = useState(booking?.status || 'New Request');
  const [internalNotes, setInternalNotes] = useState(booking?.internal_notes || '');
  const [estimatedQuote, setEstimatedQuote] = useState(booking?.estimated_quote || '');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!booking) return null;

  const handleSave = async () => {
    setLoading(true);
    setSuccessMsg(false);
    try {
      const quoteVal = estimatedQuote ? parseFloat(estimatedQuote) : null;
      const updated = await updateBookingStatus(booking.id, {
        status,
        internal_notes: internalNotes,
        estimated_quote: quoteVal
      });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 2500);
      if (onUpdated) onUpdated(updated);
    } catch (err) {
      console.error("Failed to update booking:", err);
      alert("Error updating booking enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to permanently delete booking enquiry ${booking.reference_code}? This cannot be undone.`)) {
      setDeleteLoading(true);
      try {
        await deleteBooking(booking.id);
        if (onDeleted) onDeleted(booking.id);
        onClose();
      } catch (err) {
        console.error("Failed to delete booking:", err);
        alert("Failed to delete booking record.");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-luxury-surface border border-luxury-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-luxury-border flex items-center justify-between sticky top-0 bg-luxury-surface z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-base font-bold text-luxury-gold">
                {booking.reference_code}
              </span>
              <Badge variant={booking.status}>{booking.status}</Badge>
            </div>
            <span className="text-xs text-luxury-textSecondary">
              Submitted: {new Date(booking.created_at).toLocaleString()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {successMsg && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Status and dispatch notes saved successfully.</span>
            </div>
          )}

          {/* Customer Information */}
          <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
              <User className="w-4 h-4" /> Client Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-luxury-textMuted block text-[11px]">Full Name:</span>
                <span className="font-semibold text-luxury-textPrimary">{booking.full_name}</span>
              </div>
              <div>
                <span className="text-luxury-textMuted block text-[11px]">Telephone:</span>
                <a href={`tel:${booking.phone}`} className="font-semibold text-luxury-gold hover:underline">
                  {booking.phone}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-luxury-textMuted block text-[11px]">Email Address:</span>
                <a href={`mailto:${booking.email}`} className="font-semibold text-luxury-textPrimary hover:underline">
                  {booking.email}
                </a>
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="bg-luxury-card border border-luxury-border rounded-xl p-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Itinerary & Journey Details
            </h4>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-luxury-border/60">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Service Category:</span>
                  <span className="font-semibold text-luxury-textPrimary">{booking.service_type}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Trip Type:</span>
                  <span className="font-semibold uppercase text-luxury-textPrimary">{booking.trip_type}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-luxury-border/60">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Pickup Date & Time:</span>
                  <span className="font-semibold text-luxury-textPrimary">{booking.pickup_date} at {booking.pickup_time}</span>
                </div>
                {booking.return_date && (
                  <div>
                    <span className="text-luxury-textMuted block text-[11px]">Return Date & Time:</span>
                    <span className="font-semibold text-luxury-textPrimary">{booking.return_date} at {booking.return_time}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 pb-2 border-b border-luxury-border/60">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Pickup Address:</span>
                  <span className="font-medium text-luxury-textPrimary">{booking.pickup_location}</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Destination Address:</span>
                  <span className="font-medium text-luxury-textPrimary">{booking.dropoff_location}</span>
                </div>
              </div>

              {/* Passengers & Vehicle */}
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-luxury-border/60">
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Passengers:</span>
                  <span className="font-semibold text-luxury-textPrimary">{booking.passengers} Passengers</span>
                </div>
                <div>
                  <span className="text-luxury-textMuted block text-[11px]">Luggage Bags:</span>
                  <span className="font-semibold text-luxury-textPrimary">{booking.luggage} Bags</span>
                </div>
                <div className="col-span-2">
                  <span className="text-luxury-textMuted block text-[11px]">Preferred Vehicle Class:</span>
                  <span className="font-semibold text-luxury-gold">{booking.vehicle_preference || 'Executive Sedan'}</span>
                </div>
              </div>

              {/* Airport & Flight details if present */}
              {booking.airport_code && (
                <div className="bg-luxury-elevated/80 p-3 rounded-lg space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-luxury-gold flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5" /> Airport Transfer Information
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Airport:</span>
                      <span className="font-semibold text-luxury-textPrimary">{booking.airport_code}</span>
                    </div>
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Transfer Type:</span>
                      <span className="font-semibold text-luxury-textPrimary capitalize">{booking.flight_type || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Airline:</span>
                      <span className="font-semibold text-luxury-textPrimary">{booking.airline || '—'}</span>
                    </div>
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Flight Number:</span>
                      <span className="font-semibold text-luxury-textPrimary">{booking.flight_number || '—'}</span>
                    </div>
                    {booking.flight_date && (
                      <div>
                        <span className="text-luxury-textMuted block text-[11px]">Flight Date:</span>
                        <span className="font-semibold text-luxury-textPrimary">{booking.flight_date}</span>
                      </div>
                    )}
                    {booking.flight_time && (
                      <div>
                        <span className="text-luxury-textMuted block text-[11px]">Flight Time:</span>
                        <span className="font-semibold text-luxury-textPrimary">{booking.flight_time}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Special Requests & Client Notes */}
              {(booking.special_requests || booking.customer_notes) && (
                <div className="space-y-2 pt-2">
                  {booking.special_requests && (
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Special Requests:</span>
                      <p className="p-2.5 rounded-lg bg-luxury-elevated text-xs text-luxury-textSecondary">
                        {booking.special_requests}
                      </p>
                    </div>
                  )}
                  {booking.customer_notes && (
                    <div>
                      <span className="text-luxury-textMuted block text-[11px]">Customer Dispatch Notes:</span>
                      <p className="p-2.5 rounded-lg bg-luxury-elevated text-xs text-luxury-textSecondary">
                        {booking.customer_notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Dispatch Control & Status Management */}
          <div className="bg-luxury-elevated/70 border border-luxury-border rounded-xl p-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-gold flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Dispatch Management & Internal Notes
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-textSecondary mb-1.5 font-medium">
                  Update Request Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt} className="bg-luxury-card text-luxury-textPrimary">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-textSecondary mb-1.5 font-medium">
                  Quoted Fare Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={estimatedQuote || ''}
                  onChange={(e) => setEstimatedQuote(e.target.value)}
                  placeholder="e.g. 350.00"
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-luxury-textSecondary mb-1.5 font-medium">
                Internal Dispatch Notes
              </label>
              <textarea
                rows="3"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Private dispatch notes, assigned chauffeur, toll estimates, client phone call log..."
                className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold placeholder-luxury-textMuted"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-luxury-border flex items-center justify-between gap-3 sticky bottom-0 bg-luxury-surface">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Enquiry
          </button>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={loading}
              className="font-bold"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
