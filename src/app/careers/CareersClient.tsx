"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";

const POSITIONS = [
  { id: "senior-backend-engineer", title: "Senior Backend Engineer", department: "Engineering", location: "Chennai, India (Hybrid)", type: "Full-time", description: "Design and build scalable microservices using Spring Boot and PostgreSQL." },
  { id: "frontend-developer", title: "Frontend Developer (Next.js)", department: "Engineering", location: "Remote", type: "Full-time", description: "Create stunning, high-performance user interfaces using React, Next.js, and Tailwind CSS." },
  { id: "product-designer", title: "Product Designer", department: "Design", location: "Chennai, India", type: "Full-time", description: "Lead the UI/UX design for our enterprise clients, focusing on intuitive SaaS experiences." },
  { id: "devops-engineer", title: "DevOps Engineer", department: "Infrastructure", location: "Remote", type: "Full-time", description: "Manage our cloud infrastructure on AWS, implementing robust CI/CD pipelines." }
];

export default function Careers() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            We&apos;re always looking for talented individuals who are passionate about building the future of enterprise technology.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-brand-accent">Open Positions</h2>
          <div className="space-y-6">
            {POSITIONS.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between bg-surface border border-border p-8 rounded-2xl hover:border-brand-accent/50 transition-colors gap-6"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-brand-accent transition-colors mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/60">
                      <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" />{job.department}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" />{job.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{job.type}</span>
                    </div>
                  </div>
                  <p className="text-foreground/80 max-w-2xl">{job.description}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <Link 
                    href={`/contact?job=${job.id}`}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full md:w-auto"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
