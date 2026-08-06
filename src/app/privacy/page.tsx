import React from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import AppNavbar from "@/components/layout/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-invert prose-brand">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          <p className="text-foreground/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
            <p className="text-foreground/70 mb-4">
              When you use our services, we may collect information you provide directly to us, such as your name, email address, and company details when you request a demo, sign up for a newsletter, or contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Information</h2>
            <p className="text-foreground/70 mb-4">
              We use the information we collect to operate, maintain, and provide the features and functionality of our services, to communicate with you, and to personalize your experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
            <p className="text-foreground/70 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
            <p className="text-foreground/70 mb-4">
              We implement reasonable security measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Contact Us</h2>
            <p className="text-foreground/70 mb-4">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@bnytechnologies.com" className="text-brand-accent hover:underline">privacy@bnytechnologies.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
