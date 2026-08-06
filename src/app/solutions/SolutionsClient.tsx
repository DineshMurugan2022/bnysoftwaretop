"use client";

import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { ChevronRight, ShoppingCart, ShirtIcon, Smartphone, PillIcon, CheckCircle2, ChevronDown, Dumbbell, Scissors, Globe, Gem, LayoutDashboard } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const solutions = [
  {
    id: "supermarkets",
    title: "Supermarkets & Grocery",
    desc: "Manage thousands of SKUs, handle high volume checkouts efficiently, and automate restocking.",
    features: [
      { title: "Batch & Expiry tracking", desc: "Automated alerts for near-expiry items and FEFO (First Expired First Out) stock rotation." },
      { title: "Fast checkout POS", desc: "Optimized for speed with barcode scanning, scale integration, and offline mode capabilities." },
      { title: "Weighing scale integration", desc: "Direct communication with deli and produce scales to reduce manual entry errors." },
      { title: "Vendor management", desc: "Automated PO generation based on predictive par levels and AI forecasting." }
    ],
    icon: <ShoppingCart className="w-6 h-6" />,
    imageBg: "from-blue-500/20 to-cyan-500/5"
  },
  {
    id: "fashion",
    title: "Fashion & Apparel",
    desc: "Handle complex variants, sizes, colors, and seasonal inventory across multiple stores.",
    features: [
      { title: "Size & Color matrix", desc: "Intuitive grid interface for creating and managing product variants effortlessly." },
      { title: "Loyalty programs", desc: "Points-based reward systems, tier levels, and targeted SMS/email marketing." },
      { title: "Omnichannel syncing", desc: "Real-time stock synchronization between your physical stores and Shopify/WooCommerce." },
      { title: "Store transfers", desc: "Seamless stock transferring between branches with transit tracking." }
    ],
    icon: <ShirtIcon className="w-6 h-6" />,
    imageBg: "from-purple-500/20 to-pink-500/5"
  },
  {
    id: "pharmacy",
    title: "Pharmacy & Healthcare",
    desc: "Ensure compliance, batch tracking, expiry management, and prescription handling.",
    features: [
      { title: "FDA Compliance", desc: "Built-in regulatory reporting and compliance checks for controlled substances." },
      { title: "Substitute medicines", desc: "Smart recommendations for generic alternatives during billing." },
      { title: "Refrigeration alerts", desc: "Integration with IoT temperature sensors for cold-chain medications." },
      { title: "Supplier integration", desc: "Direct API connections with major pharmaceutical distributors." }
    ],
    icon: <PillIcon className="w-6 h-6" />,
    imageBg: "from-emerald-500/20 to-teal-500/5"
  },
  {
    id: "electronics",
    title: "Electronics & Appliances",
    desc: "Track serial numbers, manage warranties, and handle after-sales service requests.",
    features: [
      { title: "IMEI/Serial tracking", desc: "Trace every individual unit from receiving to point-of-sale and return." },
      { title: "Warranty management", desc: "Digital warranty cards and automated tracking of coverage periods." },
      { title: "Repair ticketing", desc: "Built-in service center module to track customer repairs and spare parts." },
      { title: "Bundle pricing", desc: "Create dynamic combos (e.g. Phone + Case + Insurance) with special pricing." }
    ],
    icon: <Smartphone className="w-6 h-6" />,
    imageBg: "from-amber-500/20 to-orange-500/5"
  },
  {
    id: "fitness",
    title: "Fitness & Wellness",
    desc: "Streamline gym operations, membership management, and client engagement with an all-in-one fitness platform.",
    features: [
      { title: "Membership management", desc: "Handle recurring memberships, trial passes, freeze requests, and automated renewal reminders." },
      { title: "Class & trainer scheduling", desc: "Drag-and-drop scheduling for group classes, personal training sessions, and facility bookings." },
      { title: "Attendance & access control", desc: "Biometric or QR-code check-in integrated with turnstile access and real-time occupancy tracking." },
      { title: "Progress tracking", desc: "Member dashboards with body metrics, workout history, and personalized goal tracking." }
    ],
    icon: <Dumbbell className="w-6 h-6" />,
    imageBg: "from-rose-500/20 to-red-500/5"
  },
  {
    id: "beauty",
    title: "Beauty & Salon",
    desc: "Manage appointments, stylist schedules, product inventory, and client preferences seamlessly.",
    features: [
      { title: "Online appointment booking", desc: "Clients book services, choose stylists, and receive automated SMS/email confirmations and reminders." },
      { title: "Stylist commission tracking", desc: "Automatic commission calculations based on services rendered, product sales, and tips." },
      { title: "Client profile & history", desc: "Detailed records of past services, product preferences, allergies, and style notes per client." },
      { title: "Retail product inventory", desc: "Track salon product stock, set reorder alerts, and manage supplier purchase orders." }
    ],
    icon: <Scissors className="w-6 h-6" />,
    imageBg: "from-pink-500/20 to-fuchsia-500/5"
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    desc: "Build and scale your online storefront with powerful catalog, order, and fulfillment management tools.",
    features: [
      { title: "Multi-channel selling", desc: "Unified dashboard to manage inventory and orders across your website, Amazon, Flipkart, and social commerce." },
      { title: "Cart & checkout optimization", desc: "One-click checkout, abandoned cart recovery emails, and dynamic discount code engine." },
      { title: "Shipping & logistics", desc: "Integrated shipping rate calculators, label printing, and real-time tracking across multiple couriers." },
      { title: "Analytics & conversion tracking", desc: "Funnel analysis, heatmaps, and A/B testing tools to optimize product pages and boost conversions." }
    ],
    icon: <Globe className="w-6 h-6" />,
    imageBg: "from-indigo-500/20 to-violet-500/5"
  },
  {
    id: "jewels",
    title: "Jewellery & Precious Metals",
    desc: "Manage intricate catalogs with karat, weight, and gemstone details alongside dynamic gold-rate pricing.",
    features: [
      { title: "Live gold/silver rate pricing", desc: "Automatically update product prices based on real-time precious metal market rates." },
      { title: "Karat & weight management", desc: "Detailed tracking of purity (22K, 18K, etc.), gross weight, net weight, and stone weight per item." },
      { title: "Custom order & design tracking", desc: "Manage bespoke jewelry orders from sketch approval through production to delivery." },
      { title: "Hallmarking & certification", desc: "Track BIS hallmark numbers, GIA certificates, and maintain compliance documentation." }
    ],
    icon: <Gem className="w-6 h-6" />,
    imageBg: "from-yellow-500/20 to-amber-500/5"
  },
  {
    id: "erp-crm",
    title: "ERP & CRM",
    desc: "Unify your entire business — from finance and HR to sales pipelines and customer relationships — in one platform.",
    features: [
      { title: "Financial management", desc: "General ledger, accounts payable/receivable, multi-currency support, and automated reconciliation." },
      { title: "Sales pipeline & lead scoring", desc: "Visual Kanban pipelines, AI-powered lead scoring, and automated follow-up sequences." },
      { title: "HR & payroll", desc: "Employee lifecycle management, attendance tracking, leave approvals, and payroll processing." },
      { title: "Custom dashboards & reports", desc: "Drag-and-drop report builder with role-based dashboards and scheduled email reports." }
    ],
    icon: <LayoutDashboard className="w-6 h-6" />,
    imageBg: "from-sky-500/20 to-blue-500/5"
  },
];

function Accordion({ feature, isOpen, onClick }: { feature: { title: string, desc: string, icon?: React.ReactNode }, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-surface-2 transition-colors hover:border-white/20">
      <button 
        className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-5 h-5 transition-colors ${isOpen ? 'text-brand-accent' : 'text-foreground/50'}`} />
          <span className="font-semibold text-foreground">{feature.title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-foreground/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pt-1 pl-13 text-foreground/70 text-sm leading-relaxed border-t border-white/5 mx-5 mt-2 pt-4">
              {feature.desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SolutionsClient() {
  const [activeTab, setActiveTab] = useState(solutions[0].id);
  const activeSolution = solutions.find(s => s.id === activeTab) || solutions[0];
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(current => {
        const currentIndex = solutions.findIndex(s => s.id === current);
        const nextIndex = (currentIndex + 1) % solutions.length;
        return solutions[nextIndex].id;
      });
      setOpenAccordion(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [resetKey]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-background z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Tailored <span className="text-brand-accent">Solutions</span>
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            Whether you&apos;re looking to optimize supply chains, enhance customer experiences, or secure your infrastructure, we have the expertise to make it happen.
          </Reveal>
        </div>
      </section>

      {/* Split Tabbed Layout Section */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Sidebar Tabs */}
            <div className="lg:w-1/3 flex flex-col gap-2">
              <div className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-4 px-4">Select Industry</div>
              {solutions.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => {
                    setActiveTab(sol.id);
                    setOpenAccordion(0);
                    setResetKey(k => k + 1); // Reset the 5s timer from this tab
                  }}
                  className={`relative w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 flex items-center gap-4 group ${
                    activeTab === sol.id ? 'bg-surface border border-white/10 shadow-lg' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {activeTab === sol.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-accent rounded-r-full"
                    />
                  )}
                  <div className={`p-2 rounded-xl transition-colors ${activeTab === sol.id ? 'bg-brand-accent/20 text-brand-accent' : 'bg-surface-2 text-foreground/50 group-hover:text-foreground'}`}>
                    {sol.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg transition-colors ${activeTab === sol.id ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground'}`}>
                      {sol.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:w-2/3 min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-surface rounded-3xl border border-white/5 overflow-hidden flex flex-col shadow-2xl h-full"
                >
                  {/* Decorative Banner */}
                  <div className={`h-40 w-full bg-gradient-to-br ${activeSolution.imageBg} relative overflow-hidden flex items-center px-10`}>
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                     <div className="relative z-10 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-brand-accent shadow-xl">
                        {React.cloneElement(activeSolution.icon as React.ReactElement<{ size?: number }>, { size: 40 })}
                     </div>
                  </div>
                  
                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{activeSolution.title} Platform</h2>
                    <p className="text-foreground/70 text-lg mb-10 leading-relaxed max-w-2xl">
                      {activeSolution.desc}
                    </p>
                    
                    <h3 className="font-semibold text-foreground/50 uppercase tracking-widest text-sm mb-6">Deep Dive Capabilities</h3>
                    
                    <div className="space-y-4 mb-10 flex-1">
                      {activeSolution.features.map((feature, idx) => (
                        <Accordion 
                          key={idx} 
                          feature={feature} 
                          isOpen={openAccordion === idx} 
                          onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                        />
                      ))}
                    </div>
                    
                    <div className="pt-8 border-t border-white/10 mt-auto">
                      <Link href="/request-demo" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-brand-accent text-black font-bold rounded-xl hover:bg-brand-accent/90 transition-all shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]">
                        See {activeSolution.title} in Action <ChevronRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="pb-24">
        <Reveal as="div" intensity="subtle" className="container mx-auto px-4 max-w-4xl">
            <div className="glass-border rounded-3xl p-12 text-center relative overflow-hidden hover:border-brand-accent/20 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 via-transparent to-brand-accent/5 pointer-events-none"></div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4 relative z-10">Don&apos;t see your industry?</h2>
              <p className="text-foreground/70 mb-8 max-w-xl mx-auto relative z-10">
                Our platform is highly customizable. Talk to our experts to learn how we can adapt our software to your specific business model.
              </p>
              <Link href="/contact" className="relative z-10 inline-flex h-12 items-center justify-center bg-white text-black px-8 rounded-lg font-bold hover:bg-brand-accent transition-colors shadow-lg">
                Contact Our Experts
              </Link>
            </div>
        </Reveal>
      </section>
    </div>
  );
}
