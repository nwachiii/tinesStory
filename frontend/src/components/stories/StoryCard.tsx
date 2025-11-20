'use client';

import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUser, FiCalendar } from 'react-icons/fi';
import NextLink from 'next/link';
import { Story } from '@/types/story';
import { formatDate } from '@/lib/dateUtils';
import { StatusBadge } from '../common/StatusBadge';

interface StoryCardProps {
  story: Story;
  showStatus?: boolean;
}

export function StoryCard({ story, showStatus = false }: StoryCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const imageBg = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('gray.500', 'gray.400');
  const dateColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <NextLink href={`/stories/${story.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        bg={cardBg}
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        transition="all 0.2s"
        height="100%"
        display="flex"
        flexDirection="column"
        cursor="pointer"
      >
      <Box
        position="relative"
        width="100%"
        height="200px"
        overflow="hidden"
        bg={imageBg}
      >
        <Image
          src={story.featuredImage}
          alt={story.title}
          width="100%"
          height="100%"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400x200?text=No+Image"
        />
        {showStatus && (
          <Box position="absolute" top={2} right={2}>
            <StatusBadge status={story.status} isCard={true} />
          </Box>
        )}
      </Box>

      <CardBody flex="1" display="flex" flexDirection="column">
        <Heading size="md" mb={2} noOfLines={2}>
          {story.title}
        </Heading>
        <Text color={textColor} noOfLines={3} flex="1">
          {story.excerpt}
        </Text>
      </CardBody>

      <CardFooter>
        <Flex justify="space-between" align="center" width="100%">
          <Box>
            <HStack spacing={1} mb={1}>
              <Icon as={FiUser} fontSize="sm" color={iconColor} />
              <Text fontSize="sm" color={iconColor}>
                {story.authorName}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FiCalendar} fontSize="xs" color={dateColor} />
              <Text fontSize="xs" color={dateColor}>
                {story.status === 'published' && story.publishedAt
                  ? formatDate(story.publishedAt)
                  : formatDate(story.createdAt)}
              </Text>
            </HStack>
          </Box>
        </Flex>
      </CardFooter>
    </Card>
    </NextLink>
  );
}

