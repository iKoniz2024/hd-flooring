'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const whatsappNumber = '14160000000';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20HD%20Flooring%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20flooring%20installation.`;

  return (
    <div className="fixed left-4 bottom-8 z-50 pointer-events-auto group flex items-center gap-3">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3.5 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center border border-emerald-400/40 hover:bg-emerald-500 transition-colors duration-300"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping -z-10" />
        <MessageCircle className="w-6 h-6 fill-current text-white" />
      </motion.a>

      <span className="hidden sm:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-slate-900/90 text-slate-100 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-500/20 backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap">
        Chat with Flooring Expert 💬
      </span>
    </div>
  );
}
