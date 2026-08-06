import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'B & Y Technology',
    short_name: 'B & Y Tech',
    description: 'Enterprise software development, AI solutions, and cloud architecture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#d9f99d',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
