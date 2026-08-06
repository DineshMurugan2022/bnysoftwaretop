import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface Industry {
  id: number;
  title: string;
  description: string;
  iconKey: string;
  displayOrder: number;
}

export function useIndustries() {
  return useQuery<Industry[]>({
    queryKey: ["admin", "industries"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/industries");
      const json = await res.json();
      return json.content || json;
    },
  });
}
