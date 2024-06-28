'use client';

import PageDownButton from '@/components/PageDownButton';
import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useScrollButton } from '@/hooks/use-scroll-button';
import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  const {
    setAvailablePages,
    handleScroll,
    registerResizeObserver,
    scrollTarget
  } = useScrollButton();

  useEffect(() => {
    setAvailablePages(['/home']);
  }, [setAvailablePages]);

  useEffect(() => {
    if (!loadingCurrentUser) {
      if (currentUser === null) {
        router.replace('/signin');
      } else {
        setSignedIn(true);
      }
    }
  }, [loadingCurrentUser, currentUser, router]);

  const handleClickScroll = useCallback(() => {
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTarget]);

  return (
    <Box h={'100svh'} w={'100%'}>
      {!signedIn ? (
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
              registerResizeObserver(element, 'outer');
            }}
            zIndex={0}
          >
            <div
              ref={(element) => {
                registerResizeObserver(element, 'inner');
              }}
            >
              {children}
            </div>
          </Box>
          <PageDownButton zIndex={10} onClick={handleClickScroll} />
          <TabBar zIndex={20} />
        </VStack>
      )}
    </Box>
  );
}
