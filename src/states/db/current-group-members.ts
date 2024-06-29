import { atom } from 'jotai';
import { DBGroupMember } from '@/types/groups/db-group-member';

type DBGroupMembersState = DBGroupMember[] | null | 'loading';

export const dbGroupMembersState = atom<DBGroupMembersState>('loading');
export const dbGroupMembersCountState = atom<number | 'loading'>('loading');
