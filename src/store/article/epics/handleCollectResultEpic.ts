/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { projectService } from '@/services/ProjectService';
import { ModalActions } from '@/store/Modal/ModalActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { WebsocketAction } from '@/store/websocket/websocketActions';

export const handleCollectResult: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'COLLECT'),
    tap(({ payload }: any) => {
      if (payload.data === true) {
        projectService.getArticleInfo('asf');
      }
      dispatch(ModalActions.closeModal('signature'));
      dispatch(
        ModalActions.openModal({
          key: 'collectResult',
          payload: payload.data,
        }),
      );
    }),
    tap(() => dispatch(LoaderAction.setLoaded('mutate'))),
    ignoreElements(),
  );
