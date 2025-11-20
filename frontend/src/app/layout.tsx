import { Providers } from './providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'TinesStories - Blog Platform',
    template: '%s | TinesStories',
  },
  description: 'A platform for publishing and managing company stories',
  keywords: ['blog', 'stories', 'articles', 'publishing'],
  authors: [{ name: 'TinesStories' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tinesstories.com',
    siteName: 'TinesStories',
    title: 'TinesStories - Blog Platform',
    description: 'A platform for publishing and managing company stories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TinesStories - Blog Platform',
    description: 'A platform for publishing and managing company stories',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

