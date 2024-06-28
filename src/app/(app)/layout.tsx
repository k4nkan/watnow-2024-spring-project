'use client';

import PageDownButton from '@/components/PageDownButton';
import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  PropsWithChildren,
  UIEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();
  const [viewAvailable, setViewAvailable] = useState(false);
  const router = useRouter();
  const [isTop, setIsTop] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const handleScroll: UIEventHandler = (uiEvent) => {
    if (uiEvent.target instanceof HTMLElement) {
      if (uiEvent.target.scrollTop !== 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }
  };

  const handleAppearScrollableAppContainer = (
    element: HTMLDivElement | null
  ) => {
    if (element) {
      resizeObserver.current = new ResizeObserver(() => {
        setIsScrollable(element.scrollHeight > element.clientHeight);
      });
      resizeObserver.current.observe(element);
    } else {
      resizeObserver.current?.disconnect();
    }
  };

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
            onScroll={(e) => handleScroll(e)}
            ref={handleAppearScrollableAppContainer}
            zIndex={0}
          >
            <div ref={handleAppearScrollableAppContainer}>{children}</div>
          </Box>
          <PageDownButton zIndex={10} show={isTop && isScrollable} />
          <TabBar zIndex={20} />
        </VStack>
      )}
    </Box>
  );
}
