import { AnyAction, Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';

import { LoaderAction } from '@/store/loader/LoaderActions';
import { WebsocketAction } from '@/store/websocket/websocketActions';
import { WebsocketError } from '@/types/websocket/websocketPayload';
import { WebSocketMessage } from '@/types/websocket/websocketTypes';
import { jwt } from '@/utils/window';

export const getBaseApiUrlWithoutProtocol = (): string => {
  return process.env.REACT_APP_BASE_API_URL!.replace('http://', '').replace(
    'https://',
    '',
  );
};

type InitWebsocketParams = {
  dispatch: Dispatch<AnyAction>;
  // eslint-disable-next-line no-unused-vars
  onmessage?: ({ event, data }: WebSocketMessage) => void;
  onopen?: () => void;
  onclose?: () => void;
  backendPath?: string;
  countReconnect?: number;
};

const MAX_COUNT_RECONNECT = 2;
const RECONNECT_TIMEOUT = (1000 - 7) * 10;

export async function createWebsocket({
  onopen,
  onclose,
  onmessage,
  dispatch,
  backendPath = process.env.REACT_APP_BASE_API_URL,
  countReconnect,
}: InitWebsocketParams): Promise<WebSocket> {
  const hostname = getBaseApiUrlWithoutProtocol();

  const url = `wss://${hostname}?id=${uuid()}`;

  const ws: WebSocket = new WebSocket(url);

  dispatch(WebsocketAction.setWebsocket({ ws, backendPath: backendPath! }));

  if (ws) {
    ws.onopen = () => {
      dispatch(WebsocketAction.setWebsocket({ ws, backendPath: backendPath! }));

      if (jwt) {
        dispatch(LoaderAction.setLoading('auth'));

        dispatch(
          WebsocketAction.sendMessage({
            event: 'LOGIN',
            data: { token: jwt },
          }),
        );
      }

      if (onopen) {
        onopen();
      }
    };
  }
  ws.onclose = () => {
    dispatch(WebsocketAction.removeWebsocket(backendPath!));

    /**
     * Механизм реконнекта
     * Ограничиваем бесконечные редиректы в количестве трех рекконектов
     */
    if (!countReconnect || countReconnect < MAX_COUNT_RECONNECT) {
      setTimeout(() => {
        createWebsocket({
          onopen,
          onclose,
          onmessage,
          dispatch,
          backendPath,
          countReconnect: (countReconnect || 0) + 1,
        });
      }, RECONNECT_TIMEOUT);
    }

    if (onclose) {
      onclose();
    }
  };

  ws.onmessage = (event) => {
    const payload = JSON.parse(event.data) as WebSocketMessage;
    const errorPayload = payload.data as WebsocketError;

    /** Если пришла ошибка - выводим её */
    if (errorPayload === null || !errorPayload?.error) {
      dispatch(WebsocketAction.handleMessage(JSON.parse(event.data)));
    }

    if (onmessage) {
      onmessage(event.data);
    }
  };

  return ws;
}
