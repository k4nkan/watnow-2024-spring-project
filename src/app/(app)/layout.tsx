import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import { Box, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Box h={'100vh'} w={'100%'}>
      <VStack justify={'space-between'} h={'100%'} w={'100%'}>
        <NavigationBar />
        <Box overflow={'auto'} h={'100%'} w={'100%'}>
          {children}
        </Box>
        <TabBar />
      </VStack>
    </Box>
  );
}
