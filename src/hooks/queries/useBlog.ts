import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImageUrl: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export function useBlog() {
  return useQuery<BlogPost[]>({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/blog-posts");
      const json = await res.json();
      return json.content || json; // Handle both paginated and unpaginated responses
    },
  });
}
