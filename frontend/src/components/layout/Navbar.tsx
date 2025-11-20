'use client';

import {
  Box,
  Flex,
  Link,
  Button,
  Container,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box as="nav" bg={bg} borderBottom="1px" borderColor={borderColor} py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <NextLink href="/" passHref legacyBehavior>
            <Link _hover={{ textDecoration: 'none' }}>
              <Heading size="md" color="blue.600">
                TinesStories
              </Heading>
            </Link>
          </NextLink>

          <Flex gap={4} align="center">
            <NextLink href="/" passHref legacyBehavior>
              <Link _hover={{ textDecoration: 'underline' }}>Home</Link>
            </NextLink>
            <NextLink href="/dashboard" passHref legacyBehavior>
              <Link _hover={{ textDecoration: 'underline' }}>Dashboard</Link>
            </NextLink>
            <NextLink href="/stories/new" passHref legacyBehavior>
              <Button colorScheme="blue" size="sm">
                Create Story
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

