"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Smartphone, Cloud, Cpu, Shield, Database, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "custom-software",
      title: "Custom Software",
      icon: <Code className="w-8 h-8 text-brand-accent" />,
      description: "Tailor-made enterprise software designed specifically for your business processes.",
      deliverables: ["Architecture Design", "Full-Stack Development", "Legacy System Modernization", "API Integration"],
      whoIsItFor: "Mid-to-large enterprises needing scalable systems to replace off-the-shelf software limitations.",
    },
    {
      id: "mobile-apps",
      title: "Mobile Apps",
      icon: <Smartphone className="w-8 h-8 text-brand-accent" />,
      description: "Native and cross-platform mobile experiences that engage users.",
      deliverables: ["iOS & Android Apps", "UI/UX Prototyping", "App Store Optimization", "Ongoing Maintenance"],
      whoIsItFor: "B2C startups and B2B platforms looking to capture mobile-first audiences.",
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions",
      icon: <Cloud className="w-8 h-8 text-brand-accent" />,
      description: "Secure, scalable, and highly available cloud architecture on AWS or Azure.",
      deliverables: ["Cloud Migration", "DevOps & CI/CD", "Serverless Architecture", "Cost Optimization"],
      whoIsItFor: "Scaling companies experiencing downtime or high infrastructure costs.",
    },
    {
      id: "ai-ml",
      title: "AI & ML",
      icon: <Cpu className="w-8 h-8 text-brand-accent" />,
      description: "Intelligent systems that automate tasks and extract insights from your data.",
      deliverables: ["Predictive Analytics", "NLP & Chatbots", "Computer Vision", "Custom LLM Fine-tuning"],
      whoIsItFor: "Data-rich organizations wanting to automate decision-making and enhance customer support.",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: <Shield className="w-8 h-8 text-brand-accent" />,
      description: "Protecting your digital assets from advanced persistent threats.",
      deliverables: ["Penetration Testing", "Security Audits", "Compliance (SOC2/GDPR)", "Incident Response"],
      whoIsItFor: "Financial, healthcare, or SaaS companies handling sensitive user data.",
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      icon: <Database className="w-8 h-8 text-brand-accent" />,
      description: "Transform raw data into actionable business intelligence dashboards.",
      deliverables: ["Data Warehousing", "ETL Pipelines", "Real-time Dashboards", "Business Intelligence"],
      whoIsItFor: "Executives needing real-time visibility into KPIs across disparate systems.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            End-to-end technology solutions designed to scale your business, optimize operations, and drive innovation.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-foreground/70 mb-8">{service.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent mb-4">Who is this for?</h3>
                  <p className="text-foreground/80">{service.whoIsItFor}</p>
                </div>
                
                <Link 
                  href={`/contact?service=${service.id}`}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Discuss {service.title}
                </Link>
              </div>
              
              <div className={`bg-surface border border-border p-8 rounded-2xl ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <h3 className="text-xl font-bold mb-6">Key Deliverables</h3>
                <ul className="space-y-4">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
