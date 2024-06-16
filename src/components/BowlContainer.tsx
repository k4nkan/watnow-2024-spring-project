import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const BowlContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box pos={'relative'} w={'143px'} h={'80px'} overflow={'hidden'}>
      <Image src={'/bowl_thin.svg'} width={143} height={80} alt="Bowl" />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -70%)"
        fontSize="2xl"
        fontWeight="bold"
        whiteSpace={'nowrap'}
      >
        {children}
      </Box>
    </Box>
  );
};
