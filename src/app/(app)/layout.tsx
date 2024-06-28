'use client';

import PageDownButton from '@/components/PageDownButton';
import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useScrollButton } from '@/hooks/use-scroll-button';
import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();
  const [viewAvailable, setViewAvailable] = useState(false);
  const router = useRouter();

  const { handleScroll, callbackRefToObserve, setObserverMeasureTarget } =
    useScrollButton();

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
    <Box h={'100svh'} w={'100%'}>
      {loadingCurrentUser || !viewAvailable ? (
        <Center h={'100%'} w={'100%'}>
          <Spinner />
        </Center>
      ) : (
        <VStack justify={'space-between'} h={'100%'} w={'100%'}>
          <NavigationBar />
          <Box
            overflow={'auto'}
            h={'100%'}
            w={'100%'}
            onScroll={handleScroll}
            ref={(element) => {
              setObserverMeasureTarget(element);
              callbackRefToObserve(element);
            }}
            zIndex={0}
          >
            <div
              ref={(element) => {
                callbackRefToObserve(element);
              }}
            >
              {children}
            </div>
          </Box>
          <PageDownButton zIndex={10} />
          <TabBar zIndex={20} />
        </VStack>
      )}
    </Box>
  );
}
