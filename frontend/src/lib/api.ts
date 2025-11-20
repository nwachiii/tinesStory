import { API_URL } from '@/constants/config';
import { StoriesResponse, StoryResponse, CreateStoryDto, UpdateStoryDto } from '@/types/story';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Stories API
  async getStories(params?: {
    page?: number;
    limit?: number;
    status?: 'published' | 'draft' | 'all';
  }): Promise<StoriesResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    return this.request<StoriesResponse>(
      `/api/stories${queryString ? `?${queryString}` : ''}`
    );
  }

  async getStoryBySlug(slug: string): Promise<StoryResponse> {
    return this.request<StoryResponse>(`/api/stories/${slug}`);
  }

  async getStoryById(id: string): Promise<StoryResponse> {
    return this.request<StoryResponse>(`/api/stories/id/${id}`);
  }

  async createStory(data: CreateStoryDto): Promise<{ success: boolean; story: any }> {
    return this.request<{ success: boolean; story: any }>('/api/stories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStory(id: string, data: UpdateStoryDto): Promise<{ success: boolean; story: any }> {
    return this.request<{ success: boolean; story: any }>(`/api/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStory(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/stories/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_URL);

