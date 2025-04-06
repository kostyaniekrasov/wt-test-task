'use client';

import makeAnimated from 'react-select/animated';
import Select, { MultiValue } from 'react-select';

type OptionType = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: string[];
  placeholder: string;
  defaultValue?: string[];
  onChangeAction: (values: string[] | null) => void;
}

export default function MultiSelect({
  options,
  placeholder,
  defaultValue = [],
  onChangeAction,
}: Readonly<MultiSelectProps>) {
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
      isMulti
      options={selectOptions}
      components={animatedComponents}
      placeholder={placeholder}
      onChange={handleChange}
      defaultValue={defaultOptions}
      className="w-full"
      classNames={{
        control: () =>
          'w-full rounded-md border-2 border-gray-300 p-2 duration-300 hover:border-blue-400 focus:border-blue-400 focus:outline-none',
        input: () => 'text-gray-700',
        placeholder: () => 'text-gray-400',
        singleValue: () => 'text-gray-700',
        menu: () => 'mt-2 border border-gray-200 rounded-md shadow-md',
        option: ({ isFocused, isSelected }) =>
          `px-3 py-2 cursor-pointer ${isFocused ? 'bg-blue-100' : ''} ${
            isSelected ? 'bg-blue-200 font-semibold' : ''
          }`,
      }}
    />
  );
}
