// DinnerRequest {
//   string uid PK "firestoreが持つuid"
//   Timestamp createdAt "作成日時"
//   DocumentReference createdBy FK "ユーザーへの参照"
//   Timestamp deletedAt "削除日時, nullable"
//   Timestamp date "リクエストの日付"
//   string choice "食事の選択, ('none', 'less', 'normal', 'more', 'custom')"
//   number portions "何杯食べるか"
//   string additionalRequests "追加要望, nullable"
// }

import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface DBDinnerRequest {
  uid: string;
  createdAt: Timestamp;
  createdBy: DocumentReference; // User
  deletedAt: Timestamp | null;
  date: Timestamp;
  choice: 'none' | 'less' | 'normal' | 'more' | 'custom';
  portions: number;
  additionalRequests: string | null;
}
