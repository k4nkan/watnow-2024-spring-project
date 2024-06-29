'use client';

import PageDownButton from '@/components/PageDownButton';
import TabBar from '@/components/TabBar';
import { NavigationBar } from '@/features/navigation-bar/NavigationBar';
import useAuthUser from '@/hooks/use-auth-user';
import useCurrentGroup from '@/hooks/use-current-group';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useScrollButton } from '@/hooks/use-scroll-button';
import {
  addDBMember,
  existsDBMember,
  existsDBMemberByUserUid
} from '@/stores/firestore/groups/members';
import { getUserDocRef } from '@/stores/firestore/users';
import { Box, Center, Spinner, VStack } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { currentUser, loading: loadingCurrentUser } = useCurrentUser();
  const { authUser } = useAuthUser();
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  // ページを更新したらとりあえず lBbYQHxvVjITTZdTUT7H を表示（別に参加はしてない）
  const { currentGroup, changeGroup } = useCurrentGroup();
  useEffect(() => {
    console.log(currentGroup);
    if (currentGroup === null) {
      changeGroup('lBbYQHxvVjITTZdTUT7H');
    } else {
      if (authUser !== null && currentGroup !== 'loading') {
        const data = {
          createdAt: Timestamp.fromDate(new Date()),
          user: getUserDocRef(authUser.uid)
        };
        existsDBMemberByUserUid(currentGroup.uid, authUser.uid).then(
          (exists) => {
            if (exists) {
              console.log('already exists');
              return;
            } else {
              console.log(currentGroup.uid, data);

              addDBMember(currentGroup.uid, data).then(() => {
                console.log('addDBMember done');
              });
            }
          }
        );
      }
    }
  }, [currentGroup, changeGroup, currentUser, authUser]);

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
