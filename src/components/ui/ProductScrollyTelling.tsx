"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Layers, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ProductScrollyTelling() {
  const container = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  const text3 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      // Show text 1, hide others
      tl.to(text1.current, { opacity: 1, y: 0, duration: 1 })
        .to(".layer-1", { opacity: 1, scale: 1, duration: 1 }, "<")
        .to(text1.current, { opacity: 0, y: -50, duration: 1 }, "+=1")
        
      // Show text 2, layer 2
        .to(text2.current, { opacity: 1, y: 0, duration: 1 })
        .to(".layer-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(text2.current, { opacity: 0, y: -50, duration: 1 }, "+=1")

      // Show text 3, layer 3
        .to(text3.current, { opacity: 1, y: 0, duration: 1 })
        .to(".layer-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(text3.current, { opacity: 0, y: -50, duration: 1 }, "+=1");

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="h-screen w-full bg-background relative overflow-hidden flex items-center">
      
      {/* Left side text */}
      <div className="w-1/2 h-full flex flex-col justify-center px-12 lg:px-24 relative z-20">
        
        <div ref={text1} className="absolute opacity-0 translate-y-10 max-w-md">
          <div className="text-brand-accent mb-4"><Box size={32} /></div>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">Hardware Foundation</h2>
          <p className="text-foreground/70 text-lg">Robust POS terminals built for extreme retail environments. Industrial-grade durability meets sleek, modern design.</p>
        </div>

        <div ref={text2} className="absolute opacity-0 translate-y-10 max-w-md">
          <div className="text-brand-accent mb-4"><Layers size={32} /></div>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">Intelligent Software</h2>
          <p className="text-foreground/70 text-lg">The operating system for your store. Seamlessly handling transactions, inventory routing, and customer loyalty.</p>
        </div>

        <div ref={text3} className="absolute opacity-0 translate-y-10 max-w-md">
          <div className="text-brand-accent mb-4"><Cloud size={32} /></div>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">Cloud Sync Architecture</h2>
          <p className="text-foreground/70 text-lg">Real-time sync across all global nodes. If one terminal goes offline, the network self-heals without data loss.</p>
        </div>

      </div>

      {/* Right side visuals */}
      <div ref={panelRef} className="w-1/2 h-full flex items-center justify-center relative" style={{ perspective: '1000px' }}>
        
        {/* Layer 1: Hardware */}
        <div className="layer-1 opacity-0 absolute w-64 h-64 border border-white/10 bg-surface-2 rounded-2xl shadow-2xl flex items-center justify-center" 
             style={{ transformStyle: 'preserve-3d', transform: 'scale(0.9) rotateX(12deg) rotateY(-15deg)' }}>
          <div className="text-foreground/50 font-mono text-sm absolute bottom-4 right-4">NODE_01</div>
          <Box size={64} className="text-brand-accent/50" />
        </div>

        {/* Layer 2: Software */}
        <div className="layer-2 opacity-0 absolute w-64 h-64 border border-brand-accent/30 bg-surface-2/80 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center z-10" 
             style={{ transformStyle: 'preserve-3d', transform: 'translateY(100px) translateY(-40px) translateZ(40px) rotateX(12deg) rotateY(-15deg)' }}>
          <Layers size={64} className="text-brand-accent" />
        </div>

        {/* Layer 3: Cloud */}
        <div className="layer-3 opacity-0 absolute w-64 h-64 border border-white/20 bg-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center justify-center z-20" 
             style={{ transformStyle: 'preserve-3d', transform: 'translateY(200px) translateY(-80px) translateZ(80px) rotateX(12deg) rotateY(-15deg)' }}>
           <Cloud size={64} className="text-white" />
        </div>

      </div>

    </div>
  );
}
