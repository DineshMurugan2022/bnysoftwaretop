import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export function useServices() {
  return useQuery<Service[], Error>({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/services");
      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }
      return res.json();
    },
  });
}
