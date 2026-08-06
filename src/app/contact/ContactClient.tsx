"use client";
import { motion } from "framer-motion";
import { Circle, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState } from "react";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botField: z.string().optional()
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" }
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");
    
    // Honeypot check
    if (data.botField) {
      console.log("Spam detected.");
      setStatus("success");
      return;
    }
    
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          message: data.message,
          source: 'contact_page'
        })
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-background text-foreground selection:bg-brand-accent/30 p-2 transition-all duration-500 lg:overflow-hidden lg:p-4">
      {/* Left Column (Hero) */}
      <div className="hidden lg:flex w-[52%] relative flex-col items-center justify-end pb-32 px-12 rounded-2xl overflow-hidden shadow-2xl h-full min-h-[600px] border border-border">
        <Image src="/images/hero-bg.png" alt="Hero background" fill className="object-cover absolute inset-0 z-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        
        <div className="relative z-20 text-center w-full max-w-lg">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 mx-auto border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <motion.div
          className="z-10 w-full max-w-xs space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex items-center space-x-2"
          >
            <Circle className="fill-brand-accent text-brand-accent w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">B & Y Tech</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h1 className="text-4xl font-semibold tracking-tight whitespace-nowrap mb-2">
              Contact Us
            </h1>
            <p className="text-foreground/60 text-sm leading-relaxed px-4">
              Follow these 3 quick phases to activate your project.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="space-y-4"
          >
            <StepItem number={1} text="Reach out to our team" active />
            <StepItem number={2} text="We review your needs" />
            <StepItem number={3} text="We connect and build" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column (Form) */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
        >
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
            <p className="text-foreground/50 text-sm mt-2">
              Input your details and how we can help you begin the journey.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {status === "success" && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-green-400 font-medium font-mono uppercase tracking-wide">Inquiry received — someone from the team will reach out within one business day.</p>
              </div>
            )}
            
            {status === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-medium font-mono uppercase tracking-wide">{errorMsg}</p>
              </div>
            )}

            {/* Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <label>Do not fill this out if you are human</label>
              <input type="text" {...register("botField")} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="First Name" placeholder="John" type="text" {...register("firstName")} error={errors.firstName?.message} />
              <InputGroup label="Last Name" placeholder="Doe" type="text" {...register("lastName")} error={errors.lastName?.message} />
            </div>
            <InputGroup label="Email" placeholder="john@example.com" type="email" {...register("email")} error={errors.email?.message} />
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea
                {...register("message")}
                className={`w-full bg-surface border ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-amber-accent focus:border-amber-accent'} rounded-md p-4 text-foreground placeholder:text-foreground/50 focus:ring-1 resize-none h-32 focus:outline-none transition-colors`}
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-brand-accent text-black font-semibold rounded-md hover:bg-brand-accent/90 active:scale-[0.98] mt-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Sending..." : "Send a message"}
            </button>
            
            <div className="text-center mt-6">
              <a href="mailto:info@bnytechnologies.com" className="text-sm text-foreground/60 hover:text-brand-accent transition-colors">
                Looking for our direct email? Click here
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function StepItem({ number, text, active }: { number: number; text: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center space-x-4 p-3 rounded-xl transition-colors border ${
        active ? "bg-brand-accent/10 border-brand-accent/50 text-foreground" : "bg-surface border-border text-foreground/70"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
          active ? "bg-brand-accent text-black" : "bg-border text-foreground/50"
        }`}
      >
        {number}
      </div>
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1 flex flex-col w-full relative">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <input
          ref={ref}
          {...props}
          className={`bg-surface border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-amber-accent focus:border-amber-accent'} rounded-md h-11 px-4 text-foreground placeholder:text-foreground/50 focus:ring-1 focus:outline-none w-full transition-colors`}
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";
