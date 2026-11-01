import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LuxuryConciergeChat from './components/chatbot/LuxuryConciergeChat';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import AirportPage from './pages/AirportPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import FleetPage from './pages/FleetPage';
import QuotePage from './pages/QuotePage';
import ContactPage from './pages/ContactPage';
import PrivacyTermsPage from './pages/PrivacyTermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminFleetPage from './pages/admin/AdminFleetPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminAirportsPage from './pages/admin/AdminAirportsPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route for Admin
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-bg flex items-center justify-center text-luxury-gold">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold"></div>
      </div>
    );
  }

  return isAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" replace />;
};

// Public Website Layout
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-luxury-bg text-luxury-textPrimary">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <LuxuryConciergeChat />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/airport-transportation" element={<AirportPage />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyTermsPage />} />
          <Route path="/terms" element={<PrivacyTermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="fleet" element={<AdminFleetPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="airports" element={<AdminAirportsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

