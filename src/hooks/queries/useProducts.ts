import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  status: string;
  iconKey: string;
  displayOrder: number;
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/products");
      const json = await res.json();
      return json.content || json;
    },
  });
}
