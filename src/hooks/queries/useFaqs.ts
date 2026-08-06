import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export function useFaqs() {
  return useQuery<Faq[]>({
    queryKey: ["admin", "faqs"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/faqs");
      const json = await res.json();
      return json.content || json;
    },
  });
}
