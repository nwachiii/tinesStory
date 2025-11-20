'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Heading, useToast, HStack, Icon } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StoryForm } from '@/components/stories/StoryForm';
import { apiClient } from '@/lib/api';
import { CreateStoryDto } from '@/types/story';

export default function CreateStoryPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateStoryDto) => {
    try {
      setIsLoading(true);
      const response = await apiClient.createStory(data);
      toast({
        title: 'Success',
        description: 'Story created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/stories/${response.story.slug}`);
    } catch (error) {
      throw error; // Let StoryForm handle the error display
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <Box minH="100vh">
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Create Story' },
        ]}
      />
      <Container maxW="container.xl" py={8}>
        <HStack spacing={2} mb={6}>
          <Icon as={FiPlus} boxSize={6} />
          <Heading size="lg">
            Create New Story
          </Heading>
        </HStack>
        <StoryForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
      </Container>
    </Box>
  );
}

