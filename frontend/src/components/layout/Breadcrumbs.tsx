'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@chakra-ui/react';
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
      <Breadcrumb>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} isCurrentPage={index === items.length - 1}>
            {item.href && index < items.length - 1 ? (
              <NextLink href={item.href} passHref legacyBehavior>
                <BreadcrumbLink>{item.label}</BreadcrumbLink>
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

