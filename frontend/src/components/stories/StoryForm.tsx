'use client';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Text,
  useToast,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { 
  FiType, 
  FiUser, 
  FiFileText, 
  FiImage, 
  FiEdit3, 
  FiCheckCircle, 
  FiX 
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Story, CreateStoryDto, UpdateStoryDto } from '@/types/story';

interface StoryFormProps {
  story?: Story;
  onSubmit: (data: CreateStoryDto | UpdateStoryDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function StoryForm({ story, onSubmit, onCancel, isLoading = false }: StoryFormProps) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: story?.title || '',
    content: story?.content || '',
    excerpt: story?.excerpt || '',
    authorName: story?.authorName || '',
    featuredImage: story?.featuredImage || '',
    status: (story?.status || 'draft') as 'published' | 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        content: story.content,
        excerpt: story.excerpt,
        authorName: story.authorName,
        featuredImage: story.featuredImage,
        status: story.status,
      });
    }
  }, [story]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim() || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.content.trim() || formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!formData.excerpt.trim() || formData.excerpt.trim().length < 10) {
      newErrors.excerpt = 'Excerpt must be at least 10 characters';
    } else if (formData.excerpt.trim().length > 300) {
      newErrors.excerpt = 'Excerpt must not exceed 300 characters';
    }

    if (!formData.authorName.trim() || formData.authorName.trim().length < 2) {
      newErrors.authorName = 'Author name must be at least 2 characters';
    }

    if (!formData.featuredImage.trim()) {
      newErrors.featuredImage = 'Featured image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save story',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const excerptLength = formData.excerpt.length;

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="4xl" mx="auto">
      <Stack spacing={6}>
        <FormControl isRequired isInvalid={!!errors.title}>
          <FormLabel>
            <HStack spacing={2}>
              <Icon as={FiType} />
              <span>Title</span>
            </HStack>
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiType} color="gray.400" />
            </InputLeftElement>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter story title"
              maxLength={200}
              pl={10}
            />
          </InputGroup>
          {errors.title && <Text color="red.500" fontSize="sm" mt={1}>{errors.title}</Text>}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.authorName}>
          <FormLabel>
            <HStack spacing={2}>
              <Icon as={FiUser} />
              <span>Author Name</span>
            </HStack>
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiUser} color="gray.400" />
            </InputLeftElement>
            <Input
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              placeholder="Enter author name"
              maxLength={100}
              pl={10}
            />
          </InputGroup>
          {errors.authorName && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.authorName}</Text>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.excerpt}>
          <FormLabel>
            <HStack spacing={2}>
              <Icon as={FiFileText} />
              <span>Excerpt</span>
              <Text as="span" color="gray.500" fontSize="sm">
                ({excerptLength}/300)
              </Text>
            </HStack>
          </FormLabel>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Enter a brief excerpt (10-300 characters)"
            rows={3}
            maxLength={300}
          />
          {errors.excerpt && <Text color="red.500" fontSize="sm" mt={1}>{errors.excerpt}</Text>}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.featuredImage}>
          <FormLabel>
            <HStack spacing={2}>
              <Icon as={FiImage} />
              <span>Featured Image URL</span>
            </HStack>
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiImage} color="gray.400" />
            </InputLeftElement>
            <Input
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              type="url"
              pl={10}
            />
          </InputGroup>
          {errors.featuredImage && (
            <Text color="red.500" fontSize="sm" mt={1}>{errors.featuredImage}</Text>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.content}>
          <FormLabel>
            <HStack spacing={2}>
              <Icon as={FiEdit3} />
              <span>Content (Markdown)</span>
            </HStack>
          </FormLabel>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your story content in Markdown format..."
            rows={15}
            fontFamily="mono"
          />
          {errors.content && <Text color="red.500" fontSize="sm" mt={1}>{errors.content}</Text>}
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            value={formData.status}
            onChange={(value) =>
              setFormData({ ...formData, status: value as 'published' | 'draft' })
            }
          >
            <Stack direction="row">
              <Radio value="draft">Draft</Radio>
              <Radio value="published">Published</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <HStack spacing={4} justify="flex-end">
          <Button onClick={onCancel} isDisabled={isLoading} leftIcon={<FiX />}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            colorScheme="blue" 
            isLoading={isLoading}
            leftIcon={<FiCheckCircle />}
          >
            {story ? 'Update Story' : 'Create Story'}
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}

