import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface PublicPricingPlanFeature {
  id: number;
  featureText: string;
  included: boolean;
  displayOrder: number;
}

export interface PublicPricingPlan {
  id: number;
  name: string;
  slug: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  currency: string;
  isFeatured: boolean;
  displayOrder: number;
  features: PublicPricingPlanFeature[];
}

export function usePublicPricingPlans() {
  return useQuery<PublicPricingPlan[]>({
    queryKey: ["public", "pricing-plans"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/pricing-plans");
      if (!res.ok) throw new Error("Failed to fetch pricing plans");
      const json = await res.json();
      return json;
    },
  });
}
