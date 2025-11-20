'use client';

import { Badge, HStack, Icon } from '@chakra-ui/react';
import { FiCheckCircle, FiFileText } from 'react-icons/fi';

interface StatusBadgeProps {
  status: 'published' | 'draft';
  isCard?: boolean;
}

export function StatusBadge({ status, isCard = false }: StatusBadgeProps) {
  return (
    <Badge
      colorScheme={status === 'published' ? 'green' : isCard ? 'gray' : 'gray.50'}
      px={2}
      py={1}
      borderRadius="md"
      border="1px solid"
      borderColor={status === 'published' ? 'green.500' : isCard ? 'gray.500' : 'gray.300'}
    >
      <HStack spacing={1}>
        <Icon as={status === 'published' ? FiCheckCircle : FiFileText} boxSize={3} />
        <span>{status === 'published' ? 'Published' : 'Draft'}</span>
      </HStack>
    </Badge>
  );
}

