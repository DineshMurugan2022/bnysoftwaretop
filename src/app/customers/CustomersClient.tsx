"use client";

import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const customers = [
  {
    name: "FreshMart",
    industry: "Supermarkets",
    logo: "/images/logos/freshmart.png",
    challenge: "Frequent stockouts and high spoilage rates due to manual inventory tracking.",
    solution: "Implemented B&Y ERP with real-time inventory and predictive ordering.",
    result: "45% increase in inventory turnover and 30% reduction in spoilage.",
    roi: "3.2x",
    timeframe: "6 months"
  },
  {
    name: "StyleHub",
    industry: "Fashion & Apparel",
    logo: "/images/logos/stylehub.png",
    challenge: "Disconnected online and offline systems leading to poor customer experience.",
    solution: "Unified Omnichannel POS and CRM integration.",
    result: "2x omnichannel revenue and a 40% increase in customer loyalty program engagement.",
    roi: "4.5x",
    timeframe: "12 months"
  },
  {
    name: "City Pharmacy",
    industry: "Healthcare",
    logo: "/images/logos/citypharmacy.png",
    challenge: "Struggled with compliance and tracking near-expiry medications across 20 branches.",
    solution: "Pharmacy-specific module with automated batch tracking and alerts.",
    result: "Zero compliance violations in 2 years and 90% reduction in expired stock losses.",
    roi: "2.8x",
    timeframe: "8 months"
  },
  {
    name: "ElectroWorld",
    industry: "Electronics",
    logo: "/images/logos/electroworld.png",
    challenge: "Inefficient warranty management and repair ticketing system.",
    solution: "Custom CRM with serial number tracking and integrated ticketing.",
    result: "Customer satisfaction score (CSAT) improved from 3.2 to 4.8 out of 5.",
    roi: "5.1x",
    timeframe: "4 months"
  }
];

const testimonials = [
  {
    quote: "B&Y Technology completely transformed our retail operations. We scaled from 10 to 50 stores seamlessly without any downtime.",
    author: "Sarah Jenkins",
    role: "CTO, National Retail Group",
    metricValue: 300,
    metricSuffix: "%",
    metricText: "ROI in the first 6 months"
  },
  {
    quote: "The unified inventory system saved us countless hours of manual counting. We now have 100% visibility across our entire supply chain.",
    author: "Michael Chen",
    role: "VP Operations, StyleHub",
    metricValue: 40,
    metricSuffix: "hrs",
    metricText: "Saved per week on admin tasks"
  },
  {
    quote: "Compliance used to keep me up at night. Since switching to B&Y, audits are a breeze and our stock loss is virtually zero.",
    author: "Dr. Emily Rostova",
    role: "Director, City Pharmacy",
    metricValue: 90,
    metricSuffix: "%",
    metricText: "Reduction in stock loss"
  }
];

const LOGOS = ["Acme Corp", "GlobalTech", "RetailGiant", "MegaStore", "PharmaPlus", "ElectroMart", "StyleIcon", "FreshFoods"];

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.round(v))
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function CustomersClient() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto advance carousel
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Customer <span className="text-brand-accent">Success</span> Stories
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            See how businesses of all sizes use our platform to drive growth, increase efficiency, and delight their customers.
          </Reveal>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="pb-20 relative z-10 overflow-hidden">
        <div className="flex whitespace-nowrap opacity-50">
          <div className="animate-scroll-left inline-flex items-center gap-16 px-8">
            {LOGOS.map((logo, i) => (
              <span key={i} className="text-3xl font-display font-bold text-foreground/50 uppercase tracking-widest">{logo}</span>
            ))}
          </div>
          <div className="animate-scroll-left inline-flex items-center gap-16 px-8">
            {LOGOS.map((logo, i) => (
              <span key={i + LOGOS.length} className="text-3xl font-display font-bold text-foreground/50 uppercase tracking-widest">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal as="div" intensity="subtle" className="glass-border rounded-3xl p-10 md:p-16 max-w-6xl mx-auto bg-brand-accent/5 border-brand-accent/30 relative overflow-hidden group">
            <Quote className="absolute -top-6 -left-6 w-32 h-32 text-brand-accent/10 rotate-180 transition-transform duration-700 group-hover:scale-110" />
            
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-20">
               <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:text-black transition-colors backdrop-blur-md">
                 <ChevronLeft size={20} />
               </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-20">
               <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:text-black transition-colors backdrop-blur-md">
                 <ChevronRight size={20} />
               </button>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center px-8">
              <div className="min-h-[250px] flex flex-col justify-center">
                <div className="flex gap-1 mb-6 text-brand-accent">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="fill-brand-accent w-5 h-5" />)}
                </div>
                
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 leading-tight">
                    &quot;{testimonials[activeTestimonial].quote}&quot;
                  </h3>
                  <div className="font-semibold text-brand-accent text-lg">{testimonials[activeTestimonial].author}</div>
                  <div className="text-foreground/50">{testimonials[activeTestimonial].role}</div>
                </motion.div>
              </div>
              
              <div className="flex justify-center md:justify-end">
                 <motion.div 
                    key={`metric-${activeTestimonial}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-center p-10 glass-border rounded-3xl w-full max-w-sm bg-black/40 border-t border-l border-white/10 shadow-2xl relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-transparent opacity-20"></div>
                    <div className="text-6xl md:text-7xl font-extrabold text-brand-accent mb-4 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                      <AnimatedCounter value={testimonials[activeTestimonial].metricValue} suffix={testimonials[activeTestimonial].metricSuffix} />
                    </div>
                    <div className="text-foreground/80 font-medium text-lg uppercase tracking-wider text-xs">{testimonials[activeTestimonial].metricText}</div>
                 </motion.div>
              </div>
            </div>
            
            {/* Carousel Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
               {testimonials.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setActiveTestimonial(idx)}
                   className={`w-2 h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'w-6 bg-brand-accent' : 'bg-white/20'}`}
                 />
               ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-bold">Deep Dive Case Studies</h2>
          </div>
          <RevealGroup stagger={0.1} className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {customers.map((customer, i) => (
              <Reveal as="div" intensity="subtle" key={i} className="glass-border rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:border-brand-accent/50 transition-all duration-500 bg-surface hover:bg-surface-2">
                <div className="md:w-2/5 bg-black/60 group-hover:bg-brand-accent/10 transition-colors text-foreground flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-6xl font-display font-extrabold text-white group-hover:text-brand-accent transition-colors duration-500 mb-2 relative z-10 drop-shadow-md">
                    <Image src={customer.logo} alt={`${customer.name} logo`} width={80} height={80} className="object-contain" />
                  </div>
                  <div className="text-xs font-bold opacity-50 uppercase tracking-widest text-center relative z-10 group-hover:opacity-100 transition-opacity">{customer.industry}</div>
                </div>
                <div className="md:w-3/5 p-8 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-brand-accent transition-colors">{customer.name}</h2>
                    <div className="text-right">
                      <div className="text-2xl font-black text-brand-accent">{customer.roi}</div>
                      <div className="text-[10px] uppercase tracking-widest text-foreground/50">ROI in {customer.timeframe}</div>
                    </div>
                  </div>
                  <div className="mb-5 border-l-2 border-red-500/30 pl-4">
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-1 block">The Challenge</span>
                    <p className="text-foreground/80 text-sm leading-relaxed">{customer.challenge}</p>
                  </div>
                  <div className="mb-6 border-l-2 border-brand-accent/50 pl-4 flex-grow">
                    <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-1 block">The Result</span>
                    <p className="text-white font-semibold text-sm leading-relaxed">{customer.result}</p>
                  </div>
                  <Link href={`/customers/${customer.name.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center text-sm text-foreground/60 font-semibold group-hover:text-brand-accent transition-colors mt-auto pt-4 border-t border-white/5">
                    Read Full Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
