"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const demoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid work email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  company: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Please select an industry"),
  businessSize: z.string().min(1, "Please select business size"),
  productInterest: z.string().min(1, "Please select a product"),
  message: z.string().optional(),
  botField: z.string().optional(), // Honeypot field
});

type DemoFormData = z.infer<typeof demoSchema>;

export default function RequestDemoPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: DemoFormData) => {
    setServerError("");
    
    // Honeypot check: If bot fills this, silently fail client-side
    if (data.botField) {
      console.log("Spam detected.");
      setIsSuccess(true);
      return;
    }
    
    try {
      const templateParams = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        company: data.company,
        product: data.productInterest,
        demo_date: "Not specified",
        demo_time: "Not specified",
        message: `${data.message || 'No additional message'}\n\nIndustry: ${data.industry}\nSize: ${data.businessSize}`,
        submitted_at: new Date().toLocaleString(),
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      reset();
    } catch (err) {
      setServerError((err as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-background min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col lg:flex-row gap-12 mt-12 glass-border rounded-3xl shadow-xl overflow-hidden">
          
          {/* Left Side Info */}
          <div className="lg:w-2/5 bg-black/40 p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">See our platform in action</h2>
              <p className="text-foreground/70 mb-8 text-lg">
                Discover how top retailers are scaling their operations and increasing margins with our unified software suite.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-accent shrink-0 w-6 h-6" />
                  <div>
                    <strong className="block mb-1 text-lg text-foreground">Live Walkthrough</strong>
                    <span className="text-foreground/80 text-sm">A personalized tour of the features that matter most to your business.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-accent shrink-0 w-6 h-6" />
                  <div>
                    <strong className="block mb-1 text-lg text-foreground">Expert Consultation</strong>
                    <span className="text-foreground/80 text-sm">Discuss your technical requirements and integration needs with our engineers.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-accent shrink-0 w-6 h-6" />
                  <div>
                    <strong className="block mb-1 text-lg text-foreground">Custom Pricing</strong>
                    <span className="text-foreground/80 text-sm">Get a detailed quote based on your specific module requirements and scale.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 p-8 md:p-12">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Request Received!</h3>
                <p className="text-foreground/70 max-w-md mx-auto">
                  Thank you for your interest. One of our retail technology experts will contact you shortly to schedule your personalized demo.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-8">Schedule Free Demo</h2>
                
                {serverError && (
                  <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 border border-red-500/20 text-sm font-medium flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    {serverError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <label>Do not fill this out if you are human</label>
                    <input type="text" {...register("botField")} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">First Name <span className="text-red-500">*</span></label>
                      <input {...register("firstName")} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`} />
                      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Last Name <span className="text-red-500">*</span></label>
                      <input {...register("lastName")} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`} />
                      {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Work Email <span className="text-red-500">*</span></label>
                      <input type="email" {...register("email")} className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`} />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" {...register("phone")} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`} />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Company Name <span className="text-red-500">*</span></label>
                    <input {...register("company")} className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`} />
                    {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Industry <span className="text-red-500">*</span></label>
                      <select {...register("industry")} className={`w-full px-4 py-3 rounded-lg border ${errors.industry ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`}>
                        <option value="">Select...</option>
                        <option value="Supermarket">Supermarket</option>
                        <option value="Fashion">Fashion & Apparel</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.industry && <p className="text-red-500 text-xs">{errors.industry.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Business Size <span className="text-red-500">*</span></label>
                      <select {...register("businessSize")} className={`w-full px-4 py-3 rounded-lg border ${errors.businessSize ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`}>
                        <option value="">Select...</option>
                        <option value="1-10">1-10 stores</option>
                        <option value="11-50">11-50 stores</option>
                        <option value="51-200">51-200 stores</option>
                        <option value="200+">200+ stores</option>
                      </select>
                      {errors.businessSize && <p className="text-red-500 text-xs">{errors.businessSize.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground/80">Interest <span className="text-red-500">*</span></label>
                      <select {...register("productInterest")} className={`w-full px-4 py-3 rounded-lg border ${errors.productInterest ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border focus:ring-brand-accent focus:border-brand-accent'} bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-colors`}>
                        <option value="">Select...</option>
                        <option value="POS">POS Software</option>
                        <option value="ERP">ERP Solution</option>
                        <option value="CRM">Retail CRM</option>
                        <option value="Full Suite">Full Suite</option>
                      </select>
                      {errors.productInterest && <p className="text-red-500 text-xs">{errors.productInterest.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Additional Information</label>
                    <textarea {...register("message")} rows={3} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent resize-none transition-colors" placeholder="Tell us about your current challenges..."></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-accent text-black font-bold py-4 rounded-lg hover:bg-brand-accent/90 transition-all disabled:opacity-50 disabled:pointer-events-none text-lg shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] active:scale-[0.99]"
                  >
                    {isSubmitting ? "Submitting Request..." : "Schedule Free Demo"}
                  </button>
                  <p className="text-xs text-foreground/50 text-center">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
