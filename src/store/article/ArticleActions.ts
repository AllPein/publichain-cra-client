import actionCreatorFactory from 'typescript-fsa';

import {
  ArticleInfo,
  SearchArticlesPayload,
  ShortArticle,
} from '@/types/ArticleTypes';

const factory = actionCreatorFactory('article');

export type ArticleStore = {
  articles: ShortArticle[];
  currentArticle: ArticleInfo | null;
  myArticles: ShortArticle[];
  collectedArticles: ShortArticle[];
};

export const ArticleAction = {
  initSearchArticles: factory<SearchArticlesPayload>('INIT_SEARCH_ARTICLES'),
  initGetArticleInfo: factory<string>('INIT_GET_ARTICLE_INFO'),
  setArticles: factory<ShortArticle[]>('SET_ARTICLES'),
  setMyArticles: factory<ShortArticle[]>('SET_MY_ARTICLES'),
  setCollectedArticles: factory<ShortArticle[]>('SET_COLLECTED_ARTICLES'),
  setCurrentArticle: factory<any>('SET_CURRENT_ARTICLE'),
  resetState: factory('RESET_STATE'),
};
