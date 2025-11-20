'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, Heading, HStack, Button, useToast, Icon } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { StoryForm } from '@/components/stories/StoryForm';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { apiClient } from '@/lib/api';
import { Story, UpdateStoryDto } from '@/types/story';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function EditStoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getStoryBySlug(slug);
        setStory(response.story);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load story',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStory();
    }
  }, [slug, router, toast]);

  const handleSubmit = async (data: UpdateStoryDto) => {
    if (!story) return;

    try {
      setIsLoading(true);
      const response = await apiClient.updateStory(story._id, data);
      toast({
        title: 'Success',
        description: 'Story updated successfully',
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
    if (story) {
      router.push(`/stories/${story.slug}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleDelete = async () => {
    if (!story) return;

    try {
      setDeleting(true);
      await apiClient.deleteStory(story._id);
      toast({
        title: 'Success',
        description: 'Story deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete story',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box minH="100vh">
        <Navbar />
        <LoadingSpinner />
      </Box>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Edit Story' },
        ]}
      />
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={6}>
          <HStack spacing={2}>
            <Icon as={FiEdit} boxSize={6} />
            <Heading size="lg">Edit Story</Heading>
          </HStack>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setDeleteDialogOpen(true)}
            isDisabled={isLoading || deleting}
            leftIcon={<FiTrash2 />}
          >
            Delete Story
          </Button>
        </HStack>
        <StoryForm
          story={story}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Container>
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColorScheme="red"
      />
    </Box>
  );
}

