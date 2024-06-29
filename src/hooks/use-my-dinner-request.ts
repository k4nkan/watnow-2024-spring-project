import { useEffect, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import {
  dbMyDinnerRequestState,
  dbMyDinnerRequestExistsState
} from '@/states/db/my-dinner-request';
import { dbGroupState } from '@/states/db/current-group';
import {
  addDBDinnerRequest,
  updateDBDinnerRequest,
  getDinnerRequestsRef
} from '@/stores/firestore/groups/dinner-requests';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';
import useAuthUser from './use-auth-user';
import { getUserDocRef } from '@/stores/firestore/users';

const useMyDinnerRequest = () => {
  const [dinnerRequest, setDinnerRequest] = useAtom(dbMyDinnerRequestState);
  const [exists, setExists] = useAtom(dbMyDinnerRequestExistsState);
  const [currentGroup] = useAtom(dbGroupState);
  const { authUser } = useAuthUser();

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const todayTimestamp = useMemo(() => Timestamp.fromDate(today), [today]);

  useEffect(() => {
    if (
      currentGroup === null ||
      currentGroup === 'loading' ||
      authUser === null
    )
      return;

    const unsubscribe = onSnapshot(
      getDinnerRequestsRef(currentGroup.uid),
      (snapshot) => {
        const requests = snapshot.docs
          .map((doc) => doc.data() as DBDinnerRequest)
          .filter(
            (request) =>
              request.date.toDate().toDateString() === today.toDateString() &&
              request.createdBy.id === authUser.uid
          );

        if (requests.length > 0) {
          setDinnerRequest(requests[0]);
          setExists(true);
        } else {
          setDinnerRequest(null);
          setExists(false);
        }
      }
    );

    return () => unsubscribe();
  }, [currentGroup, authUser, setDinnerRequest, setExists, today]);

  const addRequest = useCallback(
    async (
      data: Omit<DBDinnerRequest, 'uid' | 'createdAt' | 'createdBy' | 'date'>
    ) => {
      if (
        currentGroup === null ||
        currentGroup === 'loading' ||
        authUser === null
      )
        return;
      const newRequest = {
        ...data,
        createdAt: Timestamp.now(),
        createdBy: getUserDocRef(authUser.uid),
        date: todayTimestamp
      };
      await addDBDinnerRequest(currentGroup.uid, newRequest);
    },
    [currentGroup, authUser, todayTimestamp]
  );

  const updateRequest = useCallback(
    async (requestUid: string, data: Partial<DBDinnerRequest>) => {
      if (
        currentGroup === null ||
        currentGroup === 'loading' ||
        authUser === null
      )
        return;
      await updateDBDinnerRequest(currentGroup.uid, requestUid, data);
    },
    [currentGroup, authUser]
  );

  return { dinnerRequest, exists, addRequest, updateRequest };
};

export default useMyDinnerRequest;
