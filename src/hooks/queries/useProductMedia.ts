import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface ProductMedia {
  id: number;
  productId: number;
  mediaType: string;
  url: string;
  altText?: string;
  displayOrder: number;
}

export function useProductMedia(productId?: number) {
  return useQuery<ProductMedia[]>({
    queryKey: ["admin", "product-medias", productId],
    queryFn: async () => {
      const url = productId ? `/api/v1/admin/product-medias?productId=${productId}` : `/api/v1/admin/product-medias`;
      const res = await apiFetch(url);
      if (!res.ok) throw new Error("Failed to fetch product media");
      const json = await res.json();
      return json.content || json;
    },
    enabled: !!productId,
  });
}

export function useCreateProductMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<ProductMedia, "id">) => {
      const res = await apiFetch("/api/v1/admin/product-medias", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product media");
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "product-medias", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useUpdateProductMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<ProductMedia> & { id: number }) => {
      const res = await apiFetch(`/api/v1/admin/product-medias/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product media");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "product-medias", data.productId] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useDeleteProductMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiFetch(`/api/v1/admin/product-medias/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product media");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "product-medias"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}
