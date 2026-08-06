import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface DemoRequest {
  id: number;
  name: string;
  email: string;
  companyName: string;
  employeeCount: string;
  message: string;
  status: string;
  submittedAt: string;
}

export function useDemoRequests() {
  return useQuery<DemoRequest[], Error>({
    queryKey: ['admin', 'demo-requests'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/demo-requests");
      if (!res.ok) {
        throw new Error('Failed to fetch demo requests');
      }
      return res.json();
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
  });
}
