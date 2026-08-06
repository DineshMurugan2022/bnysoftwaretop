"use client";
import Link from 'next/link';


export default function Footer() {


  return (
    <footer suppressHydrationWarning className="overflow-hidden text-white bg-[#050505] border-neutral-800 border-t pt-24 mt-auto">
      <style>{`
        .tech-illustration .data-flow {
          stroke-dasharray: 4;
          animation: data-dash 1s linear infinite;
        }
        .tech-illustration .laser-scan {
          animation: laser 1.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 4px rgba(163, 230, 53, 0.8));
        }
        @keyframes data-dash {
          to { stroke-dashoffset: -8; }
        }
        @keyframes laser {
          0% { transform: translateY(-8px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
      `}</style>


      {/* Links Grid */}
      <div className="border-t border-neutral-900 grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side: Navigation Links */}
        <div className="p-8 md:p-16 grid grid-cols-2 gap-12 border-r border-neutral-900">
          <div className="flex flex-col gap-6">
            <Link href="/about" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">About Us</Link>
            <Link href="/resources" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Resources</Link>
            <Link href="/support" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Support</Link>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="/contact" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Contact Us</Link>
            <a href="#" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Twitter/X</a>
            <a href="#" className="text-xs font-medium text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Facebook</a>
          </div>
        </div>

        {/* Right Side: Wireframe Illustration */}
        <div className="lg:h-auto lg:border-t-0 flex overflow-hidden w-full h-48 border-neutral-900 border-t relative items-center justify-center">
          <svg viewBox="0 0 400 120" className="opacity-30 max-h-[160px] w-[756px] h-[160px] tech-illustration"
            preserveAspectRatio="xMidYMid meet" strokeWidth="2"
            style={{ width: "756px", height: "160px", color: "rgb(255, 255, 255)" }}>
            
            {/* POS Screen Wireframe */}
            <rect x="70" y="25" width="100" height="70" rx="4" stroke="white" strokeWidth="1" fill="none" />
            <rect x="80" y="35" width="80" height="12" rx="2" stroke="white" strokeWidth="1" fill="none" />
            <rect x="80" y="55" width="35" height="8" stroke="white" strokeWidth="1" fill="none" />
            <rect x="125" y="55" width="35" height="8" stroke="white" strokeWidth="1" fill="none" />
            <rect x="80" y="70" width="80" height="15" rx="2" fill="#a3e635" opacity="0.8" />
            
            {/* POS Stand */}
            <path d="M 110 95 L 130 95 L 135 110 L 105 110 Z" stroke="white" strokeWidth="1" fill="none" />
            
            {/* Connection Line */}
            <path d="M 185 60 L 225 60" stroke="white" strokeWidth="1" className="data-flow" />
            <circle cx="205" cy="60" r="3" fill="#a3e635" className="animate-pulse" />

            {/* Receipt Wireframe */}
            <path d="M 240 20 L 300 20 L 300 95 L 292 90 L 285 95 L 277 90 L 270 95 L 262 90 L 255 95 L 247 90 L 240 95 Z" stroke="white" strokeWidth="1" fill="none" />
            <rect x="250" y="35" width="40" height="3" fill="white" opacity="0.6" />
            <rect x="250" y="45" width="25" height="2" fill="white" opacity="0.4" />
            <rect x="282" y="45" width="8" height="2" fill="white" opacity="0.4" />
            <rect x="250" y="52" width="30" height="2" fill="white" opacity="0.4" />
            <rect x="285" y="52" width="5" height="2" fill="white" opacity="0.4" />
            
            {/* Barcode on receipt */}
            <g transform="translate(250, 65)">
              <rect x="0" y="0" width="2" height="12" fill="white" />
              <rect x="3" y="0" width="3" height="12" fill="white" />
              <rect x="8" y="0" width="1" height="12" fill="white" />
              <rect x="11" y="0" width="2" height="12" fill="white" />
              <rect x="15" y="0" width="2" height="12" fill="white" />
              <rect x="18" y="0" width="4" height="12" fill="white" />
              <rect x="24" y="0" width="1" height="12" fill="white" />
              <rect x="27" y="0" width="3" height="12" fill="white" />
              <rect x="32" y="0" width="2" height="12" fill="white" />
              <rect x="35" y="0" width="1" height="12" fill="white" />
              <rect x="38" y="0" width="2" height="12" fill="white" />
            </g>
            
            {/* Scanning Laser */}
            <line x1="240" y1="71" x2="300" y2="71" stroke="#a3e635" strokeWidth="1" className="laser-scan" />
            
          </svg>
        </div>

        {/* Copyright Row */}
        <div className="lg:col-span-2 border-t border-neutral-900 px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-neutral-600 font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <span>2026 All rights reserved</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-text-primary/70">Available for projects</span>
            </div>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of use</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
