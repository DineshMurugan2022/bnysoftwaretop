import React from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import AppNavbar from "@/components/layout/Navbar";

export default function TermsOfService() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-invert prose-brand">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          <p className="text-foreground/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-foreground/70 mb-4">
              By accessing and using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use of Services</h2>
            <p className="text-foreground/70 mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Intellectual Property</h2>
            <p className="text-foreground/70 mb-4">
              The content, features, and functionality of our services are owned by B&Y Technologies and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitation of Liability</h2>
            <p className="text-foreground/70 mb-4">
              In no event shall B&Y Technologies be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Contact Us</h2>
            <p className="text-foreground/70 mb-4">
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@bnytechnologies.com" className="text-brand-accent hover:underline">legal@bnytechnologies.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
