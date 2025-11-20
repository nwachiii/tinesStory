'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, useToast } from '@chakra-ui/react';
import { Navbar } from '@/components/layout/Navbar';
import { StoryDetail } from '@/components/stories/StoryDetail';
import { StoryDetailSkeleton } from '@/components/common/skeletons';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { apiClient } from '@/lib/api';
import { Story } from '@/types/story';

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
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
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStory();
    }
  }, [slug, router, toast]);

  const handleEdit = () => {
    if (story) {
      router.push(`/stories/${story.slug}/edit`);
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
      router.push('/');
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
        <StoryDetailSkeleton />
      </Box>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <StoryDetail
        story={story}
        onEdit={handleEdit}
        onDelete={() => setDeleteDialogOpen(true)}
        showActions
      />
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

