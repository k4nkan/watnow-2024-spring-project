// Example type definition for a user object in the database
//
// # Required fields
// uid: string - the unique identifier for the user document (do not include in firestore document)
// createdAt: Timestamp - the timestamp when the user was created
//
// # Optional fields:
// userName: string | null - the user id of the user
// displayName: string | null - the display name of the user
// email: string | null - the email of the user
// avatarUrl: string | null - the url of the user's avatar

import { Timestamp } from 'firebase/firestore';

export type DBUser = {
  uid: string;
  createdAt: Timestamp;
  userName: string | null;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
};
