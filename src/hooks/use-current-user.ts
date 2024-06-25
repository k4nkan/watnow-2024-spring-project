import { getDBUser, getUserDocRef } from '@/stores/firestore/users';
import { DBHookProps } from '@/types/db-hooks-props';
import { DBUser } from '@/types/db-user';
import { useEffect, useMemo, useState } from 'react';
import useAuthUser from './use-auth-user';
import { onSnapshot } from 'firebase/firestore';

export const useCurrentUser = (options?: DBHookProps) => {
  const [currentUser, setCurrentUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { authUser, loading: isAuthUserLoading } = useAuthUser();
  const realtime = options?.realtime ?? false;

  useEffect(() => {
    // Authenticationがログイン状態を取得した時
    if (authUser !== null) {
      if (realtime) {
        getDBUser(authUser.uid).then((user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        onSnapshot(getUserDocRef(authUser?.uid), (snapshot) => {
          const user = snapshot.data() as DBUser;
          setCurrentUser(user);
          setLoading(false);
        });
      }
    } else {
      !isAuthUserLoading && setLoading(false);
    }
  }, [authUser, isAuthUserLoading, realtime]);

  return useMemo(() => ({ currentUser, loading }), [currentUser, loading]);
};
