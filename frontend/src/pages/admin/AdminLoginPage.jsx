import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@everestlimo.com');
  const [password, setPassword] = useState('EverestLimo2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error("Login failure:", err);
      setError("Invalid executive credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-10 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-gold/50 flex items-center justify-center text-luxury-gold mx-auto mb-4 shadow-luxury-glow">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 20L12 4l9 16H3z" />
              <path d="M8 20l4-7 4 7H8z" fill="currentColor" fillOpacity="0.2" />
            </svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Dispatch Administration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Everest Executive Console
          </h1>
          <p className="text-xs text-luxury-textSecondary mt-1">
            Secure portal for booking management and operations.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-luxury-card border border-luxury-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-luxury-textPrimary focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full justify-center text-xs uppercase tracking-wider font-bold"
            >
              Sign In to Console <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-luxury-border/60 text-center text-[11px] text-luxury-textMuted flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Restricted to Authorized Executive Dispatch Personnel</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
