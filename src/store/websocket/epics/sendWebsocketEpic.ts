import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';

import { WebsocketAction } from '../websocketActions';

type WebsocketReadyStateType = 'Connecting' | 'Open' | 'Closing' | 'Closed';

export const WebsocketReadyState: Record<WebsocketReadyStateType, number> = {
  Connecting: 0,
  Open: 1,
  Closing: 2,
  Closed: 3,
};

function isNotClose(websocket: WebSocket): boolean {
  return websocket.readyState === WebsocketReadyState.Open;
}

export const handleSendWebsocketEpic: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$) =>
  action$.pipe(
    ofAction(WebsocketAction.sendMessage),
    tap(({ payload }) => {
      const { backendPath = process.env.REACT_APP_BASE_API_URL } = payload;
      const currentWebsocket: WebSocket | null | undefined =
        state$.value.websocket.instances &&
        state$.value.websocket.instances[backendPath!];

      if (currentWebsocket && isNotClose(currentWebsocket)) {
        currentWebsocket.send(JSON.stringify(payload));
      } else {
        console.warn(`Can't send websocket ${JSON.stringify(payload)}`);
      }
    }),
    ignoreElements(),
  );
