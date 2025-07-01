import clsx from 'clsx';
import { useState } from 'react';
import DateTimePicker from 'react-datepicker';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type DateTimeFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  selected: Date;
  setNewValue: (value: Date) => void;
};

export const DateTimeField = (props: DateTimeFieldProps) => {
  const { label, className, error, selected, setNewValue } = props;
  const [currentDate, setCurrentDate] = useState(selected);
  return (
    <FieldWrapper label={label} error={error}>
      <DateTimePicker
        showTimeInput
        dateFormat="dd-MMM-yyyy HH:mm"
        timeFormat="HH:mm"
        {...props}
        selected={currentDate}
        onChange={(date) => {
          setCurrentDate(date);
          setNewValue(date);
        }}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        // {...registration}
      />
    </FieldWrapper>
  );
};
