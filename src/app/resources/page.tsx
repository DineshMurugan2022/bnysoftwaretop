import Link from "next/link";
import { BookOpen, FileText, Video, Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description: "Guides, blogs, webinars, and documentation for retail software.",
};

const fallbackResources = [
  { type: "Blog", title: "The Future of Retail: 2026 Trends to Watch", category: "Industry Insights", icon: <FileText /> },
  { type: "Guide", title: "Definitive Guide to Inventory Management", category: "Best Practices", icon: <BookOpen /> },
  { type: "Webinar", title: "Mastering Omnichannel Sales with B&Y", category: "Product Training", icon: <Video /> },
  { type: "Event", title: "RetailTech Summit 2026", category: "Conferences", icon: <Calendar /> },
];

export default async function ResourcesPage() {
  let fetchedPosts = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // Fail fast during build if API is unreachable
    const res = await fetch(`${API_URL}/api/v1/blog-posts`, {
      next: { revalidate: 60 }, // Revalidate every minute
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      fetchedPosts = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  // Filter only PUBLISHED posts if we fetched any
  const publishedPosts = fetchedPosts.filter((post: { id: string; status: string; [key: string]: unknown }) => post.status === "PUBLISHED");

  return (
    <div className="bg-background min-h-screen pt-20 pb-24">
      {/* Header */}
      <div className="bg-surface border-b border-border py-20 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-foreground mb-6 tracking-tight">
            Resources & <span className="text-brand-accent">Insights</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Expert advice, industry trends, and deep dives into making the most of your retail software.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Featured Resource */}
        <div className="glass-border rounded-3xl overflow-hidden mb-16 flex flex-col md:flex-row shadow-[0_0_20px_rgba(163,230,53,0.1)] group">
          <div className="md:w-1/2 p-12 flex flex-col justify-center bg-surface-2 relative">
            <div className="absolute top-0 right-0 p-32 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors duration-700"></div>
            <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-xs font-semibold tracking-wide uppercase mb-6 self-start relative z-10">New eBook</span>
            <h2 className="text-3xl font-bold mb-4 text-foreground relative z-10 font-display">Retail Resilience: Thriving in an Economic Downturn</h2>
            <p className="text-foreground/70 mb-8 relative z-10 text-lg">Learn actionable strategies to cut costs, optimize inventory, and retain customers using data-driven insights.</p>
            <button className="bg-brand-accent text-black px-6 py-3 rounded-lg font-bold hover:bg-brand-accent/90 transition-all self-start shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] flex items-center relative z-10">
              Download Free eBook <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2 bg-surface p-12 flex items-center justify-center border-l border-border/50">
             <div className="w-64 h-80 bg-background border border-border/80 rounded-lg shadow-2xl flex items-center justify-center text-foreground font-bold text-2xl rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
               eBook Cover
             </div>
          </div>
        </div>

        {/* Dynamic Resource Grid */}
        <h3 className="text-2xl font-bold text-foreground mb-8 font-display">Latest Content</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedPosts.length > 0 ? (
            publishedPosts.map((post: { id: string; title?: string; slug?: string; excerpt?: string; publishedAt?: string; [key: string]: unknown }, i: number) => (
              <Link key={post.id || i} href={`/resources/${post.slug || post.id}`} className="glass-border p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:border-brand-accent/50 hover:bg-white/5 transition-all group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 blur-xl"></div>
                <div className="text-brand-accent mb-6 bg-brand-accent/10 border border-brand-accent/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                  <FileText />
                </div>
                <div className="text-xs font-semibold text-brand-accent/80 uppercase tracking-wide mb-3 relative z-10">Blog Post</div>
                <h4 className="text-xl font-bold text-foreground mb-3 flex-grow relative z-10 group-hover:text-brand-accent transition-colors">{post.title}</h4>
                <p className="text-foreground/60 text-sm mb-6 line-clamp-2 relative z-10">{post.excerpt}</p>
                <div className="text-sm text-brand-accent font-medium flex items-center relative z-10">
                  Read article <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))
          ) : (
            fallbackResources.map((res, i) => (
              <Link key={i} href="#" className="glass-border p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:border-brand-accent/50 hover:bg-white/5 transition-all group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 blur-xl"></div>
                <div className="text-brand-accent mb-6 bg-brand-accent/10 border border-brand-accent/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                  {res.icon}
                </div>
                <div className="text-xs font-semibold text-brand-accent/80 uppercase tracking-wide mb-3 relative z-10">{res.category}</div>
                <h4 className="text-xl font-bold text-foreground mb-4 flex-grow relative z-10 group-hover:text-brand-accent transition-colors">{res.title}</h4>
                <div className="text-sm text-brand-accent font-medium flex items-center relative z-10">
                  Read more <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
