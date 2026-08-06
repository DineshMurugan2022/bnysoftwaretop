import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: '#0a0a0a', // Dark Theme
};

const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk.woff2",
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bnytechnologies.com"),
  title: {
    default: "B & Y Technology | Modern Corporate Solutions",
    template: "%s | B & Y Technology",
  },
  description: "Enterprise software development, AI solutions, and cloud architecture tailored for scale.",
  openGraph: {
    title: "B & Y Technology | Modern Corporate Solutions",
    description: "Enterprise software development, AI solutions, and cloud architecture.",
    url: "https://bnytechnologies.com",
    siteName: "B & Y Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B & Y Technology",
    description: "Enterprise software development, AI solutions, and cloud architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "B & Y Technology",
  "url": "https://bnytechnologies.com",
  "logo": "https://bnytechnologies.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 99410 70555",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": "en"
  }
};

import Script from "next/script";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ChatWidget } from "@/components/ui/ChatWidget";
import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col pt-16`}>
        <QueryProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
          <CommandPalette />
          <FloatingCTA />
          <ChatWidget />
        </QueryProvider>
        
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
