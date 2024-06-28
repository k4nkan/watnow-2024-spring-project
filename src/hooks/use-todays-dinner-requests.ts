import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import {
  dbTodaysDinnerRequestsState,
  dbTodaysDinnerRequestsSummaryState
} from '@/states/db/todays-dinner-requests';
import { dbGroupState } from '@/states/db/current-group';
import { getDinnerRequestsRef } from '@/stores/firestore/groups/dinner-requests';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';

const useTodaysDinnerRequests = () => {
  const [dinnerRequests, setDinnerRequests] = useAtom(
    dbTodaysDinnerRequestsState
  );
  const [summary, setSummary] = useAtom(dbTodaysDinnerRequestsSummaryState);
  const [currentGroup] = useAtom(dbGroupState);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const todayTimestamp = useMemo(() => Timestamp.fromDate(today), [today]);

  useEffect(() => {
    if (currentGroup === null || currentGroup === 'loading') return;

    const unsubscribe = onSnapshot(
      getDinnerRequestsRef(currentGroup.uid),
      (snapshot) => {
        const requests = snapshot.docs
          .map((doc) => doc.data() as DBDinnerRequest)
          .filter(
            (request) =>
              request.date.toDate().toDateString() === today.toDateString()
          );
        setDinnerRequests(requests);

        const totalPortions = requests.reduce(
          (total, request) => total + request.portions,
          0
        );
        const totalRequests = requests.length;
        const additionalRequests = requests
          .map((request) => request.additionalRequests || '')
          .filter(Boolean);

        setSummary({ totalRequests, totalPortions, additionalRequests });
      }
    );

    return () => unsubscribe();
  }, [currentGroup, setDinnerRequests, setSummary, today]);

  return { dinnerRequests, summary };
};

export default useTodaysDinnerRequests;
