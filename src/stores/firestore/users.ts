import { db } from '@/utils/firebase';
import { DBUser } from '@/types/db-user';
import {
  DocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';

export const dbUsersCollectionName = 'users';

type Data = Omit<DBUser, 'uid'>;

const docConverter = {
  toFirestore: (user: DBUser): Data => {
    const { uid, ...data } = user;
    return data;
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: any): DBUser => {
    const data = snapshot.data(options) as any;
    const dataWithUid = { ...data, uid: snapshot.id } as DBUser;
    return dataWithUid;
  }
};

export const userDocRef = collection(db, dbUsersCollectionName).withConverter(
  docConverter
);

export const getUserDocRef = (uid: string) =>
  doc(db, dbUsersCollectionName, uid);

export const createDBUser = async (
  data: Omit<Data, 'createdAt'>,
  uid: string
) => {
  const newDocRef = doc(userDocRef, uid);
  const sendData: Data = { ...data, createdAt: Timestamp.now() };
  await setDoc(newDocRef, sendData);
};

export const getAllDBUsers = async () => {
  const snapshot = await getDocs(userDocRef);
  const users: DBUser[] = snapshot.docs.map((doc) => doc.data());
  return users;
};

export const getDBUser = async (uid: string): Promise<DBUser> => {
  const snapshot = await getDoc(getUserDocRef(uid));
  return snapshot.data() as DBUser;
};

export const updateDBUser = async (uid: string, user: Partial<Data>) => {
  await updateDoc(getUserDocRef(uid), user);
};

export const existsDBUser = async (uid: string) => {
  const snapshot = await getDoc(getUserDocRef(uid));
  return snapshot.exists();
};
