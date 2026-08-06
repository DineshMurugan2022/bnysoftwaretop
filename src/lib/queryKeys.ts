export const queryKeys = {
  admin: {
    all: ['admin'] as const,
    stats: () => [...queryKeys.admin.all, 'stats'] as const,
  },
  blogPosts: {
    all: ['blogPosts'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.blogPosts.all, 'list', filters] as const,
    detail: (id: string | number) => [...queryKeys.blogPosts.all, 'detail', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  }
};
