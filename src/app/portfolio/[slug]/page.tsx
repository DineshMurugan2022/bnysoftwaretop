"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PortfolioCaseStudy() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + "/api/v1/portfolio" : "http://localhost:8080/api/v1/portfolio");
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p: any) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
          if (found) {
            setProject(found);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background flex-col text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-foreground/70 mb-8">The case study you are looking for doesn't exist.</p>
        <Link href="/portfolio" className="bg-brand-accent text-black px-6 py-2 rounded-md font-medium hover:bg-brand-accent/90 transition-colors">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "publisher": {
      "@type": "Organization",
      "name": "B & Y Technology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bnytechnologies.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bnytechnologies.com/portfolio/${slug}`
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/portfolio" className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-brand-accent transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 capitalize">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed mb-8">
              {project.summary}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech: string) => (
                <span key={tech} className="px-3 py-1 text-sm font-medium bg-surface text-foreground rounded-full border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          
          {project.problemStatement && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-brand-accent">The Problem</h2>
            <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
              {project.problemStatement}
            </p>
          </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-brand-accent">Our Approach</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {project.description}
            </p>
            
            {project.solutionSummary && (
              <div className="mt-8 bg-surface p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold mb-4">Solution Delivered</h3>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {project.solutionSummary}
                </p>
              </div>
            )}
          </motion.div>

          {(project.quantifiedResults && project.quantifiedResults.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-brand-accent">The Outcome</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {project.quantifiedResults.map((result: string, idx: number) => {
                // Try to extract a big number from the string for the visual treatment
                const match = result.match(/^([^\s]+)\s+(.+)$/);
                if (match) {
                  return (
                    <div key={idx} className="p-6 bg-surface border border-border rounded-xl text-center flex flex-col justify-center">
                      <div className="text-3xl font-bold text-foreground mb-2 break-words">{match[1]}</div>
                      <div className="text-sm text-foreground/60 uppercase tracking-wider">{match[2]}</div>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="p-6 bg-surface border border-border rounded-xl text-center flex items-center justify-center">
                    <div className="text-lg font-bold text-foreground break-words">{result}</div>
                  </div>
                );
              })}
            </div>
            
            {project.testimonialQuote && (
              <div className="mt-12 border-t border-border pt-8">
                <blockquote className="text-xl italic text-foreground/80 mb-6 relative">
                  <span className="absolute -left-4 -top-4 text-4xl text-brand-accent/20">"</span>
                  {project.testimonialQuote}
                  <span className="absolute -right-4 -bottom-4 text-4xl text-brand-accent/20">"</span>
                </blockquote>
                <div className="flex items-center gap-4">
                  {project.customerLogo && (
                    <img src={project.customerLogo} alt="Customer Logo" className="w-12 h-12 rounded-full object-contain bg-white" />
                  )}
                  <div>
                    <div className="font-bold text-foreground">{project.testimonialAuthorName || project.customerName}</div>
                    {(project.testimonialAuthorTitle || project.industry) && (
                      <div className="text-sm text-foreground/60">
                        {project.testimonialAuthorTitle} {project.testimonialAuthorTitle && project.industry ? '•' : ''} {project.industry}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          )}

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="pt-10 border-t border-border flex justify-center"
          >
            <Link 
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-md bg-brand-accent px-8 text-base font-medium text-black transition-colors hover:bg-brand-accent/90"
            >
              Start Your Project
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
