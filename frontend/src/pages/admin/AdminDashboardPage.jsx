import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, Clock, CheckCircle2, Send, 
  Car, MessageSquare, ArrowRight, Eye, RefreshCw
} from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import BookingDetailModal from '../../components/admin/BookingDetailModal';
import { getDashboardStats, getBookings } from '../../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, bookingsData] = await Promise.all([
        getDashboardStats(),
        getBookings({ limit: 6 })
      ]);
      setStats(statsData);
      setRecentBookings(bookingsData);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Dispatch Center Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Operations & Booking Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadDashboardData}
            loading={loading}
            className="text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Live Data
          </Button>
          <Link to="/admin/bookings">
            <Button variant="primary" size="sm" className="text-xs">
              View All Enquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* Live Calculated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Enquiries"
          value={stats?.total_enquiries ?? 0}
          subtitle="All-time recorded"
          icon={CalendarCheck}
          color="gold"
        />
        <StatCard
          title="New Enquiries"
          value={stats?.new_enquiries ?? 0}
          subtitle="Pending initial review"
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Under Review"
          value={stats?.reviewing ?? 0}
          subtitle="Dispatch calculating"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Quotes Sent"
          value={stats?.quotes_sent ?? 0}
          subtitle="Awaiting client acceptance"
          icon={Send}
          color="purple"
        />
        <StatCard
          title="Confirmed Rides"
          value={stats?.confirmed ?? 0}
          subtitle="Officially scheduled"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Enquiries Table / Card View */}
        <div className="lg:col-span-8 bg-luxury-surface border border-luxury-border rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-luxury-textPrimary">
                Recent Booking Enquiries
              </h2>
              <span className="text-xs text-luxury-textSecondary">
                Latest customer quotation submissions
              </span>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs text-luxury-gold hover:underline flex items-center gap-1 font-medium"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="text-center py-12 text-xs text-luxury-textMuted bg-luxury-card/50 rounded-xl border border-luxury-border">
              No booking enquiries recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="p-4 rounded-xl bg-luxury-card border border-luxury-border/80 hover:border-luxury-gold/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-luxury-gold">
                        {booking.reference_code}
                      </span>
                      <Badge variant={booking.status} size="xs">
                        {booking.status}
                      </Badge>
                      <span className="text-[11px] text-luxury-textMuted">
                        {booking.service_type}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-luxury-textPrimary">
                      {booking.full_name} &bull; <span className="font-normal text-luxury-textSecondary">{booking.phone}</span>
                    </div>

                    <div className="text-[11px] text-luxury-textMuted line-clamp-1">
                      {booking.pickup_location} &rarr; {booking.dropoff_location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-luxury-border/50">
                    <div className="text-left sm:text-right text-[11px] text-luxury-textSecondary">
                      <div className="font-medium text-luxury-textPrimary">{booking.pickup_date}</div>
                      <div>{booking.pickup_time}</div>
                    </div>

                    <button
                      type="button"
                      className="p-2 rounded-lg bg-luxury-elevated text-luxury-textSecondary group-hover:text-luxury-gold transition-colors"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Operations Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-lg text-luxury-textPrimary">
              Fleet & Content Metrics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-luxury-card border border-luxury-border">
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-textSecondary">Active Fleet Vehicles:</span>
                </div>
                <span className="font-bold text-luxury-textPrimary">{stats?.total_vehicles ?? 4}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-luxury-card border border-luxury-border">
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-textSecondary">Core Services:</span>
                </div>
                <span className="font-bold text-luxury-textPrimary">{stats?.total_services ?? 4}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-luxury-card border border-luxury-border">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-textSecondary">Contact Messages:</span>
                </div>
                <span className="font-bold text-luxury-textPrimary">
                  {stats?.total_messages ?? 0}
                  {stats?.unread_messages ? ` (${stats.unread_messages} unread)` : ''}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/admin/fleet" className="block w-full">
                <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                  Manage Fleet Inventory
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-luxury-card border border-luxury-border rounded-2xl p-5 text-xs text-luxury-textSecondary space-y-2">
            <strong className="text-luxury-textPrimary block font-semibold">Standard Operating Procedures:</strong>
            <p className="leading-relaxed text-luxury-textMuted">
              When an enquiry arrives with status "New", open the record, verify route feasibility, and update to "Reviewing" or "Quote Sent" with the client's calculated quote.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={() => {
            setSelectedBooking(null);
            loadDashboardData();
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
