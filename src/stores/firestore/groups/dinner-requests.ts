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
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';
import { collectionName as groupCollectionName } from '@/stores/firestore/groups';
import { getUserDocRef } from '@/stores/firestore/users';

const mainCollectionName = groupCollectionName;
const subCollectionName = 'dinner_requests';

export const getDinnerRequestsRef = (groupUid: string) =>
  collection(db, mainCollectionName, groupUid, subCollectionName);

export const getDinnerRequestRef = (groupUid: string, requestUid: string) =>
  doc(db, mainCollectionName, groupUid, subCollectionName, requestUid);

export const getDBDinnerRequests = async (groupUid: string) => {
  const snapshot = await getDocs(getDinnerRequestsRef(groupUid));
  return snapshot;
};

export const getDBDinnerRequest = async (
  groupUid: string,
  requestUid: string
): Promise<DBDinnerRequest> => {
  return (
    await getDoc(getDinnerRequestRef(groupUid, requestUid))
  ).data() as DBDinnerRequest;
};

export const getDBDinnerRequestByUserUid = async (
  groupUid: string,
  userUid: string
): Promise<DBDinnerRequest[]> => {
  const userQuery = query(
    getDinnerRequestsRef(groupUid),
    where('createdBy', '==', getUserDocRef(userUid))
  );
  const docs = await getDocs(userQuery);

  if (docs.docs.length === 0) {
    throw new Error(
      `DinnerRequest matches userUid=${userUid} not found in groupUid=${groupUid}`
    );
  }

  return docs.docs.map((doc) => doc.data() as DBDinnerRequest);
};

export const addDBDinnerRequest = async (
  groupUid: string,
  data: Omit<DBDinnerRequest, 'uid'>
): Promise<DocumentReference> => {
  const docRef = await addDoc(getDinnerRequestsRef(groupUid), data);
  await updateDoc(docRef, { uid: docRef.id });
  return docRef;
};

export const setDBDinnerRequest = async (
  groupUid: string,
  requestUid: string,
  data: DBDinnerRequest
): Promise<void> => {
  const docRef = getDinnerRequestRef(groupUid, requestUid);
  return await setDoc(docRef, data);
};

export const updateDBDinnerRequest = async (
  groupUid: string,
  requestUid: string,
  data: Partial<DBDinnerRequest>
): Promise<void> => {
  const docRef = getDinnerRequestRef(groupUid, requestUid);
  return await updateDoc(docRef, data);
};

export const existsDBDinnerRequest = async (
  groupUid: string,
  requestUid: string
): Promise<boolean> => {
  const docRef = getDinnerRequestRef(groupUid, requestUid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const existsDBDinnerRequestByUserUid = async (
  groupUid: string,
  userUid: string,
  exceptRequestUid?: string
): Promise<boolean> => {
  let userQuery = query(
    getDinnerRequestsRef(groupUid),
    where('createdBy', '==', getUserDocRef(userUid))
  );
  const docs = await getDocs(userQuery);
  if (exceptRequestUid) {
    return docs.docs.some((doc) => doc.id !== exceptRequestUid);
  } else {
    return docs.docs.length > 0;
  }
};
