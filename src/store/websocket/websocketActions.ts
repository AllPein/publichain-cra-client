import actionCreatorFactory from 'typescript-fsa';

import {
  WebSocketMessage,
  WebSocketSendMessage,
} from '@/types/websocket/websocketTypes';

const factory = actionCreatorFactory('websocket');

export type WebSocketToBackendX = {
  ws: WebSocket;
  backendPath: string;
};

export interface WebsocketStore {
  instances: Partial<Record<string, WebSocket | null>>;
}

export const WebsocketAction = {
  setWebsocket: factory<WebSocketToBackendX>('SET_WEBSOCKET'),
  removeWebsocket: factory<string>('REMOVE_WEBSOCKET'),
  handleMessage: factory<WebSocketMessage>('HANDLE_MESSAGE'),
  sendMessage: factory<WebSocketSendMessage>('SEND_MESSAGE'),
  resetState: factory('RESET_STATE'),
};
