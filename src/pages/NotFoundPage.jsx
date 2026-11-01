import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, FileText } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 bg-luxury-bg">
      <div className="max-w-md mx-auto px-4 text-center">
        <span className="font-mono text-6xl sm:text-7xl font-bold text-luxury-gold block mb-4">
          404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-luxury-textPrimary mb-4">
          Destination Not Found
        </h1>

        <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed mb-8">
          The requested luxury chauffeur page or route does not exist. Please navigate back to our homepage or request a ride.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
          <Link to="/quote">
            <Button variant="secondary" size="md">
              <FileText className="w-4 h-4 mr-2 text-luxury-gold" /> Request a Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

