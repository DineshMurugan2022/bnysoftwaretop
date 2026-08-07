"use client";

import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { Phone, PhoneCall, MessageSquare, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingClient() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-accent/10 via-background to-background z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Simple & Transparent <span className="text-brand-accent">Pricing</span>
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-6">
            Custom tailored solutions to fit your exact business and retail operational requirements.
          </Reveal>
        </div>
      </section>

      {/* Pricing Contact Area */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-surface p-8 md:p-14 text-center shadow-2xl glass-border"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Glowing Icon Badge */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent shadow-[0_0_30px_rgba(163,230,53,0.2)] relative z-10">
              <PhoneCall className="w-10 h-10" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 relative z-10">
              For Pricing, Contact Our Team
            </h2>

            <p className="text-foreground/70 text-lg max-w-lg mx-auto mb-8 leading-relaxed relative z-10">
              Get an instant quote and personalized demonstration tailored to your enterprise needs.
            </p>

            {/* Prominent Phone Display */}
            <div className="inline-flex items-center gap-3 bg-black/60 border border-brand-accent/40 px-8 py-5 rounded-2xl mb-10 shadow-lg relative z-10 hover:border-brand-accent transition-all group">
              <Phone className="w-8 h-8 text-brand-accent group-hover:scale-110 transition-transform" />
              <a
                href="tel:9941070555"
                className="text-3xl md:text-5xl font-mono font-bold tracking-wider text-brand-accent hover:text-white transition-colors"
              >
                9941070555
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 max-w-md mx-auto">
              <a
                href="tel:9941070555"
                className="w-full sm:w-auto flex-1 h-14 bg-brand-accent text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent/90 transition-all shadow-lg hover:shadow-brand-accent/20 text-base"
              >
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>

              <a
                href="https://wa.me/919941070555"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 h-14 bg-white/10 text-white border border-white/15 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/15 transition-all text-base"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                WhatsApp Us
              </a>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10 text-left relative z-10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">Custom Quote</h4>
                  <p className="text-xs text-foreground/60 mt-0.5">Flexible plans customized for your store count and volume.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">Instant Setup</h4>
                  <p className="text-xs text-foreground/60 mt-0.5">Fast onboarding and dedicated technical assistance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">Request Demo</h4>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    Or <Link href="/request-demo" className="text-brand-accent underline">submit a demo request</Link> online.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
