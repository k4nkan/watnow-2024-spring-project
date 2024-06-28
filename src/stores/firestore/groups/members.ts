import { db } from '@/utils/firebase';
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { DBGroupMember } from '@/types/groups/db-group-member';
import { collectionName as groupCollectionName } from '@/stores/firestore/groups';
import { getUserDocRef } from '@/stores/firestore/users';

const mainCollectionName = groupCollectionName;
const subCollectionName = 'members';

export const getMembersRef = (groupUid: string) =>
  collection(db, mainCollectionName, groupUid, subCollectionName);

export const getMemberRef = (groupUid: string, memberUid: string) =>
  doc(db, mainCollectionName, groupUid, subCollectionName, memberUid);

export const getDBMembers = async (groupUid: string) => {
  const snapshot = await getDocs(getMembersRef(groupUid));
  return snapshot;
};

export const getDBMember = async (
  groupUid: string,
  memberUid: string
): Promise<DBGroupMember> => {
  return (
    await getDoc(getMemberRef(groupUid, memberUid))
  ).data() as DBGroupMember;
};

export const getDBMemberByUserUid = async (
  groupUid: string,
  userUid: string
): Promise<DBGroupMember> => {
  const userQuery = query(
    getMembersRef(groupUid),
    where('user', '==', getUserDocRef(userUid))
  );
  const docs = await getDocs(userQuery);

  if (docs.docs.length === 0) {
    throw new Error(
      `Member muches userUid=${userUid} not found in groupUid=${groupUid}`
    );
  }

  if (docs.docs.length > 1) {
    throw new Error(
      `Multiple members muches userUid=${userUid} found in groupUid=${groupUid}`
    );
  }

  return docs.docs[0].data() as DBGroupMember;
};

export const addDBMember = async (
  groupUid: string,
  data: Omit<DBGroupMember, 'uid'>
): Promise<DocumentReference> => {
  const docRef = await addDoc(getMembersRef(groupUid), data);
  updateDoc(docRef, { uid: docRef.id });
  return docRef;
};

export const setDBMember = async (
  groupUid: string,
  memberUid: string,
  data: DBGroupMember
): Promise<void> => {
  const docRef = getMemberRef(groupUid, memberUid);
  return await setDoc(docRef, data);
};

export const updateDBMember = async (
  groupUid: string,
  memberUid: string,
  data: Partial<DBGroupMember>
): Promise<void> => {
  const docRef = getMemberRef(groupUid, memberUid);
  return await updateDoc(docRef, data);
};

export const existsDBMember = async (
  groupUid: string,
  memberUid: string
): Promise<boolean> => {
  const docRef = getMemberRef(groupUid, memberUid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const existsDBMemberByUserUid = async (
  groupUid: string,
  userUid: string,
  exceptMemberUid?: string
): Promise<boolean> => {
  let userQuery = query(
    getMembersRef(groupUid),
    where('user', '==', getUserDocRef(userUid))
  );
  const docs = await getDocs(userQuery);
  if (exceptMemberUid) {
    return docs.docs.some((doc) => doc.id !== exceptMemberUid);
  } else {
    return docs.docs.length > 0;
  }
};
