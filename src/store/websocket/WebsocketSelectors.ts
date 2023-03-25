import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';
import { WebsocketReadyState } from './epics/sendWebsocketEpic';

export const selectWebsockets = createSelector(
  (state: RootState) => state.websocket.instances,
  (websockets) => websockets,
);

const isWebsocketConnected = (websockets, backendPath) => {
  return (
    backendPath in websockets &&
    websockets[backendPath]?.readyState === WebsocketReadyState.Open
  );
};

export const selectIsMainWebsocketInitialized = createSelector(
  selectWebsockets,
  (websockets) =>
    isWebsocketConnected(websockets, process.env.REACT_APP_BASE_API_URL),
);
