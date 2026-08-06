"use client";

import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import Link from "next/link";
import { ArrowRight, Activity, Terminal, Code2, Users, Anchor } from "lucide-react";
import { products } from "@/lib/data/products";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";



export default function ProductsClient() {
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.product-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // If section is roughly in the middle of the screen
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveProduct(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen relative">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-background/0 z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal as="h1" intensity="subtle" className="text-5xl md:text-6xl font-display font-extrabold text-foreground mb-6">
            Our <span className="text-brand-accent">Products</span>
          </Reveal>
          <Reveal as="p" intensity="subtle" delay={0.1} className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
            Discover our suite of intelligent retail software solutions designed for massive scale and ultimate performance.
          </Reveal>
        </div>
      </section>

      {/* Sticky Sub-navigation */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-y border-white/5 py-4 hidden md:block">
        <div className="container mx-auto px-4 flex justify-center gap-8">
          {products.map((p, i) => (
            <a 
              key={i} 
              href={`#product-${i}`} 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${activeProduct === i ? 'text-brand-accent' : 'text-foreground/50 hover:text-foreground'}`}
            >
              {p.title}
            </a>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="pb-32 pt-12 relative z-10">
        <div className="container mx-auto px-4">
          <RevealGroup stagger={0.1} className="space-y-32">
            {products.map((product, idx) => (
              <div key={idx} id={`product-${idx}`} className="scroll-mt-32">
                <Reveal 
                  as="div"
                  intensity="subtle"
                  className={`product-section flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 pt-8`}
                >
                {/* Visual Side: Interactive Mockup */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden glass-border p-2 bg-surface/50 group transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    {/* Product Image */}
                    <div className="w-full h-full relative z-10 rounded-xl overflow-hidden">
                      <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-brand-accent/10 text-brand-accent mb-2 border border-brand-accent/20">
                    {product.icon}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                    {product.title}
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed">
                    {product.desc}
                  </p>
                  
                  <ul className="space-y-4 pt-2">
                    {product.benefits.map((feature, i) => (
                      <li key={i} className="flex items-start text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-4 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(163,230,53,0.8)]"></div>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8 flex flex-wrap gap-4">
                      <Link href={`/contact?product=${encodeURIComponent(product.title)}`} className="group inline-flex items-center h-14 px-8 rounded-xl bg-white text-black font-bold hover:bg-brand-accent hover:text-black transition-all duration-300 shadow-xl">
                        Request a Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`} className="group inline-flex items-center h-14 px-8 rounded-xl bg-surface-2 border border-white/10 text-foreground font-bold hover:bg-white/5 hover:border-brand-accent/50 transition-all duration-300 shadow-lg">
                        View Product
                      </Link>
                  </div>
                </div>
                </Reveal>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}
