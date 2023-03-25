/**
 * Статья на примеры сокетов
 * https://artcpt.atlassian.net/wiki/spaces/V2/pages/19751370754
 */
// eslint-disable-next-line import/no-cycle
import {
  VegaWebSocketPayload,
  VegaWebSocketSendPayload,
  WebsocketError,
} from './websocketPayload';

export type WebSocketType =
  | 'LOGIN'
  | 'REGISTER'
  | 'USER_INFO'
  | 'PUBLISH'
  | 'MUTATE'
  | 'COLLECT'
  | 'PUBLISH_RESULT';

export type WebSocketMessage = {
  requestId?: string;
  event: WebSocketType;
  data: VegaWebSocketPayload[WebSocketType] | WebsocketError;
};

export type WebSocketSendMessage = {
  requestId?: string;
  backendPath?: string;
  event: WebSocketType;
  data?: VegaWebSocketSendPayload[WebSocketType];
};
