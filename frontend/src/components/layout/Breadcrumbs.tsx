'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Icon, HStack } from '@chakra-ui/react';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import NextLink from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Container maxW="container.xl" py={4}>
      <Breadcrumb separator={<Icon as={FiChevronRight} color="gray.500" />}>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} isCurrentPage={index === items.length - 1}>
            {item.href && index < items.length - 1 ? (
              <NextLink href={item.href} passHref legacyBehavior>
                <BreadcrumbLink>
                  {item.label === 'Home' ? (
                    <HStack spacing={1}>
                      <Icon as={FiHome} />
                      <span>{item.label}</span>
                    </HStack>
                  ) : (
                    item.label
                  )}
                </BreadcrumbLink>
              </NextLink>
            ) : (
              <BreadcrumbLink isCurrentPage>{item.label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Container>
  );
}

