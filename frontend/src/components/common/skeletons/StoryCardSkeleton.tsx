'use client';

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      // delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export function StoryCardSkeleton() {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <MotionCard
      bg={cardBg}
      height="100%"
      display="flex"
      flexDirection="column"
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image skeleton */}
      <MotionBox variants={itemVariants}>
        <Skeleton
          height="200px"
          width="100%"
          borderRadius="md"
        />
      </MotionBox>

      <CardBody flex="1" display="flex" flexDirection="column">
        {/* Title skeleton */}
        <MotionVStack align="stretch" spacing={3} mb={2} variants={itemVariants}>
          <Skeleton height="24px" width="90%" />
          <Skeleton height="24px" width="70%" />
        </MotionVStack>

        {/* Excerpt skeleton */}
        <MotionVStack align="stretch" spacing={2} flex="1" mt={2} variants={itemVariants}>
          <SkeletonText
            noOfLines={3}
            spacing={2}
          />
        </MotionVStack>
      </CardBody>

      <CardFooter>
        <Flex justify="space-between" align="center" width="100%">
          <MotionVStack align="flex-start" spacing={2} variants={itemVariants}>
            {/* Author skeleton */}
            <MotionHStack spacing={2}>
              <Skeleton
                height="16px"
                width="16px"
                borderRadius="full"
              />
              <Skeleton height="16px" width="100px" />
            </MotionHStack>
            {/* Date skeleton */}
            <MotionHStack spacing={2}>
              <Skeleton
                height="14px"
                width="14px"
                borderRadius="full"
              />
              <Skeleton height="14px" width="80px" />
            </MotionHStack>
          </MotionVStack>
        </Flex>
      </CardFooter>
    </MotionCard>
  );
}

