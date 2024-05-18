'use client';
import { auth, googleAuthProvider } from '@/utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).then((result) => {
      router.push('/firestore');
    });
  };

  return (
    <>
      <div className="h-screen w-screen bg-slate-100">
        <div className="mx-auto max-w-lg pt-20">
          <form
            className="flex flex-col gap-y-6 rounded-lg bg-white px-8 pb-8 pt-6"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl font-bold">Sign In</h1>
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
            </div>
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                disabled
              />
            </div>
            <div className=" flex items-center justify-between">
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-slate-300"
                type="submit"
                disabled
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="">
              <hr />
              <div className="mx-auto w-fit">
                <p className="-mt-3 w-fit bg-white px-3 text-center text-sm text-gray-500">
                  or sign in with
                </p>
              </div>
            </div>
            <button
              className="flex w-fit items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 font-bold outline-2"
              type="button"
              onClick={handleSignInWithGoogle}
            >
              <svg
                className="-ml-1 mr-2 size-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-gray-500">
            &copy;2024 sanchezyspace
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
