import { DBGroup } from '@/types/db-group';
import { atom } from 'jotai';

type DBGroupState = DBGroup | null | 'loading';
type DBGroupUidState = string | null;

export const dbGroupState = atom<DBGroupState>('loading');
export const dbGroupUidState = atom<DBGroupUidState>(null);
