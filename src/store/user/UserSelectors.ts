import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectUserInfo = createSelector(
  (state: RootState) => state.user,
  (user) => user.accountInfo,
);

export const selectIsLoggedIn = createSelector(
  (state: RootState) => state.user,
  (user) => user.isLoggedId,
);
