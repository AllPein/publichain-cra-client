import React from 'react';

import moment from 'moment';

import { goTo } from '@/utils/routerActions';
import { trimAccountAddress } from '@/utils/stringHelper';

export const ArticleCard = ({
  title,
  description,
  _count,
  author,
  internalUrl,
  createdAt,
  maxAmount,
}) => {
  return (
    <div
      className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
      onClick={() => goTo(`/article/${internalUrl}`)}
    >
      <div className="transition ease-in-out duration-150 overflow-hidden rounded-lg border-gray-100 border-solid border-2 p-8 cursor-pointer hover:border-indigo-600">
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mb-3 text-gray-500 break-word h-12">{description}</p>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={author.imageUrl}
            alt="Avatar of Writer"
          />
          <div className="text-sm" style={{ maxWidth: 160 }}>
            <p className="text-gray-900 leading-none">{author.name}</p>
            <p className="text-xs text-gray-400">
              {trimAccountAddress(author.address)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 break-word">
          <span className="mt-4 bg-gray-100 font-medium rounded-full px-3 py-1 text-xs text-gray-700">
            {moment(createdAt).format('DD.MM.YYYY')}
          </span>
          <span className="mt-4 bg-indigo-600 font-medium rounded-full px-3 py-1 text-xs text-gray-50">
            {_count.collectors}/{maxAmount} collected
          </span>
        </div>
      </div>
    </div>
  );
};
