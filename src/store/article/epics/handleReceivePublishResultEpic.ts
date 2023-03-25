/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { ModalActions } from '@/store/Modal/ModalActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { WebsocketAction } from '@/store/websocket/websocketActions';

export const handleReceivePublishResult: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'PUBLISH_RESULT'),
    tap(({ payload }) => {
      dispatch(ModalActions.closeModal('signature'));
      dispatch(
        ModalActions.openModal({
          key: 'publicationResult',
          payload: payload.data,
        }),
      );
    }),
    tap(() => dispatch(LoaderAction.setLoaded('publish'))),
    ignoreElements(),
  );
