'use client';

import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { Story } from '@/types/story';
import { StoryCard } from './StoryCard';

interface StoryListProps {
  stories: Story[];
  showStatus?: boolean;
}

export function StoryList({ stories, showStatus = false }: StoryListProps) {
  if (stories.length === 0) {
    return (
      <Box textAlign="center" py={20}>
        <Text fontSize="lg" color="gray.500">
          No stories found
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} showStatus={showStatus} />
      ))}
    </SimpleGrid>
  );
}

