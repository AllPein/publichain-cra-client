import actionCreatorFactory from 'typescript-fsa';

import { AccountInfo, XummWallet } from '@/store/StoreTypes';

const factory = actionCreatorFactory('user');

export type UserStore = {
  accountInfo: AccountInfo | null;
  isLoggedId: boolean;
};

export const UserAction = {
  initConnect: factory('INIT_CONNECT'),
  initMint: factory('INIT_MINT'),
  initRetrieveUser: factory<XummWallet>('INIT_RETRIEVE_USER'),
  initUpdateUser: factory<{ address: string; name: string; bio: string }>(
    'INIT_UPDATE_USER',
  ),
  setAccountInfo: factory<AccountInfo | null>('SET_ACCOUNT_INFO'),
  setIsLoggedIn: factory<boolean>('SET_IS_LOGGED_IN'),
  resetState: factory('RESET_STATE'),
  initWallet: factory('INIT_WALLET'),
};
