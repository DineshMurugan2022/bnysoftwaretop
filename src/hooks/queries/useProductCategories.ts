import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { ProductCategory } from "./useProducts";

export function useProductCategories() {
  return useQuery<ProductCategory[]>({
    queryKey: ["admin", "product-categories"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/product-categories");
      const json = await res.json();
      return json.content || json;
    },
  });
}
