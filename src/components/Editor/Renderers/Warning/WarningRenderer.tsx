import React from 'react';

import { WarningIcon } from '@/components/Icons/WarningIcon';

export const Warning = ({ data }) => {
  return (
    <div
      className="mt-4 inline-flex w-full break-word items-center rounded-lg bg-amber-100 py-5 px-6 text-base text-amber-800"
      role="alert"
    >
      <span className="mr-3 mt-px">
        <WarningIcon />
      </span>
      {data.title}
    </div>
  );
};
