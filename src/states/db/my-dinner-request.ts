import { atom } from 'jotai';
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';

export const dbMyDinnerRequestState = atom<DBDinnerRequest | null | 'loading'>(
  'loading'
);
export const dbMyDinnerRequestExistsState = atom<boolean>(false);
