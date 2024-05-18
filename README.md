<p align='center'>
  English | <a href='./docs/README_JA.md'>日本語</a>
</p>

# sanchezyspace Next.js Template

This is a Next.js + TypeScript + Firebase project template, perfect for starting your new projects in sanchezyspace.

![image](https://github.com/sanchezyspace/.github/assets/12378384/91906d08-cc93-4ee9-931d-14ee9a4a5ed1)

## Getting Started

1. Install [pnpm](https://pnpm.io/) with:
(You can use `npm` or `yarn` instead to skip this step)
```bash
npm install -g pnpm
```

2. Create a new project based on this template using:
```bash
pnpm create next-app -e https://github.com/sanchezyspace/next-template/tree/main/
```

3. Install dependencies:
```bash
pnpm install
```

4. Start the development server with:
```bash
pnpm run dev
```

5. Visit http://localhost:3000 to view your application in the browser. 
Edit app/page.tsx for live updates as you code.

## Installing recommended extensions
This template recommends the following extensions for VS Code:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

By searching `@recommended` in the extensions tab, you can install all the recommended extensions at once.

## Features
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## Firebase support
<img src="https://firebase.google.com/static/downloads/brand-guidelines/SVG/logo-built_white.svg?hl=ja" alt="Firebase" width="200">

This template uses Firebase [Firestore](https://firebase.google.com/docs/firestore) and [Authentication](https://firebase.google.com/docs/auth) to store data and authenticate users.

You can try a sample forum application using Firebase Auth and Firestore by visiting [`localhost:3000/firestore`](localhost:3000/firestore).

### How to setup Firebase
1. Create a new project on [Firebase Console](https://console.firebase.google.com/).
2. Create a new web app and copy the configuration.
3. Create a new Firestore database and enable authentication.
4. Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="xxxxxxxxxxxxxxxxx.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="xxxxxxxxxxxxxxxx"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="xxxxxxxxxxxxxxxx.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="000000000000"
    NEXT_PUBLIC_FIREBASE_APP_ID="0:0000000000000:web:xxxxxxxxxxxxxxxxxx"
    ```
Now you can use firestore and authentication by importing `db` and `app` from `@/utils/firebase`.

### Recommended coding rules for Firebase
#### Creating new collections
1. Create a new collection in console.
2. Create a new type in `src/types/`
   
    Example
    ```typescript
    import { DocumentReference, Timestamp } from 'firebase/firestore';

    export type DBPost = {
        uid: string;
        createdAt: Timestamp;
        createdBy: DocumentReference;
        title: string;
        content: string;
    };
    ```
    - Make sure that the type name starts with `DB`.
    - Make sure that the object has `uid` and `createdAt` fields.
    - Use `DocumentReference` for references to other collections.
4. Define database operations in `src/stores/firestore/`
   
   Implement essential database operations to handle CRUD actions effectively. These functions are crucial for manipulating and retrieving data from your Firestore database.

   Example
   ```typescript
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
    ```
    - Make sure that the name of exported variables includes the collection name.
    - Define at least `create`, `get`, `update`, `delete`, and `exists` functions.
    - Define custom operations if needed.
    - Do not include `uid` field in Firestore document.
    - Define `withConverter` to convert Firestore document for the type safety.
6. (Optional) Define React Hooks for the collection in `src/hooks/`
   
    Depending on how components utilize the database, creating custom React hooks can be beneficial. In the example of a custom hook below, you can monitor changes to all documents within a collection as a React state. This is suitable for cases where the collection does not contain a large number of documents.

    Example
    ```typescript
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
    ```
    - The hook accepts a realtime option to determine whether to use real-time updates
    - Providing loading state will be helpful for components to display loading indicators.
    - Capturing the changes by using `snapshot.docChanges()` could make the hook work more efficiently.

## Tips
### How husky works
This template uses [Husky](https://typicode.github.io/husky/#/) to run `lint-staged` before every commit.

### How to remove Tailwind CSS
1. Remove `tailwind.config.js` and `postcss.config.js`.
2. Run `pnpm remove tailwindcss postcss autoprefixer`.
3. Remove `@tailwind xxxx;` from `app/globals.css`.

### How to remove Husky
If you want to remove husky, you can remove the following code from `package.json`:
```jsonc
// ...
"scripts": {
    // ...
    "prepare": "husky"
},

// ...
"lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --max-warnings 0",
    "src/app/**": "prettier --write"
}
```

### How to change formatting rules
You can change the formatting rules by editing `.prettierrc`.

## Contributing
Contributions for this template are welcome at [GitHub Repository](https://github.com/sanchezyspace/next-template).
