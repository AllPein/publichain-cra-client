import CodeBox from '@bomdi/codebox';
import CheckList from '@editorjs/checklist';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import InlineImage from 'editorjs-inline-image';

import { Nft } from '@/components/Editor/Tools/Nft/NftTool';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: 'Type a paragraph here',
    },
  },
  list: List,
  warning: Warning,
  code: CodeBox,
  nft: Nft,
  image: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      embed: {
        display: true,
      },
      unsplash: {
        appName: process.env.REACT_APP_UNSPLASH_APP_NAME,
        clientId: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Heading',
    },
  },
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
};
