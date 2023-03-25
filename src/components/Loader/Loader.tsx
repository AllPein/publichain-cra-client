import React, { FC, useMemo } from 'react';

import LoaderSvg from '@/assets/icons/loader.gif';

type LoaderProps = {
  centered?: boolean;
  size?: 's' | 'm' | 'l';
  className?: string;
};

export const Loader: FC<LoaderProps> = ({
  className,
  centered = false,
  size = 's',
}) => {
  const loaderClass = useMemo(() => {
    switch (size) {
      case 's':
        return 'w-16 h-16';
      case 'l':
        return 'w-64 h-64';
      default:
        return 'w-32 h-32';
    }
  }, [size]);

  if (!centered) {
    return (
      <img className={`${className} ${loaderClass}}`} src={LoaderSvg} alt="" />
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center content-center">
      <img className={loaderClass} src={LoaderSvg} alt="" />
    </div>
  );
};
