"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Box, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    video: "/hero-videos/CRM_web_app_product_demo_202607291524.mp4",
    title: "Retail Store",
    thumb: "/crm-preview-v2.png",
  },
  {
    id: 2,
    video: "/hero-videos/RC_car_website_walkthrough_1080p_202607291526.mp4",
    title: "Logistics",
    thumb: "/marque-preview.png",
  },
  {
    id: 3,
    video: "/hero-videos/Luxury_spa_website_walkthrough_1080p_202607291528.mp4",
    title: "POS System",
    thumb: "/salon-preview.jpg",
  }
];

const SLIDE_DURATION = 10000; // 10 seconds

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const reqRef = useRef<number>(0);
  const isTransitioning = useRef(false);

  const nextSlide = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => { isTransitioning.current = false; }, 1000);
  };

  const prevSlide = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => { isTransitioning.current = false; }, 1000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning.current || activeSlide === index) return;
    isTransitioning.current = true;
    setActiveSlide(index);
    setTimeout(() => { isTransitioning.current = false; }, 1000);
  };

  useEffect(() => {
    setProgress(0);
    progressRef.current = 0;
    
    const startProgress = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = time - lastTimeRef.current;
        progressRef.current += (delta / SLIDE_DURATION) * 100;
        
        if (progressRef.current >= 100) {
          progressRef.current = 0;
          nextSlide();
        } else {
          setProgress(progressRef.current);
        }
      }
      lastTimeRef.current = time;
      reqRef.current = requestAnimationFrame(startProgress);
    };

    reqRef.current = requestAnimationFrame((time) => {
      lastTimeRef.current = time;
      startProgress(time);
    });

    return () => {
      cancelAnimationFrame(reqRef.current);
      lastTimeRef.current = 0;
    };
  }, [activeSlide]);

  return (
    <div className="relative h-[100vh] w-full flex flex-col overflow-hidden bg-black selection:bg-brand-accent selection:text-black">
      {/* Background Videos */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0 origin-center"
        >
          <video
            src={(SLIDES[activeSlide] || SLIDES[0]).video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main Content */}
      <section className="relative flex-1 flex flex-col items-start justify-start px-6 md:px-10 lg:px-16 z-20 pt-24 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start text-left max-w-[650px] space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full glass-border px-5 py-2 text-xs font-semibold text-white/90 uppercase tracking-[0.25em] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-white/5 border border-white/10">
            AI-POWERED ENTERPRISE SOFTWARE
          </div>
          
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display italic font-bold tracking-tight text-white leading-[1.2]">
            Smarter Solutions.<br/>
            <span className="bg-gradient-to-r from-brand-accent to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(163,230,53,0.3)]">Stronger Retail.</span>
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 max-w-[550px] leading-relaxed font-bold">
            Simplify operations, optimize inventory, and accelerate growth with an intelligent retail management platform.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Link href="/products" className="group relative inline-flex h-11 items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-brand-accent/90 shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] hover:-translate-y-1 w-full sm:w-auto">
              <Box className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Explore Products
            </Link>
          
            <Link href="/request-demo" className="group relative inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white px-6 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Contact Sales <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-6 md:px-12">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md bg-transparent hover:bg-white/5 hover:border-white/40 hover:scale-105 transition-all pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-14 h-14 rounded-full border border-white flex items-center justify-center text-white backdrop-blur-md bg-transparent hover:bg-white/10 hover:scale-105 transition-all pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
