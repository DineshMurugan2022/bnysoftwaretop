"use client";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/effects/LogoMarquee";
import { ArrowRight, CheckCircle2, ChevronRight, Cloud, Database, Package, Shield, Star, Store, Users, Zap, Cpu, ScanLine, Receipt, BarChart, X, User, Mail, Building2 } from "lucide-react";
import React, { useRef, MouseEvent, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { products } from "@/lib/data/products";
import { industries } from "@/lib/data/industries";
import { Scanline } from "@/components/effects/Scanline";
import BorderGlow from "@/components/ui/border-glow";

import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Hero />
      <LogoMarquee />
      <ProductsSection />
      <IndustriesSection />
      <WhyChooseUsSection />
      <SuccessStoriesSection />
      <TestimonialsSection />
      <StatsSection />
      <DemoRequestSection />
    </div>
  );
}

// -------------------------------------------------------------
// SECTIONS
// -------------------------------------------------------------

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const reduce = useReducedMotion();
  const isTouch = typeof window !== "undefined" ? matchMedia("(pointer: coarse)").matches : false;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduce || isTouch ? 0 : rotateX,
        rotateY: reduce || isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal as="div" intensity="bold" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Enterprise Product Suite</h2>
          <p className="text-lg text-foreground/70">Everything you need to run your retail business efficiently, unified in one powerful ecosystem.</p>
        </Reveal>
        
        <RevealGroup stagger={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {products.map((product, i) => {
            const spanClass = i % 4 === 0 || i % 4 === 3 ? "md:col-span-7" : "md:col-span-5";
            return (
              <Reveal key={i} as="div" intensity="bold" className={spanClass}>
                <div 
                  className="w-full aspect-[4/3] md:aspect-auto md:h-[320px] group relative bg-surface border border-stroke rounded-3xl overflow-hidden text-foreground cursor-pointer flex flex-col justify-end"
                  onClick={() => ('link' in product && product.link) ? window.open(product.link, '_blank') : undefined}
                >
                  
                  {/* Background Image & Halftone */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={('img' in product && product.img) ? (product.img as string) : '/og.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div 
                      className="absolute inset-0 opacity-20 mix-blend-multiply" 
                      style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
                    ></div>
                    {/* Hover Backdrop */}
                    <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 z-10 flex flex-col justify-center items-center text-center p-8">
                       <h3 className="text-2xl font-display font-bold italic mb-4">{product.title}</h3>
                       <p className="text-muted text-sm">{product.desc}</p>
                    </div>
                  </div>

                  {/* Initial Label */}
                  <div className="absolute top-6 left-6 z-20 w-12 h-12 glass-border rounded-xl flex items-center justify-center text-text-primary shadow-sm group-hover:opacity-0 transition-opacity duration-300">
                    {product.icon}
                  </div>
                  
                  {/* Hover Pill Label */}
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium border-accent-gradient shadow-lg">
                      View — <span className="font-display italic ml-1 font-bold">{product.title}</span>
                    </div>
                  </div>
                  
                  {/* Bottom Text Area (fades out on hover) */}
                  <div className="relative z-10 p-6 bg-gradient-to-t from-black/80 to-transparent pt-20 group-hover:opacity-0 transition-opacity duration-300">
                    <h1 className="text-2xl font-bold text-text-primary">{product.title}</h1>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}



function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof industries)[number] | null>(null);

  // Pseudo-random rotations so they look like a messy deck of cards when stacked
  const rotations = React.useMemo(() => industries.map((_, idx) => ((idx * 7) % 10) - 5), []);

  return (
    <>
      <section className="bg-background relative w-full text-foreground lg:pb-0 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Left Column: Sticky Text */}
          <div className="lg:col-span-1 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center px-4 md:px-12 xl:px-24 py-24 lg:py-0 z-10">
            <Reveal as="div" intensity="bold" className="max-w-xl">
              <h3 className="text-brand-accent font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Tailored Solutions</h3>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6">Tailored for Your Industry</h2>
              <p className="text-xl md:text-2xl font-light text-foreground/70 leading-relaxed">
                &quot;Your technology stack is the foundation of your business. We don&apos;t just build software; we engineer competitive advantages that last.&quot;
              </p>
            </Reveal>
          </div>

          {/* Right Column: Sticky Stacking Cards */}
          <div className="lg:col-span-2 flex flex-col px-4 md:px-12 xl:px-24">
             {/* Desktop Stacking (Pairs) */}
             <div className="hidden lg:block relative pb-[10vh]">
               {Array.from({ length: Math.ceil(industries.length / 2) }).map((_, i) => (
                  <div key={i} className="sticky top-0 h-screen flex items-center justify-center gap-6 xl:gap-10 w-full" style={{ zIndex: i }}>
                    {industries.slice(i * 2, i * 2 + 2).map((ind, j) => {
                       const idx = i * 2 + j;
                       return (
                         <div 
                           key={j} 
                           onClick={() => setSelectedIndustry(ind)}
                           className="group relative flex flex-col w-full max-w-[320px] bg-surface/95 backdrop-blur-md border border-white/10 rounded-3xl p-8 cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-brand-accent/50 transition-colors"
                           style={{ transform: `rotate(${rotations[idx]}deg)` }}
                         >
                           <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                             {React.cloneElement(ind.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
                           </div>
                           <h3 className="text-2xl font-bold mb-3">{ind.title}</h3>
                           <p className="text-foreground/70 mb-8 text-sm xl:text-base">{ind.desc}</p>
                           
                           <div className="mt-auto">
                             <span className="inline-flex items-center text-brand-accent font-semibold group-hover:underline decoration-2 underline-offset-4 transition-all">
                               View <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                             </span>
                           </div>
                         </div>
                       )
                    })}
                  </div>
               ))}
             </div>

             {/* Mobile/Tablet Grid (Normal flow) */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden mt-8">
               {industries.map((ind, i) => (
                 <Reveal key={i} as="div" intensity="bold">
                    <div 
                      onClick={() => setSelectedIndustry(ind)}
                      className="group relative flex flex-col h-full bg-surface border border-white/5 rounded-3xl p-8 cursor-pointer shadow-sm hover:border-brand-accent/30"
                    >
                      <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                        {React.cloneElement(ind.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{ind.title}</h3>
                      <p className="text-foreground/70 mb-6 flex-grow">{ind.desc}</p>
                      
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-brand-accent font-semibold group-hover:underline decoration-2 underline-offset-4 transition-all">
                          View <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                 </Reveal>
               ))}
             </div>
          </div>
          
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndustry(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface glass-border rounded-3xl p-8 md:p-12 max-w-2xl w-full relative shadow-2xl cursor-default border-brand-accent/20"
            >
              <button 
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-foreground/50 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-24 h-24 bg-brand-accent/10 text-brand-accent rounded-3xl flex items-center justify-center mb-8">
                {React.cloneElement(selectedIndustry.icon as React.ReactElement<{ size?: number }>, { size: 48 })}
              </div>
              
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">{selectedIndustry.title}</h3>
              <p className="text-xl text-foreground/70 leading-relaxed mb-10">{selectedIndustry.desc}</p>
              
              <Link href="/industries" className="inline-flex h-14 items-center justify-center px-8 bg-brand-accent text-black font-bold rounded-xl hover:bg-brand-accent/90 transition-colors shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                Explore Solution
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WhyChooseUsSection() {
  const features = [
    { title: "Point of Sale", icon: <Store /> },
    { title: "Inventory Management", icon: <Package /> },
    { title: "Barcode Support", icon: <ScanLine /> },
    { title: "Cloud Synchronization", icon: <Cloud /> },
    { title: "AI Analytics", icon: <Cpu /> },
    { title: "Customer Loyalty", icon: <Star /> },
    { title: "GST Billing", icon: <Receipt /> },
    { title: "Employee Management", icon: <Users /> },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal as="div" intensity="bold" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Powerful Features for Retail</h2>
          <p className="text-foreground/70 text-lg">Built for speed, security, and scale, ensuring your business never stops growing.</p>
        </Reveal>
        
        <RevealGroup stagger={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
           {features.map((f, i) => (
             <Reveal as="div" intensity="bold" key={i} className="h-full">
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="84 79% 57%"
                  backgroundColor="transparent"
                  borderRadius={16}
                  glowRadius={40}
                  glowIntensity={0.8}
                  coneSpread={25}
                  colors={['#a3e635', '#22c55e', '#a3e635']}
                  className="w-full h-full aspect-[4/3] group cursor-pointer"
                >
                  <div className="w-full h-full grid place-content-center p-6 bg-surface/50 hover:bg-surface rounded-2xl overflow-hidden transition-colors relative">

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="text-foreground/50 group-hover:text-brand-accent transition-colors duration-300">
                        {React.cloneElement(f.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, { size: 32, strokeWidth: 1.5 })}
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-foreground text-center">
                        {f.title}
                      </h4>
                    </div>
                  </div>
                </BorderGlow>
             </Reveal>
           ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function SuccessStoriesSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <Reveal as="div" intensity="bold">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Customer Success Stories</h2>
            <p className="text-foreground/70">See how leading retailers transform their business with us.</p>
          </Reveal>
          <Reveal as="div" intensity="bold">
             <Link href="/customers" className="hidden md:inline-flex text-brand-accent font-semibold hover:underline">
               View all stories
             </Link>
          </Reveal>
        </div>
        
        <RevealGroup stagger={0.1} className="flex flex-col gap-4">
          <Reveal as="div" intensity="bold">
            <Link href="/customers" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all group">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stroke relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-text-primary font-bold text-xs group-hover:scale-110 transition-transform">
                    FM
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted font-bold mb-1 uppercase tracking-wider">Supermarkets</div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-amber-accent transition-colors">How FreshMart increased inventory turnover by 45%</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 pb-2 sm:pb-0 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-muted">5 min read</span>
                <span className="w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg transition-colors border-accent-gradient">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </Reveal>
          
          <Reveal as="div" intensity="bold">
            <Link href="/customers" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all group">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stroke relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-text-primary font-bold text-xs group-hover:scale-110 transition-transform">
                    SH
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted font-bold mb-1 uppercase tracking-wider">Fashion & Apparel</div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-amber-accent transition-colors">StyleHub achieves 2x omnichannel revenue</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 pb-2 sm:pb-0 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-muted">4 min read</span>
                <span className="w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg transition-colors border-accent-gradient">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </RevealGroup>
        <div className="mt-8 text-center md:hidden">
          <Link href="/customers" className="inline-flex text-brand-accent font-semibold hover:underline">
            View all stories
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (rowRef.current) {
      gsap.to(rowRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (rowRef.current) gsap.getTweensOf(rowRef.current).forEach(t => t.pause());
  };
  
  const handleMouseLeave = () => {
    if (rowRef.current) gsap.getTweensOf(rowRef.current).forEach(t => t.play());
  };

  const reviews = [
    { name: "Sarah Jenkins", role: "CTO, MegaRetail", text: "The transition to B&Y Technology was flawless. The platform's scalability is exactly what we needed to support our aggressive expansion plans." },
    { name: "David Chen", role: "Owner, City Pharmacy", text: "Compliance and batch tracking used to be a nightmare. Now, it's completely automated. I sleep much better at night." },
    { name: "Amanda Ross", role: "Director of Operations, StyleHub", text: "The real-time analytics have fundamentally changed how we order seasonal inventory. We've minimized dead stock entirely." },
    { name: "Michael Patel", role: "Manager, FreshMarket", text: "With B&Y, our checkout queues are practically non-existent. The POS system is lightning fast and handles offline modes perfectly." },
    { name: "Emily Wong", role: "Founder, Luxe Boutique", text: "Customer loyalty tracking has never been easier. We've seen a 30% increase in returning shoppers since we switched over." }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <Reveal as="div" intensity="bold" className="text-center">
           <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Loved by Retail Leaders</h2>
        </Reveal>
      </div>

      <div className="w-full relative max-w-[100vw]" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        <div 
          className="flex whitespace-nowrap w-max"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={rowRef} className="flex gap-8 pl-8">
            {[...reviews, ...reviews].map((review, i) => (
              <div key={i} className="glass-border bg-surface-2 p-8 rounded-2xl relative shadow-sm hover:-translate-y-1 transition-transform w-[400px] shrink-0 whitespace-normal">
                <div className="flex text-amber-400 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-foreground/70 mb-8 italic text-sm md:text-base">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{review.name}</div>
                    <div className="text-sm text-foreground/60">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number, suffix?: string, prefix?: string, decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(() => {
    if (reduce || !ref.current) {
      if (ref.current) ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        }
      }
    });
  }, { scope: ref });

  return <div ref={ref} className="text-4xl md:text-5xl font-display font-extrabold">{prefix}0{suffix}</div>;
}

function StatsSection() {
  const stats = [
    { label: "Businesses", value: 15, suffix: "+" },
    { label: "Countries", value: 3, suffix: "+" },
    { label: "Transactions Daily", value: 10, suffix: "K+" },
    { label: "Uptime Guarantee", value: 99.9, suffix: "%", decimals: 1 },
  ];
  
  const reduce = useReducedMotion();

  return (
    <section className="py-20 bg-brand-accent/10 text-foreground border-y border-brand-accent/20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4 md:px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <div className="text-brand-accent font-medium text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DemoRequestSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "30px"]);
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const templateParams = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company: data.company,
        phone: "Not provided",
        product: "General Demo Request",
        demo_date: "Not specified",
        demo_time: "Not specified",
        message: "Requested via Homepage Demo Section",
        submitted_at: new Date().toLocaleString(),
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      toast.success("Demo request submitted successfully!");
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send demo request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Reveal as="div" intensity="bold" className="glass-border rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_0_50px_rgba(163,230,53,0.05)] relative">
          <Scanline />
          <div className="lg:w-1/2 bg-surface-2 p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">Ready to see it in action?</h2>
              <p className="text-foreground/80 mb-8 text-lg">
                Schedule a personalized demo with our retail experts and discover how B&Y Technology can transform your business.
              </p>
              <ul className="space-y-4 text-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-accent shrink-0" /> Tailored product walkthrough</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-accent shrink-0" /> Answers to your specific questions</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-accent shrink-0" /> Custom pricing quote</li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 p-8 md:p-12 bg-surface relative z-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-accent/50">
                  <CheckCircle2 className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Request received</h3>
                <p className="text-foreground/80 text-lg">Someone from the team will reach out within one business day to coordinate a time.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 uppercase tracking-wider">
                      <User className="w-3 h-3" /> First Name <span className="text-brand-accent">*</span>
                    </label>
                    <input type="text" name="firstName" className="w-full px-4 py-3 bg-foreground/[0.03] border border-foreground/10 rounded-xl text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all hover:border-foreground/20 disabled:opacity-50" placeholder="John" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 uppercase tracking-wider">
                      <User className="w-3 h-3" /> Last Name <span className="text-brand-accent">*</span>
                    </label>
                    <input type="text" name="lastName" className="w-full px-4 py-3 bg-foreground/[0.03] border border-foreground/10 rounded-xl text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all hover:border-foreground/20 disabled:opacity-50" placeholder="Doe" required disabled={isSubmitting} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 uppercase tracking-wider">
                    <Mail className="w-3 h-3" /> Work Email <span className="text-brand-accent">*</span>
                  </label>
                  <input type="email" name="email" className="w-full px-4 py-3 bg-foreground/[0.03] border border-foreground/10 rounded-xl text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all hover:border-foreground/20 disabled:opacity-50" placeholder="john@company.com" required disabled={isSubmitting} />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/60 uppercase tracking-wider">
                    <Building2 className="w-3 h-3" /> Company Name <span className="text-brand-accent">*</span>
                  </label>
                  <input type="text" name="company" className="w-full px-4 py-3 bg-foreground/[0.03] border border-foreground/10 rounded-xl text-foreground text-sm placeholder:text-foreground/20 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20 transition-all hover:border-foreground/20 disabled:opacity-50" placeholder="Acme Retail" required disabled={isSubmitting} />
                </div>
                <button type="submit" disabled={isSubmitting} data-cursor="hover" className="w-full py-3.5 bg-brand-accent hover:bg-brand-accent/90 text-black font-semibold rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] disabled:opacity-50 mt-2">
                  {isSubmitting ? "Submitting..." : "Request a demo"}
                </button>
                <p className="text-[10px] text-foreground/40 text-center font-mono uppercase tracking-widest mt-4">By submitting, you agree to our Terms.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
