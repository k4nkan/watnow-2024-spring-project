import { atom } from 'jotai';
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';

type DBDinnerRequestsState = DBDinnerRequest[] | null | 'loading';

export const dbTodaysDinnerRequestsState =
  atom<DBDinnerRequestsState>('loading');
export const dbTodaysDinnerRequestsSummaryState = atom({
  totalRequests: 0,
  totalPortions: 0,
  additionalRequests: [] as string[]
});
