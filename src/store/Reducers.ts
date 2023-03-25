import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { ModalReducers } from '@/store/Modal/ModalReducers';
import { RootState } from '@/store/StoreTypes';
import { ArticleReducers } from '@/store/article/ArticleReducers';
import { LoaderReducers } from '@/store/loader/LoaderReducers';
import { NftReducers } from '@/store/nft/NftReducers';
import { WebsocketReducers } from '@/store/websocket/websocketReducers';
import { history } from '@/utils/history';

import { UserReducers } from './user/UserReducers';

export default combineReducers<RootState>({
  user: UserReducers,
  loader: LoaderReducers,
  modal: ModalReducers,
  websocket: WebsocketReducers,
  article: ArticleReducers,
  nft: NftReducers,
  router: connectRouter(history),
});
