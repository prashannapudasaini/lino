import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, Trash2, Calendar, 
  MapPin, Phone, Mail, RefreshCw, AlertCircle
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import BookingDetailModal from '../../components/admin/BookingDetailModal';
import { getBookings, deleteBooking } from '../../services/api';

const STATUS_FILTERS = [
  "All",
  "New",
  "Reviewing",
  "Quote Sent",
  "Awaiting Response",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rejected"
];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter && statusFilter !== "All") params.status = statusFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const data = await getBookings(params);
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBookings();
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to permanently remove this booking enquiry record?")) {
      try {
        await deleteBooking(id);
        setBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete booking.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Dispatch Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Booking & Quotation Enquiries
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadBookings}
          loading={loading}
          className="text-xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Enquiries
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-luxury-surface border border-luxury-border rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-luxury">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-luxury-textMuted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, phone, reference, or address..."
            className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold min-h-[40px]"
          />
        </form>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-luxury-textMuted whitespace-nowrap hidden sm:inline">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
          >
            {STATUS_FILTERS.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Booking List Container */}
      {bookings.length === 0 ? (
        <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-12 text-center text-xs text-luxury-textMuted shadow-luxury">
          No booking enquiries match your selected filters.
        </div>
      ) : (
        <>
          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden lg:block bg-luxury-surface border border-luxury-border rounded-2xl overflow-hidden shadow-luxury">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-luxury-card/80 border-b border-luxury-border text-luxury-textSecondary uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Ref Code</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service & Route</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border/60">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className="hover:bg-luxury-card/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-luxury-gold group-hover:underline">
                        {booking.reference_code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-luxury-textPrimary">{booking.full_name}</div>
                      <div className="text-luxury-textMuted text-[11px]">{booking.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-luxury-textPrimary">{booking.service_type}</div>
                      <div className="text-[11px] text-luxury-textMuted truncate">
                        {booking.pickup_location} &rarr; {booking.dropoff_location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-luxury-textPrimary font-medium">{booking.pickup_date}</div>
                      <div className="text-[11px] text-luxury-textMuted">{booking.pickup_time}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={booking.status} size="xs">
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                          }}
                          className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-luxury-gold transition-colors"
                          title="Open Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(booking.id, e)}
                          className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-red-400 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Responsive Stacked Card View (Flawless UX on phones) */}
          <div className="lg:hidden space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="bg-luxury-surface border border-luxury-border rounded-xl p-4 shadow-luxury hover:border-luxury-gold/40 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-luxury-border/60">
                  <span className="font-mono font-bold text-xs text-luxury-gold">
                    {booking.reference_code}
                  </span>
                  <Badge variant={booking.status} size="xs">
                    {booking.status}
                  </Badge>
                </div>

                <div className="text-xs">
                  <div className="font-semibold text-luxury-textPrimary text-sm">
                    {booking.full_name}
                  </div>
                  <div className="text-luxury-textSecondary text-[11px]">
                    {booking.phone} &bull; {booking.email}
                  </div>
                </div>

                <div className="text-xs bg-luxury-card p-2.5 rounded-lg space-y-1">
                  <div className="font-medium text-luxury-gold">
                    {booking.service_type}
                  </div>
                  <div className="text-luxury-textMuted text-[11px]">
                    From: {booking.pickup_location}
                  </div>
                  <div className="text-luxury-textMuted text-[11px]">
                    To: {booking.dropoff_location}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-luxury-textSecondary">
                    {booking.pickup_date} at {booking.pickup_time}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="px-2.5 py-1 rounded bg-luxury-elevated text-luxury-gold text-xs font-semibold"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(booking.id, e)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Detail & Dispatch Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={() => {
            setSelectedBooking(null);
            loadBookings();
          }}
        />
      )}
    </div>
  );
};

export default AdminBookingsPage;
