'use client';

import {
  Box,
  Flex,
  Link,
  Button,
  Container,
  Heading,
  useColorModeValue,
  IconButton,
  HStack,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { 
  FiHome, 
  FiLayout, 
  FiPlus, 
  FiMoon, 
  FiSun,
  FiBookOpen 
} from 'react-icons/fi';
import { useColorMode } from '@chakra-ui/react';

export function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" bg={bg} borderBottom="1px" borderColor={borderColor} py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <NextLink href="/" passHref legacyBehavior>
            <Link _hover={{ textDecoration: 'none' }}>
              <HStack spacing={2}>
                <Icon as={FiBookOpen} color="blue.500" boxSize={6} />
                <Heading size="md" color="blue.500">
                  TinesStories
                </Heading>
              </HStack>
            </Link>
          </NextLink>

          <Flex gap={4} align="center">
            <NextLink href="/" passHref legacyBehavior>
              <Link _hover={{ textDecoration: 'underline' }}>
                <HStack spacing={1}>
                  <Icon as={FiHome} />
                  <span>Home</span>
                </HStack>
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref legacyBehavior>
              <Link _hover={{ textDecoration: 'underline' }}>
                <HStack spacing={1}>
                  <Icon as={FiLayout} />
                  <span>Dashboard</span>
                </HStack>
              </Link>
            </NextLink>
            <NextLink href="/stories/new" passHref legacyBehavior>
              <Button colorScheme="blue" size="sm" leftIcon={<FiPlus />}>
                Create Story
              </Button>
            </NextLink>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

