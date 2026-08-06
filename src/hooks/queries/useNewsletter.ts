import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export function useNewsletter() {
  return useQuery<NewsletterSubscriber[], Error>({
    queryKey: ['admin', 'newsletter'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/admin/newsletter-subscribers");
      if (!res.ok) {
        throw new Error('Failed to fetch newsletter subscribers');
      }
      return res.json();
    },
  });
}
