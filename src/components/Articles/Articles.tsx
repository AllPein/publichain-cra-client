import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookOpenIcon } from '@heroicons/react/20/solid';
import debounce from 'lodash.debounce';

import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Loader } from '@/components/Loader/Loader';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectArticlesLoading } from '@/store/loader/LoaderSelectors';
import { ArticleFilterType, ShortArticle } from '@/types/ArticleTypes';

type ArticlesProps = {
  articles: ShortArticle[] | undefined;
  type: ArticleFilterType;
};

const CHANGE_DEBOUNCE_TIME = 300;

export const Articles: FC<ArticlesProps> = ({ articles, type }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const articlesLoading = useSelector(selectArticlesLoading);

  const debouncedSetValue = useMemo(
    () =>
      debounce((value) => {
        dispatch(
          ArticleAction.initSearchArticles({ searchValue: value, type }),
        );
      }, CHANGE_DEBOUNCE_TIME),
    [dispatch, type],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetValue(value);
  };

  if (!articles) {
    return null;
  }

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="relative w-full mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5  "
          placeholder="Search Articles..."
        />
      </div>
      {articlesLoading ? (
        <Loader centered />
      ) : (
        <div>
          {!Boolean(articles.length) && (
            <div className="flex flex-col items-center w-full mx-auto mt-64">
              <BookOpenIcon className="h-10 w-10 text-indigo-600" />
              <h1 className="text-lg mt-4 font-poppins text-gray-600">
                No articles
              </h1>
            </div>
          )}

          {Boolean(articles.length) && (
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {articles.map((article) => (
                <ArticleCard key={article.internalUrl} {...article} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
