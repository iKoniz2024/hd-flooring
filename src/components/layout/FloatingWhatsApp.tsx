'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const whatsappNumber = '13068808404';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20HD%20Flooring%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20flooring%20installation.`;

  return (
    <div className="fixed right-4 bottom-36 z-50 pointer-events-auto group flex flex-row-reverse items-center gap-2.5">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2.5 bg-white dark:bg-slate-900 rounded-full shadow-lg border-2 border-[#25D366]/40 flex items-center justify-center shrink-0 group/wa transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 opacity-75 animate-ping -z-10" />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-[22px] h-[22px] text-[#25D366] transition-transform duration-300 group-hover/wa:scale-110"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.19 1.86 5.85L2.5 21.5l3.8-1.33A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.95 7.95 0 0 1-4.33-1.27l-.31-.18-3.22 1.13 1.15-3.12-.2-.33A7.96 7.96 0 1 1 12 20z"
            fill="currentColor"
          />
          <path
            d="M16.42 13.91c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"
            fill="currentColor"
          />
        </svg>
      </motion.a>

      <AnimatePresence>
        {!tooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
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

