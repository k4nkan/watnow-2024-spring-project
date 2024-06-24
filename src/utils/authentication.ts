import { useToast } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { useCallback } from 'react';

export const useSignOut = () => {
  const toast = useToast();
  const signOut = useCallback(async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast({
          title: 'ログアウトに失敗しました',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  }, [toast]);

  return signOut;
};
