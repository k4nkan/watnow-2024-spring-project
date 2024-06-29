import { DBGroup } from '@/types/db-group';
import { db } from '@/utils/firebase';
import {
  DocumentReference,
  arrayUnion,
  doc,
  runTransaction
} from 'firebase/firestore';
import { groupsRef } from '@/stores/firestore/groups';
import { usersRef } from '@/stores/firestore/users';

export const createGroupByUser = async (
  groupData: Omit<DBGroup, 'uid'>,
  createdByUserUid: string
): Promise<DocumentReference | undefined> => {
  let newGroupDocRef;
  await runTransaction(db, async (transaction) => {
    const groupColRef = groupsRef;
    newGroupDocRef = doc(groupColRef); // 新しいグループドキュメントの参照を作成
    const userDocRef = doc(usersRef, createdByUserUid); // ユーザードキュメントの参照を取得

    // トランザクションで新しいグループをgroupsコレクションに追加
    transaction.set(newGroupDocRef, groupData);
    transaction.update(newGroupDocRef, {
      uid: newGroupDocRef.id
    });

    // ユーザードキュメントのgroupsフィールドに新しいグループのDocumentReferenceを追加
    transaction.update(userDocRef, {
      groups: arrayUnion(newGroupDocRef)
    });

    console.log('Transaction successfully committed');
  });
  return newGroupDocRef;
};

// idea:
// export const removeUserFromGroup = async (
