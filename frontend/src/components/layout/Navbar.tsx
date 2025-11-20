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
  useColorMode,
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

export function Navbar() {
  const bg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      backdropFilter="blur(10px)"
      boxShadow="sm"
      width="100%"
    >
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
              aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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

