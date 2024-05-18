'use client';

import useAuthUser from '@/hooks/use-auth-user';
import { createDBUser, existsDBUser } from '@/stores/firestore/users';
import { auth } from '@/utils/firebase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { authUser, loading: authLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (authUser === null && !authLoading) {
      router.push('/signin');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (authUser !== null) {
      existsDBUser(authUser?.uid).then((exists) => {
        if (!exists) {
          createDBUser(
            {
              userName: '',
              displayName: authUser.displayName,
              email: authUser.email,
              avatarUrl: authUser.photoURL
            },
            authUser.uid
          );
        }
      });
    }
  }, [authUser, router]);

  return (
    <div className="flex w-full flex-col">
      <header className="flex h-16 content-center items-center bg-black px-6 text-neutral-200">
        {authLoading ? (
          <p>loading auth information...</p>
        ) : authUser !== null ? (
          <div className="flex w-full items-center justify-between text-sm">
            <div className="flex items-center gap-5">
              <Image
                width={32}
                height={32}
                alt="profile image"
                src={authUser?.photoURL ?? ''}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-bold">{authUser?.displayName}</p>
                <p className="text-xs text-stone-400">{authUser?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                auth.signOut();
              }}
              className="ml-4 rounded bg-stone-700 px-4 py-1"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between text-sm">
            <p>Not logged in</p>
            <button
              onClick={() => {
                router.push('/signin');
              }}
              className="ml-4 rounded bg-stone-700 px-4 py-1"
            >
              Sign in
            </button>
          </div>
        )}
      </header>
      <div className="mx-auto w-full max-w-xl px-6 py-12">{children}</div>
    </div>
  );
}
