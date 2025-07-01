import clsx from 'clsx';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export const DxrLink = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={clsx(className, 'dxr-link')} {...props}>
      {children}
    </RouterLink>
  );
};
