import { VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export const Section = ({ children }: PropsWithChildren) => {
  return (
    <VStack gap={3} w={'100%'}>
      {children}
    </VStack>
  );
};
