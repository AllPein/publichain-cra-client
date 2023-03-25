import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectArticles = createSelector(
  (state: RootState) => state.article.articles,
  (articles) => articles,
);

export const selectMyArticles = createSelector(
  (state: RootState) => state.article.myArticles,
  (myArticles) => myArticles,
);

export const selectCollectedArticles = createSelector(
  (state: RootState) => state.article.collectedArticles,
  (collectedArticles) => collectedArticles,
);

export const selectArticleInfo = createSelector(
  (state: RootState) => state.article.currentArticle,
  (currentArticle) => currentArticle,
);
