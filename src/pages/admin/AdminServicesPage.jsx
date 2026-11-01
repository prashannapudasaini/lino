import React, { useState, useEffect } from 'react';
import { Briefcase, Edit, Check, RefreshCw, Eye } from 'lucide-react';
import Button from '../../components/common/Button';
import { getServices, updateService } from '../../services/api';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      const updated = await updateService(editingService.id, {
        title: editingService.title,
        short_description: editingService.short_description,
        full_description: editingService.full_description
      });
      setServices(prev => prev.map(s => s.id === editingService.id ? updated : s));
      setEditingService(null);
    } catch (err) {
      console.error("Failed to update service:", err);
      alert("Error saving service changes");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Service Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Core Transportation Services
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadServices}
          loading={loading}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Services
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-luxury-surface border border-luxury-border rounded-xl p-5 shadow-luxury flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-luxury-gold font-bold uppercase tracking-wider">
                  /{svc.slug}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  Active
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-luxury-textPrimary mb-2">
                {svc.title}
              </h3>

              <p className="text-xs text-luxury-textSecondary leading-relaxed mb-3">
                {svc.short_description}
              </p>

              <div className="bg-luxury-card p-3 rounded-lg text-xs text-luxury-textMuted line-clamp-3">
                {svc.full_description}
              </div>
            </div>

            <div className="pt-2 border-t border-luxury-border/60 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingService(svc)}
                className="text-xs"
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit Service Text
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-luxury-surface border border-luxury-border rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl text-luxury-textPrimary">
              Edit Service: {editingService.title}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                  Short Summary
                </label>
                <textarea
                  rows="2"
                  value={editingService.short_description}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-luxury-textSecondary uppercase tracking-wider mb-1">
                  Full Service Description
                </label>
                <textarea
                  rows="4"
                  value={editingService.full_description}
                  onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })}
                  required
                  className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setEditingService(null)}>
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

export default AdminServicesPage;

