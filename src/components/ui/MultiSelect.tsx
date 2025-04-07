'use client';

import multiSelectStyles from './multiSelectStyles';
import { OptionType } from '@/types';
import { forwardRef } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

interface MultiSelectProps {
  options: string[];
  placeholder: string;
  defaultValue?: string[];
  onChangeAction: (values: string[] | null) => void;
}

const MultiSelect = forwardRef<any, MultiSelectProps>(
  ({ options, placeholder, defaultValue = [], onChangeAction }, ref) => {
    const animatedComponents = makeAnimated();
    const selectOptions = options.map((name) => ({ value: name, label: name }));
    const defaultOptions = defaultValue
      .filter(Boolean)
      .map((value) => ({ value, label: value }));

    const handleChange = (selected: MultiValue<OptionType>) => {
      onChangeAction(selected ? selected.map((opt) => opt.value) : null);
    };

    return (
      <Select<OptionType, true>
        ref={ref}
        isMulti
        options={selectOptions}
        components={animatedComponents}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={defaultOptions}
        styles={multiSelectStyles}
        className="w-full"
        instanceId="multi-select"
      />
    );
  },
);
MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
