import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  dbGroupMembersState,
  dbGroupMembersCountState
} from '@/states/db/current-group-members';
import { dbGroupState } from '@/states/db/current-group';
import { getMembersRef } from '@/stores/firestore/groups/members';
import { onSnapshot } from 'firebase/firestore';
import { DBGroupMember } from '@/types/groups/db-group-member';

const useCurrentGroupMembers = () => {
  const [groupMembers, setGroupMembers] = useAtom(dbGroupMembersState);
  const [membersCount, setMembersCount] = useAtom(dbGroupMembersCountState);
  const [currentGroup] = useAtom(dbGroupState);

  useEffect(() => {
    if (currentGroup === null || currentGroup === 'loading') return;

    const unsubscribe = onSnapshot(
      getMembersRef(currentGroup.uid),
      (snapshot) => {
        const members = snapshot.docs.map((doc) => doc.data() as DBGroupMember);
        setGroupMembers(members);
        setMembersCount(members.length);
      }
    );

    return () => unsubscribe();
  }, [currentGroup, setGroupMembers, setMembersCount]);

  return { groupMembers, membersCount };
};

export default useCurrentGroupMembers;
