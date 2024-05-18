import { postDocRef, getAllDBPosts } from '@/stores/firestore/posts';
import { DBHookProps } from '@/types/db-hooks-props';
import { DBPost } from '@/types/db-post';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useDBPosts = (options: DBHookProps) => {
  const [posts, setPosts] = useState<DBPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!options.realtime) {
      getAllDBPosts().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    } else {
      const postQuery = query(postDocRef, orderBy('createdAt', 'desc'));
      onSnapshot(postQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => doc.data() as DBPost);
        setPosts(posts);
        setLoading(false);
      });
    }
  }, [options.realtime]);

  return { posts, loading };
};
