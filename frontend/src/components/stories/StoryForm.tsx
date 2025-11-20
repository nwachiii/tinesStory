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
  Grid,
  GridItem,
  useColorModeValue,
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
import { Story, CreateStoryDto } from '@/types/story';

// Common styles
const inputGroupStyles = {
  h: '40px',
  rounded: 'xl',
  alignItems: 'center',
};

const inputStyles = {
  pl: 10,
  size: 'md',
  fontSize: '14px',
  borderRadius: 'md',
  sx: { '::placeholder': { fontSize: '12px' } },
};

const labelStyles = {
  fontSize: '12px',
  pb: "3px",
};

const errorTextStyles = {
  color: 'red.500',
  fontSize: 'sm',
  mt: 1,
};

// Reusable FormInput component
interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ComponentType<any>;
  maxLength?: number;
  type?: string;
  error?: string;
  isRequired?: boolean;
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  icon,
  maxLength,
  type = 'text',
  error,
  isRequired = false,
}: FormInputProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel {...labelStyles}>{label}</FormLabel>
      <InputGroup {...inputGroupStyles}>
        <InputLeftElement pointerEvents="none">
          <Icon h={8} as={icon} color="gray.400" />
        </InputLeftElement>
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
          {...inputStyles}
        />
      </InputGroup>
      {error && <Text {...errorTextStyles}>{error}</Text>}
    </FormControl>
  );
}

// Reusable FormTextarea component
interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
  maxLength?: number;
  fontFamily?: string;
  error?: string;
  isRequired?: boolean;
  helperText?: string;
}

function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows,
  maxLength,
  fontFamily,
  error,
  isRequired = false,
  helperText,
}: FormTextareaProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel {...labelStyles}>
        {label}
        {helperText && (
          <Text as="span" color="gray.500" fontSize="sm">
            {helperText}
          </Text>
        )}
      </FormLabel>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        fontFamily={fontFamily}
        size="lg"
        fontSize="14px"
        borderRadius="md"
        sx={{ '::placeholder': { fontSize: '12px' } }}
      />
      {error && <Text {...errorTextStyles}>{error}</Text>}
    </FormControl>
  );
}

interface StoryFormProps {
  story?: Story;
  onSubmit: (data: CreateStoryDto) => Promise<void>;
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
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={{ base: 4, md: 6 }}
    >
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormInput
            label="Story Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter story title"
            icon={FiType}
            maxLength={200}
            error={errors.title}
            isRequired
          />
        </GridItem>

        <GridItem>
          <FormInput
            label="Author Name"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            placeholder="Enter author name"
            icon={FiUser}
            maxLength={100}
            error={errors.authorName}
            isRequired
          />
        </GridItem>

        <GridItem>
          <FormInput
            label="Featured Image URL"
            value={formData.featuredImage}
            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
            icon={FiImage}
            type="url"
            error={errors.featuredImage}
            isRequired
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormTextarea
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Enter a brief excerpt (10-300 characters)"
            rows={4}
            maxLength={300}
            error={errors.excerpt}
            isRequired
            helperText={` (${excerptLength}/300)`}
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl isRequired isInvalid={!!errors.content}>
            <FormLabel fontSize={'12px'}>Content (Markdown)</FormLabel>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your story content in Markdown format..."
              rows={20}
              fontFamily="mono"
              size="lg"
              fontSize={'14px'}
              borderRadius="md"
              sx={{ '::placeholder': { fontSize: '12px' } }}
            />
            {errors.content && <Text color="red.500" fontSize="sm" mt={1}>{errors.content}</Text>}
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel {...labelStyles}>Status</FormLabel>
            <RadioGroup
              value={formData.status}
              onChange={(value) =>
                setFormData({ ...formData, status: value as 'published' | 'draft' })
              }
            >
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <Radio value="draft" size="sm" w={{ base: 'full', sm: 'auto' }}>Draft</Radio>
                <Radio value="published" size="sm" w={{ base: 'full', sm: 'auto' }}>Published</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack spacing={4} justify={{ base: 'center', md: 'flex-end' }} mt={6} flexDirection={{ base: 'column', md: 'row' }}>
            <Button onClick={onCancel} isDisabled={isLoading} leftIcon={<FiX />} size="md" variant={'outline'} colorScheme='red' w={{ base: 'full', md: 'auto' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              leftIcon={<FiCheckCircle />}
              size="md"
              w={{ base: 'full', md: 'auto' }}
            >
              {story ? 'Update Story' : 'Create Story'}
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

