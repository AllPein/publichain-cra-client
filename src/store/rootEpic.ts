/* eslint-disable import/no-cycle */
import { combineEpics } from 'redux-observable';

import { ArticleEpics } from '@/store/article/ArticleEpics';
import { NftEpics } from '@/store/nft/NftEpics';
import { UserEpics } from '@/store/user/UserEpics';
import { WebsocketEpics } from '@/store/websocket/websocketEpics';

export default combineEpics(
  ...UserEpics,
  ...WebsocketEpics,
  ...ArticleEpics,
  ...NftEpics,
);
