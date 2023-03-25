import { createSelector } from 'reselect';

import { LoaderStore, LoadingType } from '@/store/loader/LoaderActions';

import { RootState } from '../StoreTypes';

const selectRootState = (state: RootState) => state;

/* Фабрики для создания селекторов по LoadingType и свойству (loaded, loading). */
const createLoaderSelector = <
  Name extends LoadingType,
  LoadingState extends keyof LoaderStore,
>(
  name: Name,
  loadingState: LoadingState,
) =>
  createSelector(
    [selectRootState],
    (state) => state.loader[loadingState][name],
  );

/* Фабрики для создания селекторов по свойству isLoading. */
const createIsLoadingSelector = <Name extends LoadingType>(name: Name) =>
  createLoaderSelector(name, 'loading');

/* Фабрики для создания селекторов по свойству isLoaded. */
const createIsLoadedSelector = <Name extends LoadingType>(name: Name) =>
  createLoaderSelector(name, 'loaded');

export const selectAuthLoading = createIsLoadingSelector('auth');
export const selectPublishLoading = createIsLoadingSelector('publish');
export const selectSaveLoading = createIsLoadingSelector('mutate');
export const selectAuthLoaded = createIsLoadedSelector('auth');
export const selectArticlesLoading = createIsLoadingSelector('articles');
export const selectArticleInfoLoading = createIsLoadingSelector('articleInfo');
export const selectCollectButtonLoading = createIsLoadingSelector('collect');
