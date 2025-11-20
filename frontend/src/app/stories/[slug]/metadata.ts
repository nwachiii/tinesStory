import { Metadata } from 'next';
import { API_URL } from '@/constants/config';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(`${API_URL}/api/stories/${params.slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Story not found');
    }
    
    const data = await response.json();
    const story = data.story;

    return {
      title: `${story.title} | TinesStories`,
      description: story.excerpt,
      openGraph: {
        title: story.title,
        description: story.excerpt,
        images: [story.featuredImage],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: story.title,
        description: story.excerpt,
        images: [story.featuredImage],
      },
    };
  } catch {
    return {
      title: 'Story | TinesStories',
      description: 'Read stories on TinesStories',
    };
  }
}

