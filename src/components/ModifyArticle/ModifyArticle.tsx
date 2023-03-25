import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/Button/Button';
import { EDITOR_JS_TOOLS } from '@/constants/tools';
import { ModalActions } from '@/store/Modal/ModalActions';
import { ArticleAction } from '@/store/article/ArticleActions';
import { selectArticleInfo } from '@/store/article/ArticleSelectors';
import { LoaderAction } from '@/store/loader/LoaderActions';
import {
  selectPublishLoading,
  selectSaveLoading,
} from '@/store/loader/LoaderSelectors';
import { selectUserInfo } from '@/store/user/UserSelectors';
import { WebsocketAction } from '@/store/websocket/websocketActions';
import { EditorCore } from '@/types/EditorTypes';
import { goTo } from '@/utils/routerActions';

type Props = {
  isEditing: boolean;
};

export const ModifyArticle: FC<Props> = ({ isEditing }) => {
  const dispatch = useDispatch();

  const headingRef = useRef(null);
  const editorCore = useRef<EditorCore>(null);

  const accountInfo = useSelector(selectUserInfo);
  const articleInfo = useSelector(selectArticleInfo);

  const publishLoading = useSelector(selectPublishLoading);
  const saveLoading = useSelector(selectSaveLoading);

  const ReactEditorJS = createReactEditorJS();

  useEffect(() => {
    return () => {
      dispatch(ArticleAction.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (articleInfo && accountInfo) {
      if (articleInfo.author.address !== accountInfo?.address) {
        goTo('/explore');
      }
    }
  }, [articleInfo, accountInfo]);

  const handleInitialize = useCallback(
    (instance) => {
      // @ts-ignore
      editorCore.current = instance;
    },
    [editorCore],
  );

  const onSave = async () => {
    return await editorCore.current!.save();
  };

  const handlePublish = async () => {
    const savedData = await onSave();

    /* Don't ever do that!*/
    const headingValue = (headingRef as any)?.current.childNodes[0].data;
    dispatch(LoaderAction.setLoading('publish'));
    dispatch(
      ModalActions.openModal({
        key: 'signature',
      }),
    );
    dispatch(
      WebsocketAction.sendMessage({
        event: 'PUBLISH',
        data: {
          address: accountInfo!.address,
          title: headingValue,
          body: savedData,
          supply: 200,
        },
      }),
    );
  };

  const handleSave = async () => {
    const savedData = await onSave();
    dispatch(LoaderAction.setLoading('mutate'));
    dispatch(
      WebsocketAction.sendMessage({
        event: 'MUTATE',
        data: {
          body: savedData,
          internalUrl: articleInfo!.internalUrl,
        },
      }),
    );
  };

  const headingComponent = useMemo(() => {
    if (isEditing && articleInfo) {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 mt-16 flex flex-col justify-between">
            <h1 className="text-center text-8xl font-poppins break-word">
              {articleInfo.title}
            </h1>
            <div className="mt-32 flex justify-end mr-4">
              <span className="bg-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-600">
                {articleInfo._count.collectors}/{articleInfo.maxAmount}{' '}
                collected
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex mb-12 w-full justify-center">
        <span
          className="textarea"
          aria-label="heading"
          role="textbox"
          ref={headingRef}
          contentEditable
        />
      </div>
    );
  }, [articleInfo, headingRef, isEditing]);

  if (isEditing && !articleInfo) {
    return null;
  }

  return (
    <div>
      {headingComponent}
      <ReactEditorJS
        holder="editor"
        defaultValue={isEditing ? articleInfo?.data : []}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
      />
      <div className="flex w-full justify-center">
        {!articleInfo ? (
          <Button
            onClick={handlePublish}
            loading={publishLoading}
            className="mt-12 w-32"
          >
            Publish
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            loading={saveLoading}
            className="mt-12 w-32"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};
