// User {
//   string uid PK "firestoreが持つuid"
//   Timestamp createdAt "作成日時"
//   string userName "ユーザー名, nullable"
//   string displayName "表示名, nullable"
//   string email "メールアドレス, nullable"
//   string avatarUrl "アバター画像のURL, nullable"
// }

import { Timestamp } from 'firebase/firestore';

export interface DBUser {
  uid: string;
  createdAt: Timestamp;
  userName: string | null;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
}
