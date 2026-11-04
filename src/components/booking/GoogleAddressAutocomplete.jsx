import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Search, Check } from 'lucide-react';

// Verified regional suggestions for Mid-Atlantic hubs
const REGIONAL_SUGGESTIONS = [
  { label: "Harrisburg International Airport (MDT)", address: "Harrisburg International Airport (MDT), 1 Terminal Dr, Middletown, PA 17057", type: "airport" },
  { label: "Philadelphia International Airport (PHL)", address: "Philadelphia International Airport (PHL), 8000 Essington Ave, Philadelphia, PA 19153", type: "airport" },
  { label: "Newark Liberty International Airport (EWR)", address: "Newark Liberty International Airport (EWR), 3 Brewster Rd, Newark, NJ 07114", type: "airport" },
  { label: "John F. Kennedy International Airport (JFK)", address: "John F. Kennedy International Airport (JFK), Queens, NY 11430", type: "airport" },
  { label: "LaGuardia Airport (LGA)", address: "LaGuardia Airport (LGA), Queens, NY 11371", type: "airport" },
  { label: "The Hotel Hershey", address: "The Hotel Hershey, 100 Hotel Rd, Hershey, PA 17033", type: "landmark" },
  { label: "Penn State Health Milton S. Hershey Medical Center", address: "500 University Dr, Hershey, PA 17033", type: "landmark" },
  { label: "Pennsylvania State Capitol Building", address: "501 N 3rd St, Harrisburg, PA 17120", type: "landmark" },
  { label: "Center City Financial District, Philadelphia", address: "Market St & 15th St, Philadelphia, PA 19102", type: "city" },
  { label: "Midtown Manhattan, New York", address: "5th Ave & 50th St, New York, NY 10022", type: "city" },
  { label: "Princeton University Corporate Campus", address: "Princeton, NJ 08544", type: "landmark" },
  { label: "Downtown Washington D.C.", address: "K Street NW & 16th St NW, Washington, DC 20006", type: "city" }
];

const GoogleAddressAutocomplete = ({
  value = '',
  onChange,
  placeholder = 'Enter full street address or location...',
  label = 'Address',
  icon: Icon = MapPin,
  error = null,
  required = false,
  id = 'address-autocomplete'
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Check and initialize Google Maps Places API if key is present
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (window.google?.maps?.places) {
      setGoogleLoaded(true);
      initAutocomplete();
      return;
    }

    if (!apiKey) {
      // No Google Maps key defined; smart fallback is active
      return;
    }

    // Load Google Maps Places script dynamically
    const existingScript = document.getElementById('google-maps-places-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-places-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleLoaded(true);
        initAutocomplete();
      };
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => {
        setGoogleLoaded(true);
        initAutocomplete();
      });
    }

    function initAutocomplete() {
      if (!inputRef.current || !window.google?.maps?.places) return;
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode', 'establishment'],
          componentRestrictions: { country: 'us' }
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place?.formatted_address) {
            onChange(place.formatted_address);
          } else if (place?.name) {
            onChange(place.name);
          }
        });
      } catch (err) {
        console.warn('Google Places initialization notice:', err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    onChange(query);

    // If Google Places is NOT active, provide intelligent regional suggestions
    if (!googleLoaded && query.trim().length > 1) {
      const filtered = REGIONAL_SUGGESTIONS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.address.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestedAddress) => {
    onChange(suggestedAddress);
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
          {label} {required && <span className="text-luxury-gold">*</span>}
        </label>
        {googleLoaded && (
          <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Google Places
          </span>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-gold pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>

        <input
          id={id}
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (!googleLoaded && value.trim().length > 1) {
              const filtered = REGIONAL_SUGGESTIONS.filter(item =>
                item.label.toLowerCase().includes(value.toLowerCase()) ||
                item.address.toLowerCase().includes(value.toLowerCase())
              );
              setSuggestions(filtered);
              setShowSuggestions(filtered.length > 0);
            }
          }}
          onBlur={() => {
            // Delay hide to allow click
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-luxury-surface border text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-luxury-gold ${
            error
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-luxury-border focus:border-luxury-gold hover:border-luxury-borderLight'
          }`}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
          <span>{error}</span>
        </p>
      )}

      {/* Intelligent Regional Autocomplete Dropdown (Active when Google API key not yet configured) */}
      {!googleLoaded && showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-luxury-card border border-luxury-border rounded-xl shadow-2xl overflow-hidden max-h-56 overflow-y-auto divide-y divide-luxury-border/60">
          <div className="px-3 py-1.5 bg-black/40 text-[10px] uppercase tracking-wider text-luxury-gold font-semibold flex items-center justify-between">
            <span>Suggested Locations</span>
            <span className="text-zinc-500 font-normal">Click to select</span>
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={() => handleSelectSuggestion(item.address)}
              className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-white/5 transition-colors flex items-start gap-2.5 group"
            >
              <Navigation className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
              <div className="min-w-0">
                <div className="font-medium text-white truncate">{item.label}</div>
                <div className="text-[11px] text-zinc-400 truncate">{item.address}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleAddressAutocomplete;

