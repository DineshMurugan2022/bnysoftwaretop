"use client";

import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { industries as baseIndustries } from "@/lib/data/industries";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Extract unique categories dynamically from the data
const categories = ["All", ...Array.from(new Set(baseIndustries.map(ind => ind.category)))];

export default function IndustriesClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredIndustries = activeCategory === "All" 
    ? baseIndustries 
    : baseIndustries.filter(ind => ind.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-accent/10 via-background to-background z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Industries We <span className="text-brand-accent">Serve</span>
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            From boutique apparel to massive supermarket chains, our ecosystem adapts to your specific vertical seamlessly.
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-surface/50 border border-white/5 rounded-2xl max-w-fit mx-auto backdrop-blur-md shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat ? 'text-black' : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-brand-accent rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="pb-32 relative z-10 min-h-[600px]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((ind, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  key={ind.title} 
                  className="w-full aspect-[4/3] group relative bg-surface border border-stroke rounded-3xl overflow-hidden text-foreground flex flex-col justify-end"
                >
                  {/* Background Image & Halftone */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={ind.img || '/og.jpg'}
                      alt={ind.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div 
                      className="absolute inset-0 opacity-40 mix-blend-multiply" 
                      style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Hover Backdrop */}
                    <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-500 z-10 flex flex-col justify-center items-center text-center p-8">
                       <h3 className="text-2xl font-display font-bold italic mb-4">{ind.title}</h3>
                       <p className="text-muted text-sm mb-6">{ind.desc}</p>
                       <Link href={`/solutions?industry=${encodeURIComponent(ind.title)}`} className="inline-flex items-center text-brand-accent font-semibold group-hover:text-brand-accent/80 transition-colors">
                         Explore Solution <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                  </div>

                  {/* Initial Label */}
                  <div className="absolute top-6 left-6 z-20 w-12 h-12 glass-border rounded-xl flex items-center justify-center bg-surface-2 text-text-primary shadow-sm group-hover:opacity-0 transition-opacity duration-300">
                    {React.cloneElement(ind.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                  </div>
                  
                  {/* Hover Pill Label */}
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium border-accent-gradient shadow-lg">
                      {ind.category}
                    </div>
                  </div>
                  
                  {/* Bottom Text Area (fades out on hover) */}
                  <div className="relative z-10 p-6 pt-20 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-wider font-bold text-white max-w-fit mb-3">
                      {ind.category}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{ind.title}</h2>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredIndustries.length === 0 && (
             <div className="text-center py-20 text-foreground/50">
                No industries found for this category.
             </div>
          )}
        </div>
      </section>
    </div>
  );
}
