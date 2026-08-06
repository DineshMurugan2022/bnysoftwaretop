"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { StatsBlock } from "@/components/ui/stats-block";
import { ArrowRight, MapPin, Phone, Quote, Megaphone, Smartphone, PenTool } from "lucide-react";
import { SiX, SiGithub } from "@icons-pack/react-simple-icons";

const SiLinkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import { useRef } from "react";

const TEAM = [
  { name: "Jane Doe", role: "CEO & Founder", bio: "Former VP of Engineering at RetailTech with 15+ years of enterprise software experience.", image: "/images/team/ceo.png" },
  { name: "John Smith", role: "CTO", bio: "Architect of scalable cloud systems handling millions of daily transactions.", image: "/images/team/cto.png" },
  { name: "Alice Johnson", role: "Lead Designer", bio: "Award-winning UX designer obsessed with creating frictionless digital experiences.", image: "/images/team/designer.png" },
  { name: "Bob Williams", role: "Head of Engineering", bio: "Open source contributor and AI enthusiast leading our machine learning initiatives.", image: "/images/team/engineer.png" }
];

const MILESTONES = [
  { year: "2018", title: "The Foundation", desc: "Founded with a vision to revolutionize retail technology." },
  { year: "2019", title: "First 100 Stores", desc: "Successfully deployed our beta POS across 100 retail locations." },
  { year: "2021", title: "Enterprise Shift", desc: "Launched our cloud-native Omnichannel ERP solution." },
  { year: "2023", title: "Global Expansion", desc: "Expanded operations to 15 countries and crossed $50M in processed transactions." },
  { year: "2024", title: "AI Integration", desc: "Introduced advanced predictive analytics and AI-driven inventory forecasting." },
];

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-20 px-6">
      {/* Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>
      
      {/* Animated Fill Line */}
      <motion.div 
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-accent -translate-x-1/2 origin-top"
        style={{ scaleY }}
      ></motion.div>

      <div className="space-y-24 relative z-10">
        {MILESTONES.map((milestone, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-1/2 ${idx % 2 === 0 ? 'text-left pl-8 md:pl-12' : 'text-right pr-8 md:pr-12'}`}>
              <div className="text-4xl font-display font-black text-white/50 mb-2">{milestone.year}</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{milestone.desc}</p>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface border-4 border-brand-accent shadow-[0_0_15px_rgba(163,230,53,0.5)] z-20"></div>
            
            <div className="w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            We are a team of passionate engineers and designers dedicated to building software that empowers enterprises.
          </motion.p>
        </div>
      </section>

      {/* Company Intro Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-6 text-brand-accent">Digital Marketing That Stands the Test of Time.</h2>
          <p className="text-lg md:text-xl font-light text-foreground/90 leading-relaxed mb-6">
            We are here to manage your promotion activities with experience. If you are looking for a Chennai based web designer that can also deliver SEO, SMO and web development, you have come to the right place. Actually, we have developed with fundamental principles of offering a Seo service that assists client to succeed in their business. We have sustained to study and improve our process as the industry grows. Beside the way, we have also created the advanced quality control and reporting, a cutting edge content development, internal and external constant education for our staffs and marketing team. Presently, we are one among the biggest pools of online marketing professional and we have more than 100 dedicated team members right now. We lead by a well-experienced management team that offers you a great support and strategic direction for a company.
          </p>
          <p className="text-lg md:text-xl font-light text-foreground/90 leading-relaxed mb-8">
            With our SEM services, you can obtain the benefits of ideal business power at minimal prices as well as low risk. We strictly follow the flexible methodology to keep pace with modifying algorithms of search engines to improve ROI within an ideal time period. Here are the excellent SEM services that we provide:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            {['Market analysis', 'Campaign management', 'Keyword research', 'Ad campaign', 'Analysis', 'Reporting'].map((service, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <ArrowRight className="w-4 h-4 text-brand-accent" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We're Offering Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-brand-accent"></div>
              <span className="text-brand-accent font-semibold tracking-widest text-sm uppercase">Our Services List</span>
              <div className="h-[1px] w-12 bg-brand-accent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight">What We&apos;re Offering</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="bg-surface border border-white/5 p-10 rounded-2xl text-center flex flex-col items-center hover:border-brand-accent/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] group-hover:opacity-10 transition-opacity"></div>
              <div className="mb-6 relative z-10">
                <Megaphone className="w-16 h-16 text-brand-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10 uppercase">Our Experts</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10 text-sm md:text-base">
                Our experts also design a personalized SEM strategy to obtain the best possible results by considering the requirements, objectives and constraints of your business.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface border border-white/5 p-10 rounded-2xl text-center flex flex-col items-center hover:border-brand-accent/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] group-hover:opacity-10 transition-opacity"></div>
              <div className="mb-6 relative z-10">
                <Smartphone className="w-16 h-16 text-brand-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10 uppercase">Our Aim</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10 text-sm md:text-base">
                Our main aim is to get you a targeted traffic to your website with a great support of search engines, so that you can boost up your brand value and sales as well.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface border border-white/5 p-10 rounded-2xl text-center flex flex-col items-center hover:border-brand-accent/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] group-hover:opacity-10 transition-opacity"></div>
              <div className="mb-6 relative z-10">
                <PenTool className="w-16 h-16 text-brand-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10 uppercase">Our Invention</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10 text-sm md:text-base">
                Since our invention, we are one of the well qualified SMO service provider companies. We make a brand identity for your business and then market your products via our online medium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center glass-border p-12 rounded-3xl bg-surface/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl font-display font-bold mb-6 text-brand-accent relative z-10">Our Mission</h2>
          <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed relative z-10">
            &quot;To bridge the gap between complex business challenges and elegant, scalable technological solutions. We believe in writing code that not only functions flawlessly today but scales effortlessly tomorrow.&quot;
          </p>
        </div>
      </section>

      {/* Stats Block */}
      <div className="relative z-20">
        <StatsBlock />
      </div>

      {/* Timeline Section */}
      <section className="py-32 bg-surface border-y border-white/5 relative overflow-hidden mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground">Our Journey</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">Whether you&apos;re looking to transform your enterprise operations or build the next disruptive platform, our team is ready to help.</p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">Meet The Team</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <div key={member.name} className="group perspective-1000 h-[350px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-full relative preserve-3d group-hover:rotate-y-180 transition-transform duration-700 ease-out cursor-pointer"
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden bg-surface border border-white/5 p-8 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center shadow-lg">
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-brand-accent/10 to-transparent"></div>
                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-brand-accent/30 shadow-[0_0_20px_rgba(163,230,53,0.15)] relative z-10">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={128} 
                        height={128} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-brand-accent font-medium mt-1 uppercase tracking-wider text-xs">{member.role}</p>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-accent border border-brand-accent p-8 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                    <div className="w-12 h-12 mb-4 bg-black/10 rounded-full flex items-center justify-center">
                       <Quote className="w-6 h-6 text-black/40" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                    <p className="text-black/80 font-medium text-sm leading-relaxed mb-8">{member.bio}</p>
                    
                    <div className="flex gap-4 mt-auto">
                      <a href="#" className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black hover:text-brand-accent transition-colors">
                        <SiLinkedin size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black hover:text-brand-accent transition-colors">
                        <SiX size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black hover:text-brand-accent transition-colors">
                        <SiGithub size={18} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative bg-surface-2 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Visit Our Headquarters</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">We&apos;re located in the heart of the tech district. Come say hello or schedule an office tour.</p>
          </div>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 glass-border relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528000654!2d-74.14448744577884!3d40.69763123330689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1714488053531!5m2!1sen!2sus" 
              className="absolute inset-0 w-full h-full" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
