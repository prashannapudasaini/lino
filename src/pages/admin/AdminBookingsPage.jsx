import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, Trash2, Calendar, 
  MapPin, Phone, Mail, RefreshCw, AlertCircle, X, Car
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import BookingDetailModal from '../../components/admin/BookingDetailModal';
import { getBookings, deleteBooking } from '../../services/api';

const STATUS_FILTERS = [
  "All",
  "New Request",
  "Under Review",
  "Quote Sent",
  "Awaiting Customer Response",
  "Confirmed",
  "Completed",
  "Cancelled"
];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter && statusFilter !== "All") params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const data = await getBookings(params);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [statusFilter, dateFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBookings();
  };

  const handleClearFilters = () => {
    setStatusFilter("All");
    setDateFilter("");
    setSearchTerm("");
    setTimeout(() => loadBookings(), 0);
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    const target = bookings.find(b => b.id === id);
    const ref = target ? target.reference_code : id;
    if (window.confirm(`Are you sure you want to permanently delete booking enquiry ${ref}?`)) {
      try {
        await deleteBooking(id);
        setBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete booking.");
      }
    }
  };

  const handleBookingUpdated = (updated) => {
    setBookings(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    setSelectedBooking(updated);
  };

  const handleBookingDeleted = (deletedId) => {
    setBookings(prev => prev.filter(b => b.id !== deletedId));
    setSelectedBooking(null);
  };

  const hasActiveFilters = statusFilter !== "All" || Boolean(dateFilter) || Boolean(searchTerm);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Dispatch Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Booking & Quote Requests
          </h1>
          <p className="text-xs text-luxury-textSecondary mt-1">
            Review customer journey itineraries, calculate quotations, and manage reservations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-luxury-card border border-luxury-border text-xs text-luxury-textSecondary hover:text-luxury-textPrimary transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={loadBookings}
            loading={loading}
            className="text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh List
          </Button>
        </div>
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

        {/* Date Filter & Status Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-luxury-textMuted whitespace-nowrap hidden sm:inline">
              Date:
            </span>
            <div className="relative">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[40px]"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
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
      </div>

      {/* Booking List Container */}
      {bookings.length === 0 ? (
        <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-12 text-center text-xs text-luxury-textMuted shadow-luxury">
          {hasActiveFilters ? "No booking requests match your search or filter criteria." : "No booking enquiries in dispatch log."}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-luxury-surface border border-luxury-border rounded-2xl overflow-hidden shadow-luxury">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-luxury-card/80 border-b border-luxury-border text-luxury-textSecondary uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Ref Code</th>
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Pickup Location</th>
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4">Travel Date</th>
                  <th className="py-3.5 px-4">Vehicle Preference</th>
                  <th className="py-3.5 px-4">Submission Date</th>
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
                    <td className="py-3.5 px-4 max-w-[160px]">
                      <div className="text-luxury-textPrimary font-medium truncate" title={booking.pickup_location}>
                        {booking.pickup_location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[160px]">
                      <div className="text-luxury-textPrimary font-medium truncate" title={booking.dropoff_location}>
                        {booking.dropoff_location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-luxury-textPrimary font-medium">{booking.pickup_date}</div>
                      <div className="text-[11px] text-luxury-textMuted">{booking.pickup_time}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[140px]">
                      <div className="text-luxury-gold font-medium truncate" title={booking.vehicle_preference}>
                        {booking.vehicle_preference || 'Executive Sedan'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-luxury-textSecondary text-[11px]">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant={booking.status} size="xs">
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                          }}
                          className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-luxury-gold transition-colors"
                          title="View Complete Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(booking.id, e)}
                          className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-red-400 transition-colors"
                          title="Delete Request"
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

          {/* Mobile & Tablet Responsive Stacked Card View */}
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
                  <div className="font-medium text-luxury-gold flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 shrink-0" />
                    <span>{booking.vehicle_preference || booking.service_type}</span>
                  </div>
                  <div className="text-luxury-textMuted text-[11px] truncate">
                    <strong>Pickup:</strong> {booking.pickup_location}
                  </div>
                  <div className="text-luxury-textMuted text-[11px] truncate">
                    <strong>Destination:</strong> {booking.dropoff_location}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-luxury-textSecondary">
                    <strong>Travel:</strong> {booking.pickup_date} at {booking.pickup_time}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-luxury-gold transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(booking.id, e)}
                      className="p-1.5 rounded-lg bg-luxury-elevated text-luxury-textSecondary hover:text-red-400 transition-colors"
                      title="Delete Record"
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

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={handleBookingUpdated}
          onDeleted={handleBookingDeleted}
        />
      )}
    </div>
  );
};

export default AdminBookingsPage;
