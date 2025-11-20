'use client';

import { Badge } from '@chakra-ui/react';

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
      {status === 'published' ? 'Published' : 'Draft'}
    </Badge>
  );
}

