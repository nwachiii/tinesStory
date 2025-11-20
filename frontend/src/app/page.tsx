'use client';

import { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Checkbox,
  HStack,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { FiBookOpen, FiFileText } from 'react-icons/fi';
import { Navbar } from '@/components/layout/Navbar';
import { StoryList } from '@/components/stories/StoryList';
import { Pagination } from '@/components/common/Pagination';
import { StoryListSkeleton } from '@/components/common/skeletons';
import { useStories } from '@/lib/api';
import { STORIES_PER_PAGE } from '@/constants/config';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDrafts, setShowDrafts] = useState(false);
  const toast = useToast();

  const { data, isLoading, error } = useStories({
    page: currentPage,
    limit: STORIES_PER_PAGE,
    status: showDrafts ? 'all' : 'published',
  });

  if (error) {
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to load stories',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowDraftsChange = (checked: boolean) => {
    setShowDrafts(checked);
    setCurrentPage(1); // Reset to first page when toggling drafts
  };

  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="container.lg" py={8}>
        <HStack justify="space-between" mb={6}>
          <HStack spacing={2}>
            <Icon as={FiBookOpen} boxSize={6} />
            <Heading size="lg">Stories</Heading>
          </HStack>
          <Checkbox
            isChecked={showDrafts}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleShowDraftsChange(e.target.checked)}
          >
            <HStack spacing={1}>
              <Icon as={FiFileText} />
              <span>Show Drafts</span>
            </HStack>
          </Checkbox>
        </HStack>

        {isLoading ? (
          <StoryListSkeleton />
        ) : (
          <>
            <StoryList stories={data?.stories || []} showStatus={showDrafts} />
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

