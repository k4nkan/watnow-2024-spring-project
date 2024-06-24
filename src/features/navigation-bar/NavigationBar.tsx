'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useSignOut } from '@/utils/authentication';
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const NavigationBar = () => {
  const { currentUser } = useCurrentUser();
  const signOut = useSignOut();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    signOut();
    router.push('/signin');
  }, [router, signOut]);

  return (
    <HStack h={20} w={'100%'} p={5} justify={'space-between'}>
      <Spacer />
      <Menu>
        <MenuButton>
          <Avatar
            size="sm"
            name={currentUser?.displayName ?? 'not signed in'}
            src={currentUser?.avatarUrl ?? ''}
            tabIndex={0}
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
