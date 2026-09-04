'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const whatsappNumber = '13068808404';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20HD%20Flooring%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20flooring%20installation.`;

  return (
    <div className="fixed left-4 bottom-8 z-50 pointer-events-auto group flex items-center gap-2.5">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3.5 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center border border-emerald-400/40 hover:bg-emerald-500 transition-colors duration-300 shrink-0"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping -z-10" />
        <MessageCircle className="w-6 h-6 fill-current text-white" />
      </motion.a>

      <AnimatePresence>
        {!tooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="relative flex items-center gap-2 bg-slate-900/95 text-slate-100 text-xs font-medium px-3 py-1.5 rounded-xl border border-emerald-500/30 backdrop-blur-md shadow-xl whitespace-nowrap"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Chat with Flooring Expert 💬
            </a>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setTooltipDismissed(true);
              }}
              className="p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

