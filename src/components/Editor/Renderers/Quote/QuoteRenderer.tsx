import React from 'react';

import { RenderFn } from 'editorjs-blocks-react-renderer';
import HTMLReactParser from 'html-react-parser';

export interface QuoteBlockData {
  text: string;
  caption?: string;
  alignment?: 'left' | 'center';
}

export interface QuoteBlockConfig {
  actionsClassNames?: {
    [s: string]: string;
  };
}

const Quote: RenderFn<QuoteBlockData, QuoteBlockConfig> = ({
  data,
  className = '',
  actionsClassNames = {
    alignment: 'text-align-{alignment}',
  },
}) => {
  const classNames: string[] = [];

  if (data?.alignment) {
    classNames.push(
      actionsClassNames.alignment.replace('{alignment}', data.alignment),
    );
  }

  if (className) classNames.push(className);

  const blockquoteprops: {
    [s: string]: string;
  } = {};

  if (classNames.length > 0) {
    blockquoteprops.className = classNames.join(' ');
  }

  return (
    <>
      <blockquote {...blockquoteprops}>
        {data?.text &&
          data.text
            .split('\n\n')
            .map((paragraph, i) => (
              <p key={i}>
                {HTMLReactParser(
                  paragraph
                    .split('\n')
                    .reduce((total, line) => [total, '<br />', line].join('')),
                )}
              </p>
            ))}
        <div className="mt-3">
          <cite className="text-sm font-light text-gray-500">
            ~ {data?.caption && HTMLReactParser(data.caption)}
          </cite>
        </div>
      </blockquote>
    </>
  );
};

export { Quote };
