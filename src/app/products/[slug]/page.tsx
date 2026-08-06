import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RetailOS | B & Y Technology",
  description: "Complete omnichannel retail management system.",
};

export default function ProductDetailPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Link href="/products" className="text-brand-accent hover:underline mb-8 inline-block">
        &larr; Back to Products
      </Link>
      <h1 className="text-5xl font-display font-bold mb-6 text-foreground">RetailOS</h1>
      <p className="text-2xl text-foreground/70 mb-12">Complete omnichannel retail management system for enterprise brands.</p>
      
      <div className="glass-border rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Key Features</h2>
        <ul className="space-y-4 text-lg text-foreground/80">
          <li>✨ Real-time inventory syncing across all channels</li>
          <li>✨ AI-powered demand forecasting</li>
          <li>✨ Automated purchase order generation</li>
          <li>✨ Multi-warehouse routing optimization</li>
        </ul>
        
        <div className="mt-12">
          <Link href="/request-demo" className="bg-brand-accent text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-brand-accent/90 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]">
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
