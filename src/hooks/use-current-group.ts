import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { dbGroupState, dbGroupUidState } from '@/states/db/current-group';
import { getDBGroup, getGroupRef } from '@/stores/firestore/groups';
import { onSnapshot } from 'firebase/firestore';
import { DBGroup } from '@/types/db-group';
import { DBHookProps } from '@/types/db-hooks-props';

const useCurrentGroup = (options?: DBHookProps) => {
  const [currentGroup, setCurrentGroup] = useAtom(dbGroupState);
  const [currentGroupUid, setCurrentGroupUid] = useAtom(dbGroupUidState);

  useEffect(() => {
    if (currentGroupUid === null) {
      console.warn('currentGroupUid is null');
      return;
    }

    if (options?.realtime) {
      const unsubscribe = onSnapshot(
        getGroupRef(currentGroupUid),
        (snapshot) => {
          const group = snapshot.data() as DBGroup;
          setCurrentGroup(group);
        }
      );
      return () => unsubscribe();
    } else {
      getDBGroup(currentGroupUid).then((group) => {
        setCurrentGroup(group);
      });
    }
  }, [currentGroupUid, options?.realtime, setCurrentGroup]);

  const changeGroup = useCallback(
    (uid: string) => {
      setCurrentGroupUid(uid);
    },
    [setCurrentGroupUid]
  );

  return { currentGroup, changeGroup };
};

export default useCurrentGroup;
