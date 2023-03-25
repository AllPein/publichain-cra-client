/* eslint-disable import/no-cycle */
import axios from 'axios';
import { Epic } from 'redux-observable';
import { filter, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { ModalActions } from '@/store/Modal/ModalActions';
import { AccountInfo, RootState, StoreDependencies } from '@/store/StoreTypes';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { UserAction } from '@/store/user/UserAction';
import { WebsocketAction } from '@/store/websocket/websocketActions';

export const handleInitRetrieveUser: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(WebsocketAction.handleMessage),
    filter(({ payload }) => payload.event === 'USER_INFO'),
    tap(({ payload }) => {
      if (payload.data) {
        localStorage.setItem('token', (payload.data as AccountInfo).token);
        axios.defaults.headers.common['Authorization'] = (
          payload.data as AccountInfo
        ).address!;
        dispatch(UserAction.setAccountInfo(payload.data as AccountInfo));
        dispatch(UserAction.setIsLoggedIn(true));
        dispatch(ModalActions.closeModal('login'));
      }
    }),
    tap(() => dispatch(LoaderAction.setLoaded('auth'))),
    ignoreElements(),
  );
