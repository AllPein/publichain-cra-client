import { AccountInfo } from '@/store/StoreTypes';

export type ShortArticle = {
  title: string;
  author: Omit<AccountInfo, 'token'>;
  internalUrl: string;
  description: string;
  url: string;
  transactionId: string;
  createdAt: string;
  _count: {
    collectors: number;
  };
  maxAmount: number;
};

export enum ArticleFilterType {
  All = 'all',
  My = 'my',
  Collected = 'collected',
}

export type SearchArticlesPayload = {
  searchValue: string;
  type: ArticleFilterType;
};

export type ArticleInfo = {
  collected: boolean;
  createdAt: string;
  title: string;
  data: any;
  internalUrl: string;
  url: string;
  _count: {
    collectors: number;
  };
  maxAmount: number;
  author: Omit<AccountInfo, 'token'>;
  transactionId: string;
};
