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

export type updateRequestProps = Omit<
  DBDinnerRequest,
  'uid' | 'createdAt' | 'createdBy' | 'deletedAt' | 'date'
>;

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

  const _addRequest = useCallback(
    async (
      data: Omit<
        DBDinnerRequest,
        'uid' | 'createdAt' | 'createdBy' | 'deletedAt' | 'date'
      >
    ) => {
      if (currentGroup === 'loading' || authUser === null) {
        console.error('currentGroup or authUser is loading');
        return;
      }
      if (exists === 'loading') {
        console.error('exists is loading');
        return;
      }
      if (exists === true) {
        console.error('request already exists');
        return;
      }
      if (currentGroup === null) {
        console.error('currentGroup is null');
        return;
      }
      const newRequest = {
        ...data,
        createdAt: Timestamp.now(),
        createdBy: getUserDocRef(authUser.uid),
        deletedAt: null,
        date: todayTimestamp
      };
      await addDBDinnerRequest(currentGroup.uid, newRequest);
    },
    [currentGroup, authUser, exists, todayTimestamp]
  );

  const updateRequest = useCallback(
    async (
      data: Omit<
        DBDinnerRequest,
        'uid' | 'createdAt' | 'createdBy' | 'deletedAt' | 'date'
      >
    ) => {
      if (dinnerRequest === 'loading') {
        console.error('dinnerRequest is loading');
        return;
      } else if (dinnerRequest === null) {
        _addRequest(data);
        return;
      }
      const requestUid = dinnerRequest?.uid;
      if (
        currentGroup === null ||
        currentGroup === 'loading' ||
        authUser === null ||
        exists === 'loading'
      ) {
        console.error('currentGroup or authUser or exists is null or loading');
        return;
      }
      if (exists === false) {
        _addRequest(data);
      }
      await updateDBDinnerRequest(currentGroup.uid, requestUid, data);
    },
    [dinnerRequest, currentGroup, authUser, exists, _addRequest]
  );

  return { dinnerRequest, exists, updateRequest };
};

export default useMyDinnerRequest;
