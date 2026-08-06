import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface PublicIndustry {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export function usePublicIndustries() {
  return useQuery<PublicIndustry[]>({
    queryKey: ["public", "industries"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/industrys"); // backend maps to /api/v1/industrys
      if (!res.ok) throw new Error("Failed to fetch industries");
      const json = await res.json();
      return json;
    },
  });
}
