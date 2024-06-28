// GroupMember {
//   string uid PK "firestoreが持つuid"
//   Timestamp createdAt "作成日時"
//   DocumentReference user FK "ユーザーへの参照"
// }

import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface DBGroupMember {
  uid: string;
  createdAt: Timestamp;
  user: DocumentReference; // User
}
