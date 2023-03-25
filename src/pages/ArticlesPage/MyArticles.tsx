import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Articles } from '@/components/Articles/Articles';
import { Loader } from '@/components/Loader/Loader';
import { useMount } from '@/hooks/useMount';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectMyArticles } from '@/store/article/ArticleSelectors';
import { selectArticlesLoading } from '@/store/loader/LoaderSelectors';
import { ArticleFilterType, ShortArticle } from '@/types/ArticleTypes';

export const MyArticles = () => {
  const dispatch = useDispatch();
  const articles: ShortArticle[] = useSelector(selectMyArticles);
  const articlesLoading = useSelector(selectArticlesLoading);

  useMount(() => {
    dispatch(
      ArticleAction.initSearchArticles({
        searchValue: '',
        type: ArticleFilterType.My,
      }),
    );
  });

  return articlesLoading ? (
    <Loader centered />
  ) : (
    <Articles articles={articles} type={ArticleFilterType.My} />
  );
};
