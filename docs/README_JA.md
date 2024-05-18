<p align='center'>
  <a href='../README.md'>English</a> | 日本語
</p>

# sanchezyspace Next.js テンプレート

このプロジェクトは、Next.js + TypeScript + Firebase を使用したプロジェクトテンプレートです。sanchezyspaceでの新しいプロジェクトを始めるのに最適です。

![画像](https://github.com/sanchezyspace/.github/assets/12378384/91906d08-cc93-4ee9-931d-14ee9a4a5ed1)

## はじめに

1. 次のようにして [pnpm](https://pnpm.io/) をインストールします：
（このステップをスキップして `npm` や `yarn` を使用することもできます）
```bash
npm install -g pnpm
```

2. 次のコマンドを使用して、このテンプレートに基づいて新しいプロジェクトを作成します：
```bash
pnpm create next-app -e https://github.com/sanchezyspace/next-template/tree/main/
```

3. 依存関係をインストールします：
```bash
pnpm install
```

4. 次のコマンドで開発サーバーを起動します：
```bash
pnpm run dev
```

5. ブラウザで http://localhost:3000 にアクセスしてアプリケーションを表示します。
app/page.tsx を編集すると、アプリケーションがリアルタイムで更新されます。

## 推奨される拡張機能のインストール
このテンプレートでは、VS Codeの以下の拡張機能の使用を推奨します：
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

拡張機能タブで `@recommended` を検索することにより、推奨される全ての拡張機能を一度にインストールできます。

## 使用技術
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## Firebase のサポート
<img src="https://firebase.google.com/static/downloads/brand-guidelines/SVG/logo-built_white.svg?hl=ja" alt="Firebase" width="200">

このテンプレートは、データの格納とユーザー認証のために [Firebase Firestore](https://firebase.google.com/docs/firestore) と [Firebase Authentication](https://firebase.google.com/docs/auth) を使用します。

Firestoreの設定が完了すると、http://localhost:3000/firestore で Firebase Auth と Firestore を使用した掲示板のサンプルアプリケーションを試すことができます。

### Firebase の設定方法
1. [Firebase コンソール](https://console.firebase.google.com/)で新しいプロジェクトを作成します。
2. 新しいウェブアプリを作成し、設定情報をコピーします。
3. 新しい Firestore データベースを作成し、認証を有効にします。
4. ルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加します：
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="xxxxxxxxxxxxxxxxx.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="xxxxxxxxxxxxxxxx"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="xxxxxxxxxxxxxxxx.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="000000000000"
    NEXT_PUBLIC_FIREBASE_APP_ID="0:0000000000000:web:xxxxxxxxxxxxxxxxxx"
    ```
これで、`@/utils/firebase` から `db` と `app` をインポートして Firestore と Firebase Authを使用できます。

### Firebaseのおすすめの導入ルール
NextJSでFirebaseを用いたアプリケーションを作成する際に便利だった導入ルールに従ってこのテンプレートを作成しました。ここではその特徴やルールを説明します。

#### 新しいコレクションを作成するには
1. Firebaseのプロジェクトコンソールで新しいコレクションを作成
2. `src/types/` にこれから作りたいコレクションのドキュメントのスキーマを型として定義

    **例**
    ```typescript
    import { DocumentReference, Timestamp } from 'firebase/firestore';

    export type DBPost = {
        uid: string;
        createdAt: Timestamp;
        createdBy: DocumentReference; // users コレクション
        title: string;
        content: string;
    };
    ```
    - 型名は `DB` で始めること（例：`DBPost`, `DBUser` など）
    - プロパティに `uid` と `createdAt` の2つを必ず持つObject型でスキーマを定義すること
    - 他のコレクションへの参照には `DocumentReference` を使用し、どの型を指すのかを同行のコメントか型引数に明示すること。
3. `src/stores/firestore/` でデータベースの操作を定義します。

    CRUD操作を効率的に扱うために必要なデータベース操作を実装します。コレクションによって追加で必要な処理等があれば、それも定義しましょう。

    **例**
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
    
    // Firestore ドキュメントから uid フィールドを削除
    type Data = Omit<DBPost, 'uid'>;
    
    // FirestoreのConverterを定義
    const docConverter = {
      // uid フィールドなしでデータを送信
      toFirestore: (post: DBPost): Data => {
        const { uid, ...data } = post;
        return data;
      },
    
      // uid 取得後プロパティを含むデータを作成
      fromFirestore: (snapshot: DocumentSnapshot, options: any): DBPost => {
        const data = snapshot.data(options) as any;
        const dataWithUid = { ...data, uid: snapshot.id } as DBPost;
        return dataWithUid;
      }
    };
    
    // Converterを使用して投稿コレクション参照を取得
    export const postDocRef = collection(db, dbPostCollectionName).withConverter(
      docConverter
    );
    
    // Converterを使用して特定の投稿ドキュメント参照を取得
    export const getPostDocRef = (uid: string) =>
      doc(db, dbPostCollectionName, uid).withConverter(docConverter);
    
    // createdAt フィールドを除く引数を受け取り、新しい投稿を作成
    export const createDBPost = async (post: Omit<Data, 'createdAt'>) => {
      // createdAt フィールドを追加
      const sendData = { ...post, createdAt: Timestamp.now() };
      await addDoc(postDocRef, sendData);
    };
    
    // uid によって特定の投稿データを取得
    export const getDBPost = async (uid: string) => {
      const snapshot = await getDoc(getPostDocRef(uid));
      return snapshot.data();
    };
    
    // オブジェクトが部分的なフィールドを含む特定の投稿を更新
    export const updateDBPost = async (uid: string, data: Partial<Data>) => {
      await updateDoc(getPostDocRef(uid), data);
    };
    
    // uid によって特定の投稿を削除
    export const deleteDBPost = async (uid: string) => {
      await deleteDoc(getPostDocRef(uid));
    };
    
    // 特定の投稿が存在するかどうかを確認
    export const existsDBPost = async (uid: string) => {
      const snapshot = await getDoc(getPostDocRef(uid));
      return snapshot.exists();
    };
    
    // カスタム操作を DBPost 用に定義 /////////////////////////////////////////////
    // すべての投稿データを取得
    export const getAllDBPosts = async (): Promise<DBPost[]> => {
      const postQuery = query(postDocRef, orderBy('createdAt', 'desc'));
      const snapshots = await getDocs(postQuery);
      const posts: DBPost[] = snapshots.docs.map((doc) => doc.data());
    
      return posts;
    };
    ```
    - エクスポートされる関数や変数には型名が含まれており、一意になるように命名する。
    - 少なくとも `create`、`get`、`update`、`delete`、`exists` 関数を定義する。
    - 必要に応じてカスタムのデータベース操作関数を定義する。
    - Firestoreのいずれのドキュメントにも `uid` フィールドを含めないように！
    - 型安全のために `withConverter` を使用して Firestore ドキュメントを変換するのがおすすめです。.
4. (任意) `src/hooks/` にコレクションのための React Hooks を定義

    コレクションの使用方法によりReactカスタムフックの作成が役立つ場合があります。このHookの例ではコレクション内のすべてのドキュメントの変化を、Reactのno状態として監視することができます。コレクションがそれほど多くのドキュメントを持たないケースに適しています。

    **例**
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
    - Hookは引数のオプションとして`realtimeUpdate: boolean`を受け取り、リアルタイム更新モードと初回のみ取得のモードが切り替えられるようにする。
    - コンポーネントがロードインジケータを表示できるように、ロード状態を提供すると便利です。
    - `snapshot.docChanges()` を使用して変更をキャプチャするように実装すれば、より高頻度、大量のデータを高いパフォーマンスで扱うことができるようになると思います。

## Tips
### Huskyとは
このテンプレートは、すべてのコミットの前に `lint-staged` を実行するために [Husky](https://typicode.github.io/husky/#/) を使用しています。

### Tailwind CSS を削除する方法
1. `tailwind.config.js` と `postcss.config.js` を削除します。
2. `pnpm remove tailwindcss postcss autoprefixer` を実行します。
3. `app/globals.css` から `@tailwind xxxx;` を削除します。

### Husky を削除する方法
Husky を削除したい場合、`package.json` から次のコードを削除できます：
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

### フォーマットルールを変更する方法
フォーマットルールを変更するには、`.prettierrc` を編集してください。

## 気になるところがある
このテンプレートの改善案やプルリクエスト等は大歓迎です！ [GitHub](https://github.com/sanchezyspace/next-template) でお待ちしております。

