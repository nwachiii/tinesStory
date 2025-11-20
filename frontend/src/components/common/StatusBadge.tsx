'use client';

import { Badge, HStack, Icon } from '@chakra-ui/react';
import { FiCheckCircle, FiFileText } from 'react-icons/fi';

interface StatusBadgeProps {
  status: 'published' | 'draft';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      colorScheme={status === 'published' ? 'green' : 'gray'}
      px={2}
      py={1}
      borderRadius="md"
    >
      <HStack spacing={1}>
        <Icon as={status === 'published' ? FiCheckCircle : FiFileText} boxSize={3} />
        <span>{status === 'published' ? 'Published' : 'Draft'}</span>
      </HStack>
    </Badge>
  );
}

