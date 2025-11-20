export interface Story {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorName: string;
  featuredImage: string;
  status: 'published' | 'draft';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoryDto {
  title: string;
  content: string;
  excerpt: string;
  authorName: string;
  featuredImage: string;
  status: 'published' | 'draft';
}

export interface UpdateStoryDto {
  title?: string;
  content?: string;
  excerpt?: string;
  authorName?: string;
  featuredImage?: string;
  status?: 'published' | 'draft';
}

export interface StoriesResponse {
  stories: Story[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface StoryResponse {
  story: Story;
}

