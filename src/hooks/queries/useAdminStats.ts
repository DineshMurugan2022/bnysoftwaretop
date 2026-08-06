import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export interface DashboardStats {
  totalLeads: number;
  newLeadsThisWeek: number;
  totalPortfolio: number;
  totalProducts: number;
  funnel?: {
    visits: number;
    demoRequests: number;
    leads: number;
    qualified: number;
    closed: number;
  };
  weeklyLeadCounts?: { name: string; leads: number }[];
}

export function useAdminStats() {
  return useQuery<DashboardStats, Error>({
    queryKey: queryKeys.admin.stats(),
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/dashboard/stats");
      if (!res.ok) {
        throw new Error('Failed to fetch admin stats');
      }
      return res.json();
    },
  });
}
