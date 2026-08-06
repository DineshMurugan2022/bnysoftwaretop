"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DemoRequestModal from "@/components/ui/DemoRequestModal";

export default function AppNavbar() {
  const router = useRouter();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Industries", link: "/industries" },
    { name: "Solutions", link: "/solutions" },
    { name: "Customers", link: "/customers" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton 
            variant="primary" 
            onClick={() => setIsDemoModalOpen(true)}
            className="border-none shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]"
          >
            Request Demo
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-md text-foreground/80 hover:text-brand-accent transition-colors font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-4 after:h-[2px] after:w-[calc(100%-2rem)] after:origin-bottom-right after:scale-x-0 after:bg-brand-accent after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4 px-4 pt-4 border-t border-border mt-2">
            <NavbarButton
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDemoModalOpen(true);
              }}
              variant="primary"
              className="w-full h-12 border-none shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]"
            >
              Request Demo
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
    <DemoRequestModal 
      isOpen={isDemoModalOpen} 
      onClose={() => setIsDemoModalOpen(false)} 
    />
    </>
  );
}
