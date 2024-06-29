import { atom } from 'jotai';
import { DBDinnerRequest } from '@/types/groups/db-group-dinner-requests';

type DBDinnerRequestsState = DBDinnerRequest[] | null | 'loading';
export type AdditionalRequest = {
  userUid: string;
  requestText: string;
};
export type DBDinnerRequestsSummary =
  | {
      totalRequests: number;
      totalPortions: number;
      additionalRequests: AdditionalRequest[];
    }
  | null
  | 'loading';

export const dbTodaysDinnerRequestsState =
  atom<DBDinnerRequestsState>('loading');
export const dbTodaysDinnerRequestsSummaryState =
  atom<DBDinnerRequestsSummary>('loading');
