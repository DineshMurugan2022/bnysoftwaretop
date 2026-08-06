import React from "react";
import { 
  Activity, 
  Sparkles, 
  BookOpen, 
  HeartPulse, 
  Home, 
  ShoppingCart, 
  ShoppingBag, 
  Gem, 
  Briefcase 
} from "lucide-react";

export const industries = [
  { 
    title: "Fitness & Wellness", 
    desc: "Redefining fitness management with personalized tracking, membership CRM, and diet plans.", 
    icon: <Activity />, 
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    category: "Health & Wellness"
  },
  { 
    title: "Beauty & Salons", 
    desc: "Streamline online booking, spa packages, and loyalty rewards for transformative guest experiences.", 
    icon: <Sparkles />, 
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
    category: "Health & Wellness"
  },
  { 
    title: "Healthcare & Pharmacy", 
    desc: "Smart inventory management, expiry tracking, and real-time compliance for pharmacies and clinics.", 
    icon: <HeartPulse />, 
    img: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80",
    category: "Health & Wellness"
  },
  { 
    title: "Education & Academies", 
    desc: "A premium administration experience fostering growth with admissions portals and virtual tours.", 
    icon: <BookOpen />, 
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
    category: "Education"
  },
  { 
    title: "Home & Furniture", 
    desc: "Manage large inventories, 100-night trials, and premium materials for mattress and furniture stores.", 
    icon: <Home />, 
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
    category: "Retail & Commerce"
  },
  { 
    title: "Food & Grocery", 
    desc: "Handpicked workflows for fresh produce, high-volume checkouts, and artisanal goods like premium chocolates.", 
    icon: <ShoppingCart />, 
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
    category: "Retail & Commerce"
  },
  { 
    title: "Retail & E-Commerce", 
    desc: "Elegant and responsive storefronts for everything from general goods to specialized hobby and RC car dealers.", 
    icon: <ShoppingBag />, 
    img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80",
    category: "Retail & Commerce"
  },
  { 
    title: "Jewelry & Luxury", 
    desc: "Timeless tracking for pawn shops and jewelers. Manage certified authenticity, secure payments, and returns.", 
    icon: <Gem />, 
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80",
    category: "Retail & Commerce"
  },
  { 
    title: "Enterprise & B2B (ERP/CRM)", 
    desc: "Powerful business operations, lead management, and intuitive real-time analytics for corporate scaling.", 
    icon: <Briefcase />, 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    category: "Enterprise"
  },
];
