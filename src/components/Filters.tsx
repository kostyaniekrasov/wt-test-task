'use client';

import { User } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

interface Props {
  users: Pick<User, 'company' | 'address'>[];
}

type OptionType = {
  value: string;
  label: string;
};

const Filters = ({ users }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const animatedComponents = makeAnimated();

  const companies = useMemo(
    () => Array.from(new Set(users.map((u) => u.company.name))),
    [users],
  );
  const cities = useMemo(
    () => Array.from(new Set(users.map((u) => u.address.city))),
    [users],
  );

  const updateFilter = (filter: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(filter);
    } else if (Array.isArray(value)) {
      params.set(filter, value.join(','));
    } else {
      params.set(filter, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      className="mb-6 flex gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search by Name"
        defaultValue={searchParams.get('name') ?? ''}
        onChange={(e) => updateFilter('name', e.target.value)}
        className="w-full rounded-md border-2 border-gray-300 p-2 duration-300
          hover:border-blue-400 focus:border-blue-400 focus:outline-none"
      />
      <Select<OptionType, true>
        isMulti
        options={companies.map((name) => ({ value: name, label: name }))}
        components={animatedComponents}
        placeholder="Filter by Company"
        onChange={(selected) =>
          updateFilter(
            'company',
            selected ? selected.map((opt) => opt.value) : null,
          )
        }
        defaultValue={(searchParams.get('company') ?? '')
          .split(',')
          .filter(Boolean)
          .map((c) => ({ value: c, label: c }))}
        className="w-full"
      />

      {/* City filter */}
      <Select<OptionType, true>
        isMulti
        options={cities.map((name) => ({ value: name, label: name }))}
        components={animatedComponents}
        placeholder="Filter by City"
        onChange={(selected) =>
          updateFilter(
            'city',
            selected ? selected.map((opt) => opt.value) : null,
          )
        }
        defaultValue={(searchParams.get('city') ?? '')
          .split(',')
          .filter(Boolean)
          .map((c) => ({ value: c, label: c }))}
        className="w-full"
      />
    </form>
  );
};

export default Filters;
