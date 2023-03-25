/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { WebsocketAction } from '@/store/websocket/websocketActions';
import { goTo } from '@/utils/routerActions';

export const handleReceiveMutateResult: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'MUTATE'),
    tap(({ payload }: any) => {
      if (payload.data?.result) {
        goTo(`/article/${payload.data.internalUrl}`);
      }
    }),
    tap(() => dispatch(LoaderAction.setLoaded('mutate'))),
    ignoreElements(),
  );
