import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { projectService } from '@/services/ProjectService';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/user/UserAction';

export const handleInitUpdateUser: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initUpdateUser),
    switchMap(({ payload: { address, name, bio } }) =>
      from(projectService.updateUserInfo({ address, name, bio })).pipe(
        tap(({ data }) => {
          if (data) {
            dispatch(UserAction.setAccountInfo(data));
          }
        }),
      ),
    ),
    ignoreElements(),
  );
