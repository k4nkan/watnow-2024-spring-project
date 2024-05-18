import '@/utils/firebase';
import { useEffect, useMemo, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

// a custom hook to get the current user object of firebase auth
const useAuthUser = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return useMemo(() => ({ authUser, loading }), [authUser, loading]);
};

export default useAuthUser;
