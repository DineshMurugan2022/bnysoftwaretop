"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Monitor, Sun, Moon, Laptop, Users, Package, FileText, MessageSquare, ArrowRight } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <Command
          className="w-full flex flex-col h-full bg-surface"
          shouldFilter={true}
        >
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="w-5 h-5 text-foreground/50 mr-3 shrink-0" />
            <Command.Input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-foreground/50 text-lg" 
              placeholder="Type a command or search..." 
            />
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded bg-surface-2 px-2 font-mono text-[10px] font-medium text-foreground/60 border border-border">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-12 text-center text-sm text-foreground/50">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-2 text-xs font-semibold text-foreground/50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-foreground/50">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <Monitor className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>Home Page</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/products"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <Package className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>Products & Solutions</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/request-demo"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>Request a Demo</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Admin Dashboard" className="px-2 py-2 text-xs font-semibold text-foreground/50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-foreground/50">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/admin/leads"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <Users className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>View Leads</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/admin/portfolio"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <FileText className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>Manage Portfolio</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Support" className="px-2 py-2 text-xs font-semibold text-foreground/50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-foreground/50">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md cursor-pointer data-[selected=true]:bg-brand-accent/10 data-[selected=true]:text-brand-accent group transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-foreground/50 group-data-[selected=true]:text-brand-accent" />
                <span>Contact Support</span>
              </Command.Item>
            </Command.Group>
            
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
