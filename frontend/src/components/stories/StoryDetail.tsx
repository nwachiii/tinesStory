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
  Icon,
  Stack,
} from '@chakra-ui/react';
import { FiUser, FiCalendar, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
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

        <Flex gap={4} mb={6} color="gray.600" fontSize="sm" align="center">
          <HStack spacing={1}>
            <Icon as={FiUser} />
            <Text>By {story.authorName}</Text>
          </HStack>
          <Text>•</Text>
          <HStack spacing={1}>
            <Icon as={FiCalendar} />
            <Text>
              {story.status === 'published' && story.publishedAt
                ? formatDate(story.publishedAt)
                : formatDate(story.createdAt)}
            </Text>
          </HStack>
        </Flex>

        <Divider mb={6} />

        <Box
          className="markdown-content"
          fontSize={{base: 'sm', md: "lg"}}
          lineHeight={{ base: "1.6", md: "1.8" }}
          px={2}
          mb={8}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{story.content}</ReactMarkdown>
        </Box>

        {showActions && (
          <Stack direction={{base: 'column', md: 'row'}} spacing={4} mt={8}>
            {onEdit && (
              <Button colorScheme="blue" onClick={onEdit} leftIcon={<FiEdit />}>
                Edit Story
              </Button>
            )}
            {onDelete && (
              <Button colorScheme="red" onClick={onDelete} leftIcon={<FiTrash2 />}>
                Delete Story
              </Button>
            )}
            <NextLink href="/" passHref legacyBehavior>
              <Button as="a" variant="outline" leftIcon={<FiArrowLeft />}>
                Back to Home
              </Button>
            </NextLink>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

