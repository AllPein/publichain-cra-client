import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';

import { IProjectService } from '@/services/types';
import { ModalStore } from '@/store/Modal/ModalActions';
import { ArticleStore } from '@/store/article/ArticleActions';
import { LoaderStore } from '@/store/loader/LoaderActions';
import { NftStore } from '@/store/nft/NftActions';
import { WebsocketStore } from '@/store/websocket/websocketActions';

import { UserStore } from './user/UserAction';

export interface RootState {
  article: ArticleStore;
  user: UserStore;
  loader: LoaderStore;
  modal: ModalStore;
  websocket: WebsocketStore;
  router: RouterState;
  nft: NftStore;
}

export type StoreDependencies = {
  projectService: IProjectService;
  history: History;
  dispatch: Dispatch<AnyAction>;
};

export type Wallet = {
  classicAdress: string;
  privateKey: string;
  publicKey: string;
  seed: string;
  adress: string;
};

export type XummWallet = {
  sub: string;
  picture: string;
  account: string;
  name?: string;
  domain?: string;
  blocked: boolean;
  source: string;
  kycApproved: boolean;
  proSubscription: boolean;
};

export type AccountInfo = {
  token: string;
  address: string;
  imageUrl: string;
  name: string;
  bio?: string;
};
