"use client";

import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import Link from "next/link";
import { Check, X, Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePublicPricingPlans } from "@/hooks/queries/usePublicPricingPlans";

const comparisonData = [
  {
    category: "Core Features",
    features: [
      { name: "Locations", starter: "1", pro: "Up to 10", enterprise: "Unlimited" },
      { name: "SKU Limit", starter: "10,000", pro: "100,000", enterprise: "Unlimited" },
      { name: "Users", starter: "3", pro: "15", enterprise: "Unlimited" },
    ]
  },
  {
    category: "Sales Channels",
    features: [
      { name: "Web POS", starter: true, pro: true, enterprise: true },
      { name: "Offline Mode", starter: false, pro: true, enterprise: true },
      { name: "E-commerce Sync", starter: false, pro: true, enterprise: true },
      { name: "Mobile App", starter: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "Support & Services",
    features: [
      { name: "Support Level", starter: "Email only", pro: "24/7 Priority", enterprise: "Dedicated Manager" },
      { name: "Onboarding", starter: "Self-serve", pro: "Guided", enterprise: "Custom Implementation" },
      { name: "Custom SLA", starter: false, pro: false, enterprise: true },
    ]
  }
];

function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
  return (
    <div className="relative group flex items-center">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-white text-black text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-50 text-center pointer-events-none">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
      </div>
    </div>
  );
}

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const { data: plans, isLoading } = usePublicPricingPlans();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-accent/10 via-background to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Simple, Transparent <span className="text-brand-accent">Pricing</span>
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            Choose the plan that best fits your retail operation. No hidden fees, no surprises.
          </Reveal>
          
          {/* Billing Toggle */}
          <Reveal as="div" intensity="subtle" delay={0.2} className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-foreground' : 'text-foreground/50'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-surface-2 border border-white/10 flex items-center px-1 transition-colors hover:border-brand-accent/50"
            >
               <motion.div 
                 className="w-6 h-6 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                 animate={{ x: isAnnual ? 32 : 0 }}
                 transition={{ type: "spring", stiffness: 500, damping: 30 }}
               />
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className={`transition-colors ${isAnnual ? 'text-foreground' : 'text-foreground/50'}`}>Annually</span>
              <span className="bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded text-xs">Save 20%</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-20 relative z-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <RevealGroup stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans?.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-surface-2 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-bold text-foreground mb-3">No Pricing Plans Available</h3>
                <p className="text-foreground/60 max-w-md mx-auto">
                  Our pricing plans are currently being updated. Please check back later or contact our sales team for custom enterprise quotes.
                </p>
                <Link href="/contact" className="inline-block mt-6 px-6 py-3 bg-brand-accent text-black font-bold rounded-xl hover:bg-brand-accent/90 transition-colors">
                  Contact Sales
                </Link>
              </div>
            ) : plans?.map((plan, i) => {
              const price = plan.priceMonthly !== null
                ? (isAnnual ? plan.priceYearly : plan.priceMonthly)
                : "Custom";

              return (
              <Reveal as="div" intensity="subtle" key={i} className={`relative glass-border rounded-3xl p-8 flex flex-col ${plan.isFeatured ? 'border-brand-accent/50 shadow-[0_0_40px_rgba(163,230,53,0.1)] md:-translate-y-4 bg-surface' : 'bg-surface-2 hover:bg-surface'} transition-all duration-300`}>
                {plan.isFeatured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-accent text-black px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6 border-b border-white/5 pb-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{plan.name}</h3>
                  <p className="text-foreground/60 h-10 text-sm leading-relaxed">{plan.slug}</p>
                </div>
                
                <div className="mb-8 relative h-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      <div className="flex items-baseline">
                        {typeof price === "number" && <span className="text-2xl font-bold text-foreground/50 mr-1">₹</span>}
                        <span className="text-5xl font-display font-bold text-foreground">{price}</span>
                        {typeof price === "number" && <span className="text-foreground/50 ml-2 font-medium">/mo</span>}
                      </div>
                      {typeof price === "number" && isAnnual && (
                        <div className="text-xs text-brand-accent font-medium mt-1 tracking-wide">Billed ₹{price * 12} yearly</div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features?.filter(f => f.included).map((feat, j) => (
                    <li key={j} className="flex items-start text-foreground/80 text-sm">
                      <Check className="w-5 h-5 text-brand-accent mr-3 shrink-0" />
                      <span>{feat.featureText}</span>
                    </li>
                  ))}
                  {plan.features?.filter(f => !f.included).map((feat, j) => (
                    <li key={`missing-${j}`} className="flex items-start text-foreground/50 text-sm">
                      <X className="w-5 h-5 mr-3 shrink-0" />
                      <span>{feat.featureText}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-4">
                  {plan.isFeatured ? (
                      <Link href="/request-demo" className="w-full flex justify-center items-center bg-brand-accent text-black px-6 py-4 rounded-xl font-bold hover:bg-brand-accent/90 transition-colors shadow-lg hover:shadow-brand-accent/30">
                        Start Free Trial
                      </Link>
                  ) : (
                    <Link href="/request-demo" className="flex justify-center items-center w-full bg-white/5 text-foreground px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors border border-white/10">
                      Get Started
                    </Link>
                  )}
                </div>
              </Reveal>
            )})}
          </RevealGroup>
          )}
        </div>
      </section>

      {/* Comparison Table Toggle */}
      <section className="pb-32">
        <div className="container mx-auto px-4 max-w-5xl text-center">
           <button 
             onClick={() => setShowComparison(!showComparison)}
             className="inline-flex items-center gap-2 text-foreground/60 hover:text-brand-accent transition-colors font-medium border-b border-transparent hover:border-brand-accent pb-1"
           >
             {showComparison ? 'Hide' : 'Show'} Full Feature Comparison
             <motion.div animate={{ rotate: showComparison ? 180 : 0 }}>
               <ChevronDown className="w-4 h-4" />
             </motion.div>
           </button>

           <AnimatePresence>
             {showComparison && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
                 className="overflow-hidden mt-12"
               >
                 <div className="glass-border rounded-3xl overflow-hidden text-left bg-surface shadow-2xl">
                   {/* Table Header */}
                   <div className="grid grid-cols-4 border-b border-white/10 bg-black/40 p-6 sticky top-0 backdrop-blur-md z-20">
                     <div className="font-bold text-lg">Features</div>
                     <div className="font-bold text-center text-foreground/80">Starter</div>
                     <div className="font-bold text-center text-brand-accent relative">
                       Professional
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] bg-brand-accent text-black px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:block">Recommended</div>
                     </div>
                     <div className="font-bold text-center text-foreground/80">Enterprise</div>
                   </div>
                   
                   {/* Table Body */}
                   <div className="divide-y divide-white/5">
                     {comparisonData.map((section, idx) => (
                       <div key={idx}>
                         <div className="bg-white/5 p-4 text-xs font-bold uppercase tracking-widest text-foreground/50">
                           {section.category}
                         </div>
                         {section.features.map((feature, fIdx) => (
                           <div key={fIdx} className="grid grid-cols-4 p-4 md:p-6 hover:bg-white/5 transition-colors">
                             <div className="text-sm font-medium">{feature.name}</div>
                             
                             <div className="text-center flex justify-center items-center">
                               {typeof feature.starter === "boolean" 
                                 ? (feature.starter ? <Check className="w-5 h-5 text-brand-accent" /> : <X className="w-5 h-5 text-foreground/50" />)
                                 : <span className="text-sm text-foreground/70">{feature.starter}</span>
                               }
                             </div>
                             
                             <div className="text-center flex justify-center items-center">
                               {typeof feature.pro === "boolean" 
                                 ? (feature.pro ? <Check className="w-5 h-5 text-brand-accent" /> : <X className="w-5 h-5 text-foreground/50" />)
                                 : <span className="text-sm text-brand-accent font-semibold">{feature.pro}</span>
                               }
                             </div>
                             
                             <div className="text-center flex justify-center items-center">
                               {typeof feature.enterprise === "boolean" 
                                 ? (feature.enterprise ? <Check className="w-5 h-5 text-brand-accent" /> : <X className="w-5 h-5 text-foreground/50" />)
                                 : <span className="text-sm text-foreground/70">{feature.enterprise}</span>
                               }
                             </div>
                           </div>
                         ))}
                       </div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
// Add ChevronDown to imports if not present, but wait, let me just add it manually by making sure the import is correct.
