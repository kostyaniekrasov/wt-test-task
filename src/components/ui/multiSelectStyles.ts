import { OptionType } from '@/types';
import { StylesConfig } from 'react-select';

const multiSelectStyles: StylesConfig<OptionType, true> = {
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: 'calc(var(--spacing) * 14)',
    width: '100%',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'none',
    borderWidth: '2px',
    borderColor: isFocused ? 'var(--color-blue-400)' : 'var(--color-gray-300)',
    transition: 'all 300ms',
    ':hover': {
      borderColor: 'var(--color-blue-400)',
    },
  }),
  input: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--color-gray-400)',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
  }),
  menu: (base) => ({
    ...base,
    marginTop: '0.5rem',
    border: '1px solid var(--color-gray-200)',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    backgroundColor: isFocused ? 'var(--color-blue-100)' : 'transparent',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--color-blue-300)',
    borderRadius: 'var(--radius-md)',
    fontWeight: '500',
    width: 'fit-content',
    padding: '0.25rem 0.5rem',
    marginRight: '0.5rem',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
    borderRadius: 'var(--radius-md)',
    transition: 'all 300ms',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--color-red-200)',
      color: 'var(--color-red-600)',
    },
  }),
};

export default multiSelectStyles;
