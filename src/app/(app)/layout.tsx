'use client';

import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();
  const [viewAvailable, setViewAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loadingCurrentUser) {
      if (currentUser === null) {
        router.replace('/signin');
      } else {
        setViewAvailable(true);
      }
    }
  }, [loadingCurrentUser, currentUser, router]);

  return (
    <Box h={'100vh'} w={'100%'}>
      {loadingCurrentUser || !viewAvailable ? (
        <Center h={'100%'} w={'100%'}>
          <Spinner />
        </Center>
      ) : (
        <VStack justify={'space-between'} h={'100%'} w={'100%'}>
          <NavigationBar />
          <Box overflow={'auto'} h={'100%'} w={'100%'}>
            {children}
          </Box>
          <TabBar />
        </VStack>
      )}
    </Box>
  );
}
