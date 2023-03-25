import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import { ModifyArticle } from '@/components/ModifyArticle/ModifyArticle';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectArticleInfoLoading } from '@/store/loader/LoaderSelectors';

import './ModifyArticlePage.css';

const ModifyArticlePage = ({ isEditing = false }) => {
  const dispatch = useDispatch();
  const { articleId }: { articleId: string } = useParams();
  const loading = useSelector(selectArticleInfoLoading);

  useEffect(() => {
    if (isEditing) {
      dispatch(ArticleAction.initGetArticleInfo(articleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, isEditing]);

  return loading ? (
    <Loader centered />
  ) : (
    <>
      <ModifyArticle isEditing={isEditing} />
    </>
  );
};

export { ModifyArticlePage };
