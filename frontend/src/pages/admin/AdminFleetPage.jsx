import React, { useState, useEffect } from 'react';
import { Car, Users, Briefcase, Eye, EyeOff, Edit, Plus, Check, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';
import { getAllFleetAdmin, updateFleetVehicle } from '../../services/api';

const AdminFleetPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const loadFleet = async () => {
    setLoading(true);
    try {
      const data = await getAllFleetAdmin();
      setVehicles(data);
    } catch (err) {
      console.error("Failed to load fleet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFleet();
  }, []);

  const handleToggleVisibility = async (vehicle) => {
    try {
      const updated = await updateFleetVehicle(vehicle.id, {
        is_visible: !vehicle.is_visible
      });
      setVehicles(prev => prev.map(v => v.id === vehicle.id ? updated : v));
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
      alert("Error updating vehicle visibility");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingVehicle) return;
    try {
      const updated = await updateFleetVehicle(editingVehicle.id, {
        name: editingVehicle.name,
        category: editingVehicle.category,
        subtitle: editingVehicle.subtitle,
        passenger_capacity: parseInt(editingVehicle.passenger_capacity),
        luggage_capacity: parseInt(editingVehicle.luggage_capacity),
        hourly_rate_estimate: editingVehicle.hourly_rate_estimate,
        description: editingVehicle.description
      });
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? updated : v));
      setEditingVehicle(null);
    } catch (err) {
      console.error("Failed to save vehicle edit:", err);
      alert("Error saving vehicle changes");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Inventory Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Executive Fleet Management
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadFleet}
          loading={loading}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Fleet
        </Button>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className={`bg-luxury-surface border rounded-xl overflow-hidden shadow-luxury flex flex-col justify-between transition-all ${
              v.is_visible ? 'border-luxury-border' : 'border-red-900/40 opacity-70'
            }`}
          >
            <div>
              <div className="relative h-44 w-full bg-luxury-card">
                <img
                  src={v.image_url}
                  alt={v.name}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-luxury-bg/90 text-[10px] uppercase font-bold text-luxury-gold border border-luxury-border">
                  {v.category}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleVisibility(v)}
                  className={`absolute top-2 right-2 p-1.5 rounded-lg border text-xs flex items-center gap-1 backdrop-blur-md ${
                    v.is_visible
                      ? 'bg-emerald-950/80 border-emerald-600/50 text-emerald-400'
                      : 'bg-red-950/80 border-red-600/50 text-red-400'
                  }`}
                  title={v.is_visible ? "Live on public website" : "Hidden from public website"}
                >
                  {v.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{v.is_visible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary">
                  {v.name}
                </h3>
                <p className="text-xs text-luxury-gold/80 font-medium">
                  {v.subtitle}
                </p>
                <p className="text-xs text-luxury-textSecondary line-clamp-2">
                  {v.description}
                </p>

                <div className="flex items-center gap-4 py-2 border-y border-luxury-border/60 text-xs text-luxury-textSecondary">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{v.passenger_capacity} Pass</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{v.luggage_capacity} Bags</span>
                  </div>
                </div>

                <div className="text-[11px] text-luxury-textMuted pt-1">
                  Est: <strong className="text-luxury-textPrimary">{v.hourly_rate_estimate || 'Custom Quote'}</strong>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingVehicle(v)}
                className="w-full justify-center text-xs"
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit Vehicle
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-luxury-surface border border-luxury-border rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl text-luxury-textPrimary">
              Edit Vehicle: {editingVehicle.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  value={editingVehicle.name}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingVehicle.category}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value })}
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                    Rate Estimate Label
                  </label>
                  <input
                    type="text"
                    value={editingVehicle.hourly_rate_estimate || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, hourly_rate_estimate: e.target.value })}
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                    Passenger Capacity
                  </label>
                  <input
                    type="number"
                    value={editingVehicle.passenger_capacity}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, passenger_capacity: e.target.value })}
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                    Luggage Capacity
                  </label>
                  <input
                    type="number"
                    value={editingVehicle.luggage_capacity}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, luggage_capacity: e.target.value })}
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editingVehicle.description || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setEditingVehicle(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFleetPage;
