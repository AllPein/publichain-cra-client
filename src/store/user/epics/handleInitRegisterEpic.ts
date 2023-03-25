import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { ModalActions } from '@/store/Modal/ModalActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { WebsocketAction } from '@/store/websocket/websocketActions';

export const handleInitRegister: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'REGISTER'),
    tap(({ payload }) => {
      dispatch(ModalActions.closeModal('login'));
      dispatch(
        ModalActions.openModal({
          key: 'register',
          payload: {
            address: payload.data as string,
          },
        }),
      );
    }),
    ignoreElements(),
  );
