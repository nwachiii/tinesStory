'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiLayout } from 'react-icons/fi';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { StatusBadge } from '@/components/common/StatusBadge';
import { apiClient } from '@/lib/api';
import { Story } from '@/types/story';
import { formatDate } from '@/lib/dateUtils';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export default function DashboardPage() {
  const router = useRouter();
  const toast = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getStories({ status: 'all', limit: 1000 });
        setStories(response.stories);
        setFilteredStories(response.stories);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load stories',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [toast]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = stories.filter((story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStories(filtered);
    } else {
      setFilteredStories(stories);
    }
  }, [searchQuery, stories]);

  const handleEdit = (story: Story) => {
    router.push(`/stories/${story.slug}/edit`);
  };

  const handleView = (story: Story) => {
    router.push(`/stories/${story.slug}`);
  };

  const handleDelete = (story: Story) => {
    setStoryToDelete(story);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!storyToDelete) return;

    try {
      await apiClient.deleteStory(storyToDelete._id);
      toast({
        title: 'Success',
        description: 'Story deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Refresh stories
      const response = await apiClient.getStories({ status: 'all', limit: 1000 });
      setStories(response.stories);
      setFilteredStories(response.stories);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete story',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setStoryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setStoryToDelete(null);
  };

  return (
    <Box minH="100vh">
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
      />
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={6}>
          <HStack spacing={2}>
            <Icon as={FiLayout} boxSize={6} />
            <Heading size="lg">Dashboard</Heading>
          </HStack>
          <Button
            colorScheme="blue"
            onClick={() => router.push('/stories/new')}
            leftIcon={<FiPlus />}
          >
            Create New Story
          </Button>
        </HStack>

        <InputGroup mb={6} maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={IoSearchOutline} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search stories by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Status</Th>
                  <Th>Created Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStories.length === 0 ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8}>
                      <VStack spacing={2}>
                        <Icon as={FiLayout} boxSize={8} color="gray.400" />
                        <Text color="gray.500">No stories found</Text>
                      </VStack>
                    </Td>
                  </Tr>
                ) : (
                  filteredStories.map((story) => (
                    <Tr key={story._id}>
                      <Td>
                        <Box
                          as="button"
                          onClick={() => handleView(story)}
                          textAlign="left"
                          _hover={{ color: 'blue.500', textDecoration: 'underline' }}
                        >
                          {story.title}
                        </Box>
                      </Td>
                      <Td>{story.authorName}</Td>
                      <Td>
                        <StatusBadge status={story.status} />
                      </Td>
                      <Td>{formatDate(story.createdAt)}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => handleView(story)}
                            leftIcon={<FiEye />}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="green"
                            variant="outline"
                            onClick={() => handleEdit(story)}
                            leftIcon={<FiEdit />}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => handleDelete(story)}
                            leftIcon={<FiTrash2 />}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        )}
      </Container>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Story"
        message={`Are you sure you want to delete "${storyToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColorScheme="red"
      />
    </Box>
  );
}

