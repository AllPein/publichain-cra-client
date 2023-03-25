import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { projectService } from '@/services/ProjectService';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { ArticleAction } from '@/store/article/ArticleActions';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { ArticleFilterType } from '@/types/ArticleTypes';

export const handleInitSearchArticles: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(ArticleAction.initSearchArticles),
    tap(() => dispatch(LoaderAction.setLoading('articles'))),
    switchMap(({ payload }) =>
      from(
        projectService.searchArticles(payload.searchValue, payload.type),
      ).pipe(
        tap(({ data }) => {
          switch (payload.type) {
            case ArticleFilterType.All:
              dispatch(ArticleAction.setArticles(data));
              break;
            case ArticleFilterType.My:
              dispatch(ArticleAction.setMyArticles(data));
              break;
            case ArticleFilterType.Collected:
              dispatch(ArticleAction.setCollectedArticles(data));
              break;
          }
        }),
      ),
    ),
    tap(() => dispatch(LoaderAction.setLoaded('articles'))),
    ignoreElements(),
  );
