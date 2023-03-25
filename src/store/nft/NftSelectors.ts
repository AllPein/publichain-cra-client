import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectNftInformation = createSelector(
  [
    (state: RootState, id: string) => state.nft.nftInformation,
    (state: RootState, id: string) => id,
  ],
  (nftInformation, id) => nftInformation?.[id],
);

export const selectNftInformationError = createSelector(
  [
    (state: RootState, id: string) => state.nft.nftInformationError,
    (state: RootState, id: string) => id,
  ],
  (nftInformationError, id) => nftInformationError?.[id],
);
