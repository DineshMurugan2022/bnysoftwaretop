import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface PortfolioItem {
  id: number;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  
  // New Case Study fields (Part D placeholders)
  customerName?: string;
  customerLogo?: string;
  industry?: string;
  problemStatement?: string;
  solutionSummary?: string;
  quantifiedResults?: string[];
  testimonialQuote?: string;
  testimonialAuthorName?: string;
  testimonialAuthorTitle?: string;
  testimonialAuthorCompany?: string;
}

export function usePortfolio() {
  return useQuery<PortfolioItem[], Error>({
    queryKey: ['admin', 'portfolio'],
    queryFn: async () => {
      const res = await apiFetch("/api/v1/portfolio");
      if (!res.ok) {
        throw new Error('Failed to fetch portfolio');
      }
      return res.json();
    },
  });
}
