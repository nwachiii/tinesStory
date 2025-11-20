'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Checkbox,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { Navbar } from '@/components/layout/Navbar';
import { StoryList } from '@/components/stories/StoryList';
import { Pagination } from '@/components/common/Pagination';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { apiClient } from '@/lib/api';
import { Story } from '@/types/story';
import { STORIES_PER_PAGE } from '@/constants/config';

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDrafts, setShowDrafts] = useState(false);
  const toast = useToast();

  const fetchStories = async (page: number, status: 'published' | 'draft' | 'all') => {
    try {
      setLoading(true);
      const response = await apiClient.getStories({
        page,
        limit: STORIES_PER_PAGE,
        status,
      });
      setStories(response.stories);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load stories',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(1, showDrafts ? 'all' : 'published');
  }, [showDrafts]);

  const handlePageChange = (page: number) => {
    fetchStories(page, showDrafts ? 'all' : 'published');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">Stories</Heading>
          <Checkbox
            isChecked={showDrafts}
            onChange={(e) => setShowDrafts(e.target.checked)}
          >
            Show Drafts
          </Checkbox>
        </HStack>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <StoryList stories={stories} showStatus={showDrafts} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

