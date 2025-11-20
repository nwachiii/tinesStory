'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Heading, useToast, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StoryForm } from '@/components/stories/StoryForm';
import { useCreateStory } from '@/lib/api';
import { CreateStoryDto, UpdateStoryDto } from '@/types/story';

export default function CreateStoryPage() {
  const router = useRouter();
  const toast = useToast();
  const createStoryMutation = useCreateStory();

  const handleSubmit = async (data: CreateStoryDto | UpdateStoryDto) => {
    try {
      const response = await createStoryMutation.mutateAsync(data as CreateStoryDto);
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
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Create Story' },
        ]}
      />
      <Container maxW="container.md" py={8}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          shadow="lg"
          borderRadius="xl"
          p={{base: 2, md: 8}}
          mx="auto"
        >
          <HStack spacing={3} my={3} pl={4}>
            <Heading size="lg" color={useColorModeValue('gray.800', 'white')}>
              Create New Story
            </Heading>
          </HStack>
          <StoryForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={createStoryMutation.isPending} />
        </Box>
      </Container>
    </Box>
  );
}

