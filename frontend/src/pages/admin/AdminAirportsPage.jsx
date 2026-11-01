import React, { useState, useEffect } from 'react';
import { Plane, MapPin, RefreshCw, Edit } from 'lucide-react';
import Button from '../../components/common/Button';
import { getAirports } from '../../services/api';

const AdminAirportsPage = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAirports = async () => {
    setLoading(true);
    try {
      const data = await getAirports();
      setAirports(data);
    } catch (err) {
      console.error("Failed to load airports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAirports();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Airport Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Confirmed Airport Hubs & Terminals
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadAirports}
          loading={loading}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Airports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airports.map((airport) => (
          <div
            key={airport.id}
            className="bg-luxury-surface border border-luxury-border rounded-xl p-5 shadow-luxury space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-luxury-gold tracking-wider">
                {airport.code}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-luxury-card border border-luxury-border text-emerald-400">
                Confirmed
              </span>
            </div>

            <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary">
              {airport.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-luxury-gold/80">
              <MapPin className="w-3.5 h-3.5" />
              <span>{airport.city}, {airport.state}</span>
            </div>

            <p className="text-xs text-luxury-textSecondary leading-relaxed">
              {airport.description}
            </p>

            <div className="bg-luxury-card p-3 rounded-lg text-xs text-luxury-textMuted border border-luxury-border/60">
              <strong className="text-luxury-textPrimary block mb-0.5">Terminal Protocol:</strong>
              {airport.terminal_info}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAirportsPage;
