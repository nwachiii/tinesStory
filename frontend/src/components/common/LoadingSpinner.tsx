'use client';

import { Spinner, Box, Center } from '@chakra-ui/react';

export function LoadingSpinner() {
  return (
    <Center py={20}>
      <Spinner size="xl" color="blue.500" thickness="4px" />
    </Center>
  );
}

