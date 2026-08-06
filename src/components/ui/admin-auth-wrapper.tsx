"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { LayoutDashboard, Users, Briefcase, LogOut, Code, Menu, X, Package, MonitorPlay, Mailbox, BookOpen, MessageSquareQuote, HelpCircle, BadgeDollarSign, Building2, Contact, Tags } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useDemoRequests } from "@/hooks/queries/useDemoRequests";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unseenDemoCount, setUnseenDemoCount] = useState(0);

  const { data: demoRequests = [] } = useDemoRequests();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        setIsAuthenticated(true);
        if (isLoginPage) {
          router.replace("/admin");
        }
      } catch (_error) {
        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  // Request Notification permission once on load
  useEffect(() => {
    if (isAuthenticated && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [isAuthenticated]);

  // Handle live notifications and unseen badge
  useEffect(() => {
    if (!isAuthenticated || demoRequests.length === 0) return;

    const maxId = Math.max(...demoRequests.map(r => r.id));
    const lastSeenId = parseInt(localStorage.getItem("demoRequests:lastSeenId") || "0", 10);

    if (pathname === "/admin/demo-requests") {
      // Admin is on the page, update seen ID
      localStorage.setItem("demoRequests:lastSeenId", maxId.toString());
      setUnseenDemoCount((prev) => prev !== 0 ? 0 : prev);
    } else {
      // Calculate unseen count
      const unseen = demoRequests.filter(r => r.id > lastSeenId).length;
      setUnseenDemoCount((prev) => prev !== unseen ? unseen : prev);
    }

    // Handle notifications for genuinely new items
    const lastNotifiedId = parseInt(sessionStorage.getItem("demoRequests:lastNotifiedId") || localStorage.getItem("demoRequests:lastSeenId") || "0", 10);
    const unnotified = demoRequests.filter(r => r.id > lastNotifiedId);
    
    if (unnotified.length > 0) {
      sessionStorage.setItem("demoRequests:lastNotifiedId", maxId.toString());
      const req = unnotified[0]; // notify for the most recent unnotified one
      
      if (document.hidden) {
        if ("Notification" in window && Notification.permission === "granted") {
          const n = new Notification("New demo request", {
            body: `${req.name} from ${req.companyName}`
          });
          n.onclick = () => {
            window.focus();
            router.push("/admin/demo-requests");
          };
        }
      } else {
        toast(`New demo request from ${req.name}`, { icon: '🔔' });
      }
    }
  }, [demoRequests, isAuthenticated, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Leads", href: "/admin/leads", icon: <Users className="w-5 h-5" /> },
    { name: "Demo Requests", href: "/admin/demo-requests", icon: <MonitorPlay className="w-5 h-5" />, count: unseenDemoCount },
    { name: "Newsletter", href: "/admin/newsletter", icon: <Mailbox className="w-5 h-5" /> },
    { name: "Portfolio", href: "/admin/portfolio", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Services", href: "/admin/services", icon: <Code className="w-5 h-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
    { name: "Categories", href: "/admin/product-categories", icon: <Tags className="w-5 h-5" /> },
    { name: "Blog", href: "/admin/blog", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Testimonials", href: "/admin/testimonials", icon: <MessageSquareQuote className="w-5 h-5" /> },
    { name: "Pricing", href: "/admin/pricing", icon: <BadgeDollarSign className="w-5 h-5" /> },
    { name: "Industries", href: "/admin/industries", icon: <Building2 className="w-5 h-5" /> },
    { name: "Careers", href: "/admin/careers", icon: <Contact className="w-5 h-5" /> },
    { name: "FAQs", href: "/admin/faqs", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-surface border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-border justify-between lg:justify-center">
          <span className="text-lg font-bold tracking-tight text-foreground">B & Y Admin</span>
          <button className="lg:hidden text-foreground/70" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? "bg-brand-accent text-black font-medium" 
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                {(item.count ?? 0) > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-md transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center px-4 lg:px-8 sticky top-0 z-30">
          <button 
            className="lg:hidden mr-4 text-foreground/70 hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-sm font-medium text-foreground/60 capitalize">
            {pathname.split("/").pop() === "admin" ? "Dashboard" : pathname.split("/").pop()}
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Toaster position="top-right" />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
