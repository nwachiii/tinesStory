'use client';

import {
  Box,
  Heading,
  Text,
  Image,
  Container,
  Flex,
  Button,
  HStack,
  Divider,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Story } from '@/types/story';
import { formatDate } from '@/lib/dateUtils';
import NextLink from 'next/link';

interface StoryDetailProps {
  story: Story;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function StoryDetail({
  story,
  onEdit,
  onDelete,
  showActions = false,
}: StoryDetailProps) {
  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={6}>
        <Image
          src={story.featuredImage}
          alt={story.title}
          width="100%"
          height="400px"
          objectFit="cover"
          borderRadius="md"
          mb={6}
          fallbackSrc="https://via.placeholder.com/800x400?text=No+Image"
        />

        <Heading as="h1" size="2xl" mb={4}>
          {story.title}
        </Heading>

        <Flex gap={4} mb={6} color="gray.600" fontSize="sm">
          <Text>By {story.authorName}</Text>
          <Text>•</Text>
          <Text>
            {story.status === 'published' && story.publishedAt
              ? formatDate(story.publishedAt)
              : formatDate(story.createdAt)}
          </Text>
        </Flex>

        <Divider mb={6} />

        <Box
          className="markdown-content"
          fontSize="lg"
          lineHeight="1.8"
          mb={8}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{story.content}</ReactMarkdown>
        </Box>

        {showActions && (
          <HStack spacing={4} mt={8}>
            {onEdit && (
              <Button colorScheme="blue" onClick={onEdit}>
                Edit Story
              </Button>
            )}
            {onDelete && (
              <Button colorScheme="red" onClick={onDelete}>
                Delete Story
              </Button>
            )}
            <NextLink href="/" passHref legacyBehavior>
              <Button as="a" variant="outline">
                Back to Home
              </Button>
            </NextLink>
          </HStack>
        )}
      </Box>
    </Container>
  );
}

