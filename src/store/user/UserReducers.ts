import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { AccountInfo } from '@/store/StoreTypes';

import { UserAction, UserStore } from './UserAction';

export const canvasSettingsStoreInitialState: UserStore = {
  accountInfo: null,
  isLoggedId: false,
};

export const UserReducers = reducerWithInitialState<UserStore>(
  canvasSettingsStoreInitialState,
)
  .case(
    UserAction.setAccountInfo,
    (state: UserStore, accountInfo: AccountInfo | null) => {
      return {
        ...state,
        accountInfo,
      };
    },
  )
  .case(UserAction.setIsLoggedIn, (state: UserStore, isLoggedId: boolean) => {
    return {
      ...state,
      isLoggedId,
    };
  });
