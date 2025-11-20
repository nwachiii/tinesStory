'use client';

import {
  Box,
  Container,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  Divider,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionFlex = motion(Flex);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      // delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function StoryDetailSkeleton() {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Container maxW="container.lg" py={8}>
      <MotionBox
        mb={6}
        bg={bg}
        p={6}
        borderRadius="md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Featured image skeleton */}
        <MotionBox variants={itemVariants} mb={6}>
          <Skeleton
            height="400px"
            width="100%"
            borderRadius="md"
          />
        </MotionBox>

        {/* Title skeleton */}
        <MotionVStack align="stretch" spacing={3} mb={4} variants={itemVariants}>
          <Skeleton height="40px" width="85%" />
          <Skeleton height="40px" width="70%" />
        </MotionVStack>

        {/* Metadata skeleton */}
        <MotionFlex gap={4} mb={6} align="center" variants={itemVariants}>
          <MotionHStack spacing={2}>
            <Skeleton
              height="16px"
              width="16px"
              borderRadius="full"
            />
            <Skeleton height="16px" width="120px" />
          </MotionHStack>
          <Skeleton height="16px" width="8px" />
          <MotionHStack spacing={2}>
            <Skeleton
              height="16px"
              width="16px"
              borderRadius="full"
            />
            <Skeleton height="16px" width="100px" />
          </MotionHStack>
        </MotionFlex>

        <Divider mb={6} />

        {/* Content skeleton */}
        <MotionVStack align="stretch" spacing={4} mb={8} variants={itemVariants}>
          <SkeletonText
            noOfLines={4}
            spacing={3}
          />
          <SkeletonText
            noOfLines={3}
            spacing={3}
          />
          <SkeletonText
            noOfLines={5}
            spacing={3}
          />
          <SkeletonText
            noOfLines={4}
            spacing={3}
          />
        </MotionVStack>

        {/* Action buttons skeleton */}
        <MotionHStack spacing={4} mt={8} variants={itemVariants}>
          <Skeleton height="40px" width="120px" />
          <Skeleton height="40px" width="120px" />
          <Skeleton height="40px" width="120px" />
        </MotionHStack>
      </MotionBox>
    </Container>
  );
}

