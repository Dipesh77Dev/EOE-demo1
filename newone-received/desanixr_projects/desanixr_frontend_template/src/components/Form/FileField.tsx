import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type FileFieldProps = FieldWrapperPassThroughProps & {
  type?: 'file';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  isMultiple: boolean;
};

export const FileField = (props: FileFieldProps) => {
  const { type = 'file', label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm input-file-field',
          className
        )}
        multiple={props.isMultiple}
        {...registration}
      />
    </FieldWrapper>
  );
};
