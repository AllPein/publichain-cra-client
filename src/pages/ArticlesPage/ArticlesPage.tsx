import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Articles } from '@/components/Articles/Articles';
import { useMount } from '@/hooks/useMount';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectArticles } from '@/store/article/ArticleSelectors';
import { ArticleFilterType, ShortArticle } from '@/types/ArticleTypes';

export const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles: ShortArticle[] = useSelector(selectArticles);

  useMount(() => {
    dispatch(
      ArticleAction.initSearchArticles({
        searchValue: '',
        type: ArticleFilterType.All,
      }),
    );
  });

  return <Articles articles={articles} type={ArticleFilterType.All} />;
};
