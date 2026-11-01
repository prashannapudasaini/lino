import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Flawless service. Comfortable ride. On time. Everest exceeded my expectations!",
    author: "Sarah M.",
    role: "Corporate Executive",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "The quiet cabin allowed our team to conduct critical preparation before our board meeting. Truly first class.",
    author: "David L.",
    role: "Managing Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "Prompt 4:30 AM airport pickup for my international flight. Immaculate Cadillac Escalade and consummate discretion.",
    author: "Elena R.",
    role: "Frequent Private Aviation Client",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-28 md:py-36 bg-[#0B0B0C] text-white overflow-hidden border-t border-[#1E1E22]">
      {/* Background: Atmospheric Alpine Mountain Peaks at Twilight */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
          alt="Atmospheric misty mountain range at twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.25]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block mb-3">
          TESTIMONIALS
        </span>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-12">
          What Our Clients Say
        </h2>

        {/* Testimonial Card with Author Avatar and Arrow Controls Matching Reference */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev Arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A46D] hover:text-[#C5A46D] flex items-center justify-center text-zinc-400 transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Testimonial Content */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-xl text-center sm:text-left">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C5A46D]/60 shrink-0 shadow-lg">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-white tracking-wide">
                {current.author} &mdash; <span className="text-[#A7A5A0] font-normal">{current.role}</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-zinc-200 italic font-normal leading-relaxed">
                "{current.quote}"
              </p>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A46D] hover:text-[#C5A46D] flex items-center justify-center text-zinc-400 transition-colors shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
