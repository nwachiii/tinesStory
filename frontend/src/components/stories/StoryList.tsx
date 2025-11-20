'use client';

import { SimpleGrid, Box, Text, Icon, VStack } from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';
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
        <VStack spacing={4}>
          <Icon as={FiBookOpen} boxSize={12} color="gray.400" />
          <Text fontSize="lg" color="gray.500">
            No stories found
          </Text>
        </VStack>
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

