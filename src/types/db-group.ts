// Group {
//   string uid PK "firestoreが持つuid"
//   Timestamp createdAt "作成日時"
//   DocumentReference createdBy FK "このグループを作成したユーザー"
//   string displayName "グループの名前"
//   string description "グループの説明, nullable"
//   string iconUrl "アイコンのURL, nullable"
//   SubCol dinnerRequests FK "このグループに対するリクエスト"
//   SubCol members FK "所属しているユーザー"
// }

import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface DBGroup {
  uid: string;
  createdAt: Timestamp;
  createdBy: DocumentReference; // User
  displayName: string;
  description: string | null;
  iconUrl: string | null;
}
