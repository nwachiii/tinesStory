'use client';

import { HStack, Button, Text, Icon } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
  );

  return (
    <HStack spacing={4} justify="center" py={8}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        size="sm"
        leftIcon={<FiChevronLeft />}
      >
        Previous
      </Button>

      <HStack spacing={2}>
        {visiblePages.map((page, index) => {
          if (index > 0 && page - visiblePages[index - 1] > 1) {
            return (
              <HStack key={`ellipsis-${page}`} spacing={2}>
                <Text>...</Text>
                <Button
                  onClick={() => onPageChange(page)}
                  colorScheme={currentPage === page ? 'blue' : 'gray'}
                  size="sm"
                >
                  {page}
                </Button>
              </HStack>
            );
          }
          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              colorScheme={currentPage === page ? 'blue' : 'gray'}
              size="sm"
            >
              {page}
            </Button>
          );
        })}
      </HStack>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        size="sm"
        rightIcon={<FiChevronRight />}
      >
        Next
      </Button>
    </HStack>
  );
}

