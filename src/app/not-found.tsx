import Link from "next/link";
import { Receipt, ArrowLeft } from "lucide-react";
import { Scanline } from "@/components/effects/Scanline";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-20 relative overflow-hidden">
      <Scanline />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-surface-2 border border-border rounded-xl shadow-2xl relative z-10 overflow-hidden flex flex-col">
        {/* Receipt Header (Zigzag cut simulation) */}
        <div className="h-4 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+')] rotate-180 absolute top-[-2px] left-0"></div>

        <div className="p-8 pt-12 flex-grow flex flex-col items-center text-center font-mono">
          <div className="w-16 h-16 bg-amber-accent/10 rounded-full flex items-center justify-center mb-6 border border-amber-accent/20">
            <Receipt className="w-8 h-8 text-amber-accent" />
          </div>
          
          <div className="text-amber-accent font-bold tracking-widest text-sm mb-2 uppercase">Error // 404</div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-4 uppercase">Transaction Void</h1>
          
          <div className="w-full border-t border-dashed border-border my-6 relative">
            <div className="absolute -left-10 -top-3 w-6 h-6 bg-background rounded-full"></div>
            <div className="absolute -right-10 -top-3 w-6 h-6 bg-background rounded-full"></div>
          </div>
          
          <p className="text-foreground/70 text-sm mb-8 font-sans">
            The page you requested could not be found. It may have been voided, moved, or never existed in our ledger.
          </p>

          <Link href="/" className="w-full h-11 bg-brand-accent text-black font-sans font-semibold rounded-md hover:bg-brand-accent/90 transition-colors flex items-center justify-center group shadow-soft hover:shadow-hover">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to Homepage
          </Link>
        </div>

        {/* Receipt Footer (Zigzag cut simulation) */}
        <div className="h-4 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+')] absolute bottom-[-2px] left-0"></div>
      </div>
    </div>
  );
}
