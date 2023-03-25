import { reducerWithInitialState } from 'typescript-fsa-reducers';

import {
  WebsocketAction,
  WebsocketStore,
  WebSocketToBackendX,
} from './websocketActions';

export const websocketStoreInitialState: WebsocketStore = {
  instances: {},
};

export const WebsocketReducers = reducerWithInitialState<WebsocketStore>(
  websocketStoreInitialState,
)
  .case(
    WebsocketAction.setWebsocket,
    (state, { ws, backendPath }: WebSocketToBackendX): WebsocketStore => {
      return {
        ...state,
        instances: {
          ...state.instances,
          [backendPath]: ws,
        },
      };
    },
  )
  .case(
    WebsocketAction.removeWebsocket,
    (state, backendPath): WebsocketStore => {
      const clonedInstances = { ...state.instances };

      delete clonedInstances[backendPath];

      return {
        ...state,
        instances: clonedInstances,
      };
    },
  )
  .case(WebsocketAction.resetState, (state): WebsocketStore => {
    /** Нужно не просто сбросить сокеты в сторе, нужно отключить соединение */
    Object.values(state.instances).forEach(
      (instance: WebSocket | null | undefined) => {
        if (instance) {
          // eslint-disable-next-line no-param-reassign
          instance.onclose = () => {};
          instance.close();
        }
      },
    );

    return {
      instances: {},
    };
  });
