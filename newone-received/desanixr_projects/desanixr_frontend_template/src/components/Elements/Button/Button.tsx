import clsx from 'clsx';
import * as React from 'react';

import { DxrSpinner } from '@/components/Elements/Spinner';

const variants = {
  primary: 'bg-blue-900 text-gray-100',
  inverse: 'bg-transperant text-blue-900',
  danger: 'bg-red-300 text-black',
  cancel: 'bg-green-100 text-black',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const DxrButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && <DxrSpinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className={startIcon && props.children ? 'mx-1' : ''}>{props.children}</span>
        {!isLoading && endIcon}
      </button>
    );
  }
);

DxrButton.displayName = 'Button';
