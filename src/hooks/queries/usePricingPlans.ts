import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface PricingPlanFeature {
  id: number;
  featureText: string;
  included: boolean;
  displayOrder: number;
}

export interface PricingPlan {
  id: number;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  isFeatured: boolean;
  displayOrder: number;
  features?: PricingPlanFeature[];
}

export function usePricingPlans() {
  return useQuery<PricingPlan[]>({
    queryKey: ["admin", "pricing-plans"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/pricing-plans");
      const json = await res.json();
      return json.content || json;
    },
  });
}
