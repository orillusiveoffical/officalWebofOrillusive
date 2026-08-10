import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, Loader2, AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (tab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMsg('Successfully logged in!');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    } else {
      const res = await register(name, email, password);
      if (res.success) {
        setSuccessMsg('Account created & logged in!');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.error || 'Failed to create account');
      }
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto my-auto rounded-3xl border border-black/10 bg-white text-[#111111] p-6 sm:p-8 shadow-2xl z-10 font-sans"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">
                {tab === 'login' ? 'Welcome Back' : 'Create Studio Account'}
              </h3>
              <p className="text-xs text-[#555555] mt-0.5">
                Save & manage your discovery call bookings.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close authentication modal"
              className="p-2 rounded-full border border-black/10 text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5] transition-all"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-full bg-[#F7F7F5] p-1 border border-black/5 text-xs font-bold mb-6">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(null); }}
              className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                tab === 'login' ? 'bg-[#111111] text-white shadow-xs' : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('register'); setErrorMsg(null); }}
              className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                tab === 'register' ? 'bg-[#111111] text-white shadow-xs' : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 flex items-center space-x-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center space-x-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {tab === 'register' && (
              <div>
                <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 size-4 text-[#888888]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 size-4 text-[#888888]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 size-4 text-[#888888]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 focus:border-[#4F6B85] focus:ring-2 focus:ring-[#4F6B85]/20 focus:outline-none text-xs text-[#111111] placeholder:text-[#999999] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 rounded-md text-[#888888] hover:text-[#111111] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {tab === 'register' && (
                <p className="text-[10px] text-[#777777] mt-1">
                  Min 8 chars &bull; Must include A-Z, a-z, 0-9, & special symbol (@$!%*?&#)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-sheen group w-full min-h-12 py-3 bg-[#111111] text-[#F7F7F5] font-bold text-xs rounded-full hover:bg-[#2C1E16] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-wider shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#4F6B85] focus-visible:outline-none mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{tab === 'login' ? 'Sign In to Account' : 'Create Account'}</span>
                  <ArrowRight className="size-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
