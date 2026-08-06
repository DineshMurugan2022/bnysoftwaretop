"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-primary-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            
            <Link 
              href="/request-demo"
              className="relative flex items-center gap-3 bg-surface border border-white/10 px-6 py-4 rounded-full shadow-2xl hover:bg-surface-2 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/20 text-brand-accent">
                <MessageSquare size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">Ready to upgrade?</span>
                <span className="text-xs text-foreground/60 flex items-center">
                  Request a Demo 
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight size={12} className="ml-1 text-brand-accent" />
                  </motion.div>
                </span>
              </div>
            </Link>

            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsDismissed(true);
              }}
              className="absolute -top-2 -right-2 bg-surface border border-white/10 rounded-full p-1 text-foreground/50 hover:text-foreground hover:bg-surface-3 transition-colors shadow-lg"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
