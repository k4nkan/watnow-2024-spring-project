'use client';
import useAuthUser from '@/hooks/use-auth-user';
import { useDBPosts } from '@/hooks/use-db-posts';
import { createDBPost } from '@/stores/firestore/posts';
import { getDBUser, getUserDocRef } from '@/stores/firestore/users';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';

type Post = {
  createdAt: Date;
  authorAvatarUrl: string;
  authorName: string;
  content: string;
};

const formatRelativeTime = (inputDate: Date) => {
  const currentDate = new Date();
  const diff = currentDate.getTime() - inputDate.getTime();

  const seconds = Math.floor(diff / 1000); // 1秒は1000ミリ秒
  const minutes = Math.floor(diff / 60000); // 1分は60000ミリ秒
  const hours = Math.floor(diff / 3600000); // 1時間は3600000ミリ秒
  const days = Math.floor(diff / 86400000); // 1日は86400000ミリ秒

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

const Page = () => {
  const [content, setContent] = useState('');
  const { authUser } = useAuthUser();
  const { posts, loading: dbPostLoading } = useDBPosts({ realtime: true });
  const [formattedPosts, setFormattedPosts] = useState<Post[]>([]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!authUser) return;
    createDBPost({
      createdBy: getUserDocRef(authUser.uid),
      deletedAt: null,
      title: '',
      content: content,
      tags: [],
      likedBy: [],
      comments: []
    });
    setContent('');
  };

  useEffect(() => {
    Promise.all(
      posts.map(async (post): Promise<Post> => {
        const author = await getDBUser(post.createdBy.id);
        return {
          authorAvatarUrl: author.avatarUrl ?? '',
          authorName: author.displayName ?? '',
          content: post.content,
          createdAt: post.createdAt.toDate()
        };
      })
    ).then((formattedPosts) => {
      setFormattedPosts(formattedPosts);
    });
  }, [posts]);

  return (
    <div>
      <form onSubmit={submitHandler} className="mb-4 flex flex-col items-end">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 p-2"
        />
        <button
          type="submit"
          disabled={content.trim() === ''}
          className="rounded bg-blue-500 px-4 py-2 font-bold  text-white transition hover:bg-blue-400 active:bg-blue-600 disabled:bg-slate-300"
        >
          Post
        </button>
      </form>
      <div className="flex flex-col">
        {dbPostLoading ? (
          <div>loading...</div>
        ) : (
          formattedPosts.map((post, i) => (
            <div key={i} className="my-2 flex gap-3 rounded-lg border p-4">
              <Image
                width={32}
                height={32}
                alt="profile image"
                src={post.authorAvatarUrl ?? ''}
                className="size-fit rounded-full"
              />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-700">
                    {post.authorName}
                  </div>
                  <div className="text-sm text-stone-400">
                    {formatRelativeTime(post.createdAt)}
                  </div>
                </div>
                <div>{post.content}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
