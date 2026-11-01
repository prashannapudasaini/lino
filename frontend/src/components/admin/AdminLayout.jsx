import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarCheck, Car, Briefcase, 
  Plane, MessageSquare, LogOut, Menu, X, ExternalLink, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Booking Enquiries', path: '/admin/bookings', icon: CalendarCheck },
  { name: 'Fleet Management', path: '/admin/fleet', icon: Car },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Airports', path: '/admin/airports', icon: Plane },
  { name: 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
];

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-textPrimary flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-luxury-surface border-r border-luxury-border p-5 shrink-0 min-h-screen">
        <div className="space-y-6">
          {/* Brand header */}
          <Link to="/admin" className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-luxury-card border border-luxury-gold/50 flex items-center justify-center text-luxury-gold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 20L12 4l9 16H3z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-wider text-luxury-textPrimary block">
                EVEREST ADMIN
              </span>
              <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-medium">
                Dispatch Console
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-colors ${
                    active
                      ? 'bg-luxury-gold text-luxury-bg font-semibold shadow-luxury-gold'
                      : 'text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-luxury-card'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="pt-6 border-t border-luxury-border space-y-3">
          <div className="px-2">
            <span className="text-[10px] uppercase tracking-wider text-luxury-textMuted block">
              Signed in as
            </span>
            <span className="text-xs font-semibold text-luxury-textPrimary truncate block">
              {user?.full_name || user?.email || "Executive Admin"}
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-luxury-card border border-luxury-border text-xs text-luxury-textSecondary hover:text-luxury-gold transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-luxury-surface border-b border-luxury-border p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-luxury-card border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 20L12 4l9 16H3z" />
            </svg>
          </div>
          <span className="font-serif text-sm font-bold text-luxury-textPrimary">
            EVEREST ADMIN
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-luxury-card border border-luxury-border text-luxury-textPrimary min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle admin menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-luxury-gold" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-md">
          <div className="absolute top-0 right-0 bottom-0 w-[80%] max-w-xs bg-luxury-surface p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-luxury-border mb-6">
                <span className="font-serif text-base font-bold text-luxury-textPrimary">
                  Admin Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-luxury-textSecondary hover:text-luxury-textPrimary min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide ${
                        active
                          ? 'bg-luxury-gold text-luxury-bg font-semibold'
                          : 'text-luxury-textSecondary hover:text-luxury-textPrimary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-luxury-border space-y-3">
              <Link
                to="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-luxury-card text-xs text-luxury-textSecondary"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
