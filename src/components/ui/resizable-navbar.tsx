"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {children}
        </div>
      </div>
    </nav>
  );
}

export function NavBody({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:flex w-full items-center justify-between">
      {children}
    </div>
  );
}

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <img src="/logo.png" alt="B&Y Technologies" className="h-12 w-auto object-contain" />
    </Link>
  );
}

export function NavItems({
  items,
}: {
  items: { name: string; link: string }[];
}) {
  return (
    <ul className="flex items-center space-x-8">
      {items.map((item, idx) => (
        <li key={idx}>
          <Link
            href={item.link}
            className="text-sm font-medium text-foreground/80 hover:text-brand-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-accent after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function NavbarButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95";
  
  const variantStyles =
    variant === "primary"
      ? "bg-brand-accent text-black hover:bg-brand-accent/90 focus-visible:ring-brand-accent shadow-sm shadow-brand-accent/20"
      : "bg-surface text-foreground border border-border hover:bg-surface/80 hover:border-brand-accent/50 focus-visible:ring-border";

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
}

export function MobileNav({ children }: { children: ReactNode }) {
  return <div className="flex md:hidden w-full items-center justify-between">{children}</div>;
}

export function MobileNavHeader({ children }: { children: ReactNode }) {
  return <div className="flex w-full items-center justify-between">{children}</div>;
}

export function MobileNavToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-border transition-colors"
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

export function MobileNavMenu({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-16 left-0 w-full bg-background border-b border-border shadow-2xl overflow-hidden"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
