import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "DISMISSED";
  source?: string;
}

export function useLeads() {
  return useQuery<Lead[], Error>({
    // fallback to generic string array if queryKeys.admin.leads isn't defined yet
    queryKey: ['admin', 'leads'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/leads");
      if (!res.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await res.json();
      return data.sort((a: Lead, b: Lead) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    },
  });
}
