import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { projectService } from '@/services/ProjectService';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { ArticleAction } from '@/store/article/ArticleActions';
import { LoaderAction } from '@/store/loader/LoaderActions';

export const handleInitGetArticleInfo: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(ArticleAction.initGetArticleInfo),
    tap(() => dispatch(LoaderAction.setLoading('articleInfo'))),
    switchMap(({ payload }) =>
      from(projectService.getArticleInfo(payload)).pipe(
        tap(({ data }) => {
          dispatch(ArticleAction.setCurrentArticle(data));
        }),
        finalize(() => dispatch(LoaderAction.setLoaded('articleInfo'))),
      ),
    ),

    ignoreElements(),
  );
