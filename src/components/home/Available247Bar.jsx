import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const Available247Bar = () => {
  return (
    <section className="bg-[#0B0B0C] border-y border-[#1E1E22] py-5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A46D] shrink-0">
              <Calendar className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-semibold text-white text-sm sm:text-base mr-2">
                Available 24/7
              </span>
              <span className="text-xs sm:text-sm text-[#A7A5A0]">
                Schedule your premium ride anytime you need.
              </span>
            </div>
          </div>

          <Link
            to="/book-now"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-luxury-gold shrink-0"
          >
            <span>Book Available</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Available247Bar;

