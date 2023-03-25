import React, { FC, useMemo } from 'react';

type ButtonProps = {
  className?: string;
  loading?: boolean;
  round?: boolean;
  size?: 's' | 'm' | 'l';
  onClick: () => any;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  className,
  size = 'm',
  round = false,
  disabled,
  loading,
  onClick,
  children,
}) => {
  const btnSizeClass = useMemo(() => {
    switch (size) {
      case 's':
        return 'rounded-md p-2 text-xs';
      case 'l':
        return 'rounded-xl py-4 px-6 text-lg';
      default:
        return 'rounded-lg p-3 text-base';
    }
  }, [size]);

  const btnBgClass = useMemo(() => {
    const defaultBg = 'bg-indigo-600 hover:bg-indigo-500';

    if (loading || disabled) {
      return 'bg-gray-300';
    }

    return defaultBg;
  }, [loading, disabled]);

  return (
    <button
      disabled={loading || disabled}
      type="submit"
      onClick={onClick}
      className={`transition duration-150 ease-in-out inline-flex items-center justify-center ${className} ${btnSizeClass} ${btnBgClass} ${
        round ? 'rounded-full' : ''
      } font-medium text-white`}
    >
      {loading && (
        <svg
          className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
