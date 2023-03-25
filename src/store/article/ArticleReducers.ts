import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ArticleAction, ArticleStore } from './ArticleActions';

export const articleStoreInitialState: ArticleStore = Object.freeze({
  articles: [],
  currentArticle: null,
  myArticles: [],
  collectedArticles: [],
});

export const ArticleReducers = reducerWithInitialState<ArticleStore>(
  articleStoreInitialState,
)
  .case(ArticleAction.setArticles, (state, articles: any[]): ArticleStore => {
    return {
      ...state,
      articles,
    };
  })
  .case(
    ArticleAction.setMyArticles,
    (state, myArticles: any[]): ArticleStore => {
      return {
        ...state,
        myArticles,
      };
    },
  )
  .case(
    ArticleAction.setCollectedArticles,
    (state, collectedArticles: any[]): ArticleStore => {
      return {
        ...state,
        collectedArticles,
      };
    },
  )
  .case(
    ArticleAction.setCurrentArticle,
    (state, article: any): ArticleStore => {
      return {
        ...state,
        currentArticle: article,
      };
    },
  )
  .case(ArticleAction.resetState, () => {
    return {
      ...articleStoreInitialState,
    };
  });
