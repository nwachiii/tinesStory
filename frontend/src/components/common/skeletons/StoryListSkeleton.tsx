'use client';

import { SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StoryCardSkeleton } from './StoryCardSkeleton';
import { STORIES_PER_PAGE } from '@/constants/config';

interface StoryListSkeletonProps {
  count?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      // delayChildren: 0.1,
    },
  },
};

const MotionSimpleGrid = motion(SimpleGrid);

export function StoryListSkeleton({ count = STORIES_PER_PAGE }: StoryListSkeletonProps) {
  return (
    <MotionSimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: count }).map((_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </MotionSimpleGrid>
  );
}

