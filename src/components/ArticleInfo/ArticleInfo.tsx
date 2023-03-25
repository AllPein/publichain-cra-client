import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpeechSynthesis } from 'react-speech-kit';

import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/20/solid';
import Blocks from 'editorjs-blocks-react-renderer';
import { CodeBoxOutput } from 'editorjs-react-renderer';
import moment from 'moment';

import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Editor/Renderers/Checkbox/CheckboxRenderer';
import { Image } from '@/components/Editor/Renderers/Image/ImageRenderer';
import { List } from '@/components/Editor/Renderers/List/ListRenderer';
import { Nft } from '@/components/Editor/Renderers/Nft/NftRenderer';
import { Quote } from '@/components/Editor/Renderers/Quote/QuoteRenderer';
import { Warning } from '@/components/Editor/Renderers/Warning/WarningRenderer';
import { ModalActions } from '@/store/Modal/ModalActions';
import { selectArticleInfo } from '@/store/article/ArticleSelectors';
import { LoaderAction } from '@/store/loader/LoaderActions';
import { selectCollectButtonLoading } from '@/store/loader/LoaderSelectors';
import { WebsocketAction } from '@/store/websocket/websocketActions';
import { goTo } from '@/utils/routerActions';
import {
  parseArticleDataToSpeechSynthesisText,
  trimAccountAddress,
} from '@/utils/stringHelper';

const classConfig = {
  code: {
    className: 'language-js',
  },

  header: {
    className: 'text-2xl font-bold font-poppins mt-12',
  },
  image: {
    className: 'w-full max-w-screen-md mt-8',
    captionClassName: 'text-center mt-4 text-gray-500',
  },
  list: {
    className: 'list-inside mt-6 font-poppins font-light',
  },
  paragraph: {
    className:
      'text-xl text-opacity-75 font-poppins font-light leading-10 mt-4',
    actionsClassNames: {
      alignment: 'text-{alignment}', // This is a substitution placeholder: left or center.
    },
  },
  quote: {
    className: 'p-4 my-8 border-l-4 border-gray-300 bg-gray-50',
  },
};

export const ArticleInfo = ({ accountInfo }) => {
  const dispatch = useDispatch();

  const { speak, speaking, cancel, supported } = useSpeechSynthesis();

  const articleInfo = useSelector(selectArticleInfo);
  const collectButtonLoading = useSelector(selectCollectButtonLoading);

  const handleCollect = useCallback(() => {
    dispatch(LoaderAction.setLoading('collect'));

    dispatch(
      WebsocketAction.sendMessage({
        event: 'COLLECT',
        data: {
          address: accountInfo!.address,
          url: articleInfo!.internalUrl,
        },
      }),
    );

    dispatch(
      ModalActions.openModal({
        key: 'signature',
      }),
    );
  }, [dispatch, accountInfo, articleInfo]);

  const textToSpeak = useMemo(() => {
    return parseArticleDataToSpeechSynthesisText(articleInfo);
  }, [articleInfo]);

  const articleFooter = useMemo(() => {
    if (articleInfo?.author.address === accountInfo?.address || !accountInfo) {
      return null;
    }

    if (articleInfo?.collected) {
      return (
        <div className="flex my-8 items-center">
          <CheckIcon className="h-10 w-10 text-green-400" />
          <p className="text-green-400 font-bold ml-2o">Collected</p>
        </div>
      );
    }

    return (
      <Button
        className="w-32 my-8"
        onClick={handleCollect}
        loading={collectButtonLoading}
      >
        Collect
      </Button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleInfo, accountInfo]);

  const speakerBlock = useMemo(
    () =>
      speaking ? (
        <a className="flex ml-10 cursor-pointer" onClick={() => cancel()}>
          <p className="text-indigo-600 font-light">Stop</p>
          <StopCircleIcon className="ml-1 h-5 w-5 text-indigo-600" />
        </a>
      ) : (
        <a
          className="flex ml-10 cursor-pointer"
          onClick={() =>
            speak({
              text: textToSpeak,
              rate: 0.85,
            })
          }
        >
          <p className="text-indigo-600 font-light">Listen</p>
          <PlayCircleIcon className="ml-1 h-5 w-5 text-indigo-600" />
        </a>
      ),
    [speaking, textToSpeak],
  );

  if (!articleInfo) {
    return null;
  }

  return (
    <div className="max-w-full flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto">
      <div className="max-w-4xl">
        <div className="inline-flex items-end w-full justify-start rounded-mdpx-4 pb-6 pt-6 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <a
            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
            id="dropdownMenuButton2"
            role="button"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
          >
            <img
              src={articleInfo.author.imageUrl}
              className="rounded-full w-10 h-10"
              alt=""
              loading="lazy"
            />
            <div className="text-left ml-3">
              <p className="text-base text-black">{articleInfo.author.name}</p>
              <p className="text-xs text-gray-400">
                {trimAccountAddress(articleInfo.author.address)}
              </p>
            </div>
          </a>
          <p className="text-gray-400 ml-6 font-light">
            {moment(articleInfo.createdAt).format('DD.MM.YYYY')}
          </p>
          {supported && speakerBlock}
          {accountInfo?.address === articleInfo.author.address && (
            <Button
              className="ml-8"
              size="s"
              onClick={() => goTo(`/edit/${articleInfo.internalUrl}`)}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="mb-32 mt-32 flex flex-col justify-between">
          <h1 className="text-center text-8xl font-poppins break-word">
            {articleInfo.title}
          </h1>
          <div className="mt-32 flex justify-end mr-4">
            <span className="bg-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-600">
              {articleInfo._count.collectors}/{articleInfo.maxAmount} collected
            </span>
          </div>
        </div>

        <Blocks
          data={articleInfo.data}
          renderers={{
            list: List,
            quote: Quote as any,
            image: Image as any,
            nft: Nft as any,
            warning: Warning,
            checklist: Checkbox,
            checkbox: Checkbox,
            code: CodeBoxOutput,
          }}
          config={classConfig}
        />
        <div className="pt-32 pb-20">
          <div className="flex justify-center mt-12">
            <dl className="max-w-lg bg-gray-100 rounded-xl p-4 text-gray-900 divide-y divide-gray-200">
              <div className=" transition ease-in-out duration-150 rounded-md hover:bg-gray-200 flex flex-col pb-3 p-3 cursor-pointer">
                <a
                  target="_blank"
                  href={`https://testnet.xrpl.org/transactions/${articleInfo.transactionId}`}
                  rel="noreferrer"
                >
                  <div className="inline-flex w-full">
                    <dt className="text-md font-semibold mb-1 ">
                      Transaction ID
                    </dt>
                    <ArrowTopRightOnSquareIcon className="ml-3 mt-1 w-4 h-4 text-gray-500" />
                  </div>

                  <dd className="text-gray-500 md:text-md break-word">
                    {articleInfo.transactionId}
                  </dd>
                </a>
              </div>
              <div className="transition ease-in-out duration-150 rounded-md flex flex-col p-3 hover:bg-gray-200  cursor-pointer">
                <a
                  target="_blank"
                  href={`https://testnet.xrpl.org/accounts/${articleInfo.author.address}`}
                  rel="noreferrer"
                >
                  <div className="inline-flex">
                    <dt className="text-md font-semibold mb-1 ">
                      Author address
                    </dt>
                    <ArrowTopRightOnSquareIcon className="ml-3 mt-1 w-4 h-4 text-gray-500" />
                  </div>

                  <dd className="  text-gray-500 md:text-md">
                    {articleInfo.author.address}
                  </dd>
                </a>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {articleFooter}
    </div>
  );
};
