import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ArticleInfo } from '@/components/ArticleInfo/ArticleInfo';
import { Loader } from '@/components/Loader/Loader';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectArticleInfoLoading } from '@/store/loader/LoaderSelectors';
import { selectUserInfo } from '@/store/user/UserSelectors';

const ArticlePage: React.FC = () => {
  const dispatch = useDispatch();
  const { articleId }: { articleId: string } = useParams();
  const accountInfo = useSelector(selectUserInfo);
  const loading = useSelector(selectArticleInfoLoading);

  useEffect(() => {
    return () => {
      dispatch(ArticleAction.resetState());
    };
  }, []);

  useEffect(() => {
    dispatch(ArticleAction.initGetArticleInfo(articleId));
  }, [accountInfo, articleId, dispatch]);

  return loading ? (
    <Loader centered />
  ) : (
    <ArticleInfo accountInfo={accountInfo} />
  );
};

export { ArticlePage };
