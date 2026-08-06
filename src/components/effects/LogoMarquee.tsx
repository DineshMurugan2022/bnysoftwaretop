"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";

const defaultLogos = [
  "Acme Corp", "TechNova", "Globex", "Initech", "Umbrella", 
  "Stark Ind", "Wayne Ent", "Cyberdyne", "Massive Dynamic", "Hooli"
];

export const LogoMarquee = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (row1Ref.current) {
      gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1
      });
    }
    
    if (row2Ref.current) {
      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        { xPercent: 0, duration: 40, ease: "none", repeat: -1 }
      );
    }
  }, []);

  const handleMouseEnter = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) gsap.getTweensOf(ref.current).forEach(t => t.pause());
  };
  
  const handleMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) gsap.getTweensOf(ref.current).forEach(t => t.play());
  };

  return (
    <section className="py-20 border-y border-white/5 bg-surface relative overflow-hidden flex flex-col items-center justify-center">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/70 shadow-sm backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span>Trusted by Innovative Teams</span>
        </div>
      </div>
      
      <div className="w-full relative max-w-[100vw]" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        {/* Row 1 - scrolling left */}
        <div 
          className="flex whitespace-nowrap mb-8 w-max"
          onMouseEnter={() => handleMouseEnter(row1Ref)}
          onMouseLeave={() => handleMouseLeave(row1Ref)}
        >
          <div ref={row1Ref} className="flex items-center gap-16 md:gap-24 pl-16 md:pl-24">
            {[...defaultLogos, ...defaultLogos].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center group cursor-pointer">
                <span className="text-3xl md:text-5xl font-display font-extrabold text-white/20 group-hover:text-white transition-colors duration-500 tracking-tight">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolling right */}
        <div 
          className="flex whitespace-nowrap w-max"
          onMouseEnter={() => handleMouseEnter(row2Ref)}
          onMouseLeave={() => handleMouseLeave(row2Ref)}
        >
          <div ref={row2Ref} className="flex items-center gap-16 md:gap-24 pl-16 md:pl-24">
            {[...[...defaultLogos].reverse(), ...[...defaultLogos].reverse()].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center group cursor-pointer">
                <span className="text-3xl md:text-5xl font-display font-extrabold text-white/20 group-hover:text-white transition-colors duration-500 tracking-tight">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
