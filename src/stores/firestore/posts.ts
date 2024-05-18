import { db } from '@/utils/firebase';
import { DBPost } from '@/types/db-post';
import {
  DocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';

export const dbPostCollectionName = 'posts';

// Remove uid field from Firestore document
type Data = Omit<DBPost, 'uid'>;

// Define Firestore document converter
const docConverter = {
  // Sending data without uid field
  toFirestore: (post: DBPost): Data => {
    const { uid, ...data } = post;
    return data;
  },

  // Getting data with uid property
  fromFirestore: (snapshot: DocumentSnapshot, options: any): DBPost => {
    const data = snapshot.data(options) as any;
    const dataWithUid = { ...data, uid: snapshot.id } as DBPost;
    return dataWithUid;
  }
};

// Get post collection reference with converter
export const postDocRef = collection(db, dbPostCollectionName).withConverter(
  docConverter
);

// Get specific post document reference with converter
export const getPostDocRef = (uid: string) =>
  doc(db, dbPostCollectionName, uid).withConverter(docConverter);

// Create a new post accepting args except createdAt field
export const createDBPost = async (post: Omit<Data, 'createdAt'>) => {
  // Add createdAt field
  const sendData = { ...post, createdAt: Timestamp.now() };
  await addDoc(postDocRef, sendData);
};

// Get specific post data by uid
export const getDBPost = async (uid: string) => {
  const snapshot = await getDoc(getPostDocRef(uid));
  return snapshot.data();
};

// Update specific post with a object includes partial fields
export const updateDBPost = async (uid: string, data: Partial<Data>) => {
  await updateDoc(getPostDocRef(uid), data);
};

// Delete specific post by uid
export const deleteDBPost = async (uid: string) => {
  await deleteDoc(getPostDocRef(uid));
};

// Check if specific post exists
export const existsDBPost = async (uid: string) => {
  const snapshot = await getDoc(getPostDocRef(uid));
  return snapshot.exists();
};

// Custom operations for DBPost /////////////////////////////////////////////
// Get all posts data
export const getAllDBPosts = async (): Promise<DBPost[]> => {
  const postQuery = query(postDocRef, orderBy('createdAt', 'desc'));
  const snapshots = await getDocs(postQuery);
  const posts: DBPost[] = snapshots.docs.map((doc) => doc.data());

  return posts;
};
