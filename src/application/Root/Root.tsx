import React, { Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { ApplicationLayout } from '@/application/ApplicationLayout/ApplicationLayout';
import { Loader } from '@/components/Loader/Loader';
import { lazy } from '@/utils/lazy';

const ArticlesPage = lazy(
  () => import('@/pages/ArticlesPage/ArticlesPage'),
  'ArticlesPage',
);

const MyArticlesPage = lazy(
  () => import('@/pages/ArticlesPage/MyArticles'),
  'MyArticles',
);

const CollectedArticlesPage = lazy(
  () => import('@/pages/ArticlesPage/CollectedArticles'),
  'CollectedArticles',
);

const ArticlePage = lazy(
  () => import('@/pages/ArticlePage/ArticlePage'),
  'ArticlePage',
);

const ModifyArticlePage = lazy(
  () => import('@/pages/ModifyArticlePage/ModifyArticlePage'),
  'ModifyArticlePage',
);

const AccountPage = lazy(
  () => import('@/pages/AccountPage/AccountPage'),
  'AccountPage',
);

const routes = [
  {
    path: '/create-article',
    children: <ModifyArticlePage />,
  },
  {
    path: '/article/:articleId',
    children: <ArticlePage />,
  },
  {
    path: '/explore',
    children: <ArticlesPage />,
  },
  {
    path: '/collected-articles',
    children: <CollectedArticlesPage />,
  },
  {
    path: '/my-articles',
    children: <MyArticlesPage />,
  },
  {
    path: '/account',
    children: <AccountPage />,
  },
  {
    path: '/edit/:articleId',
    children: <ModifyArticlePage isEditing={true} />,
  },
];

const REDIRECT_PATH = '/explore';

const Root = () => {
  const renderRoot = () => (
    <ApplicationLayout>
      <Switch>
        <Redirect exact from="/" to={REDIRECT_PATH} />
        {routes.map((route) => (
          <Route key={route.path} exact {...route} />
        ))}
      </Switch>
    </ApplicationLayout>
  );

  return (
    <Suspense fallback={<Loader centered />}>
      <Route path="/" render={renderRoot} />
    </Suspense>
  );
};

export { Root };
