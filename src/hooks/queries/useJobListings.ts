import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface JobListing {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  isOpen: boolean;
  createdAt: string;
}

export function useJobListings() {
  return useQuery<JobListing[]>({
    queryKey: ["admin", "job-listings"],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/job-listings");
      const json = await res.json();
      return json.content || json;
    },
  });
}
