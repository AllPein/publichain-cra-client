import React, { useEffect, useState } from 'react';

import { ArrowUpIcon } from '@heroicons/react/20/solid';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-6 z-10">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default',
          'transition-opacity duration-500 ease-in-out inline-flex bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 items-center rounded-full p-3 text-white shadow-sm focus:outline-none',
        )}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
