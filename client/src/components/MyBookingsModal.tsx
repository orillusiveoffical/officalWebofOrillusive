import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewInquiry: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose, onOpenNewInquiry }) => {
  const { user, bookings } = useAuth();

  if (!isOpen) return null;

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
          className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto my-auto rounded-3xl border border-black/10 bg-white text-[#111111] p-6 sm:p-8 shadow-2xl z-10 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#111111]">
                My Saved Discovery Calls
              </h3>
              <p className="text-xs text-[#555555] mt-0.5">
                Saved in MongoDB Atlas for <span className="font-semibold text-[#4F6B85]">{user?.email}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bookings modal"
              className="p-2 rounded-full border border-black/10 text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5] transition-all"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          {bookings.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <div className="size-12 rounded-full bg-[#4F6B85]/10 border border-[#4F6B85]/20 flex items-center justify-center mx-auto text-[#4F6B85]">
                <Calendar className="size-6" />
              </div>
              <h4 className="text-lg font-bold text-[#111111]">No Saved Discovery Calls Yet</h4>
              <p className="text-xs text-[#555555] max-w-xs mx-auto leading-relaxed">
                When you submit a Discovery Call request, it will automatically save under your account here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewInquiry();
                }}
                className="px-6 py-2.5 bg-[#111111] text-[#F7F7F5] text-xs font-bold rounded-full hover:bg-[#2C1E16] hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                Book a Discovery Call
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((item) => (
                <div key={item._id} className="p-5 rounded-2xl bg-[#F7F7F5] border border-black/5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#4F6B85] uppercase tracking-wider">
                      {item.service}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      item.status === 'confirmed' 
                        ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                        : item.status === 'reviewed'
                        ? 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                    }`}>
                      <Clock className="size-3" />
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[#333333] leading-relaxed line-clamp-3 bg-white p-3 rounded-xl border border-black/5 font-sans">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#777777] pt-1">
                    <span>Requested by: {item.name}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
