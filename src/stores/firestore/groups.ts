import { db } from '@/utils/firebase';
import {
  DocumentReference,
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { DBGroup } from '@/types/db-group';

export const collectionName = 'groups';

export const groupsRef = collection(db, collectionName);
export const getGroupRef = (uid: string) => doc(db, collectionName, uid);

export const getDBGroups = async () => {
  const snapshot = await getDocs(groupsRef);
  return snapshot;
};

export const getDBGroup = async (uid: string): Promise<DBGroup> => {
  return (await getDoc(doc(db, collectionName, uid))).data() as DBGroup;
};

export const setDBGroup = async (uid: string, data: DBGroup): Promise<void> => {
  const docRef = doc(db, collectionName, uid);
  return await setDoc(docRef, data);
};

export const findDBGroupsByRefs = async (
  groupRefs: DocumentReference[]
): Promise<DBGroup[]> => {
  const promises: Promise<DocumentSnapshot>[] = [];
  for (const docRef of groupRefs) {
    const group = getDoc(docRef);
    promises.push(group);
  }
  const groups = await Promise.all(promises);
  const result: DBGroup[] = [];
  groups.forEach((group) => {
    if (group.exists()) {
      result.push(group.data() as DBGroup);
    }
  });
  return result;
};

export const updateDBGroup = async (
  uid: string,
  data: Partial<DBGroup>
): Promise<void> => {
  const docRef = doc(db, collectionName, uid);
  return await updateDoc(docRef, data);
};

export const existsDBGroup = async (uid: string): Promise<boolean> => {
  const docRef = doc(db, collectionName, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
