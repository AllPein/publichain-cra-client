import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { ModalActions } from '@/store/Modal/ModalActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { WebsocketAction } from '@/store/websocket/websocketActions';

export const handleInitLogin: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'LOGIN'),
    tap(({ payload }) => {
      dispatch(
        ModalActions.openModal({
          key: 'login',
          payload: {
            src: payload.data as string,
          },
        }),
      );
    }),
    ignoreElements(),
  );
