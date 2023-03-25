import { handleCollectResult } from '@/store/article/epics/handleCollectResultEpic';
import { handleInitGetArticleInfo } from '@/store/article/epics/handleInitGetArticleInfoEpic';
import { handleInitSearchArticles } from '@/store/article/epics/handleInitSearchArticlesEpic';
import { handleReceiveMutateResult } from '@/store/article/epics/handleReceiveMutateResultEpic';
import { handleReceivePublishResult } from '@/store/article/epics/handleReceivePublishResultEpic';

export const ArticleEpics = [
  handleInitGetArticleInfo,
  handleReceivePublishResult,
  handleInitSearchArticles,
  handleCollectResult,
  handleReceiveMutateResult,
];
