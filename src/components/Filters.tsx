'use client';

import { User } from '@/types';
import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

interface Props {
  users: Pick<User, 'company' | 'address'>[];
}

const MultiSelect = dynamic(() => import('./ui/MultiSelect'), { ssr: false });

const Filters = ({ users }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const debouncedNameFilter = useMemo(
    () =>
      debounce((value: string) => {
        updateFilter('name', value);
      }, 300),
    [],
  );

  const handleNameFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedNameFilter(value);
    },
    [debouncedNameFilter],
  );

  useEffect(() => {
    return () => debouncedNameFilter.cancel();
  }, [debouncedNameFilter]);

  return (
    <form
      className="mb-6 flex flex-col gap-4 md:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search by Name"
        defaultValue={searchParams.get('name') ?? ''}
        onChange={handleNameFilterChange}
        className="h-14 w-full rounded-md border-2 border-gray-300 p-2 duration-300
          placeholder:text-gray-400 hover:border-blue-400 focus:border-blue-400
          focus:outline-none"
      />

      <MultiSelect
        options={companies}
        placeholder="Filter by Company"
        defaultValue={(searchParams.get('company') ?? '').split(',')}
        onChangeAction={(values) => updateFilter('company', values)}
      />

      <MultiSelect
        options={cities}
        placeholder="Filter by City"
        defaultValue={(searchParams.get('city') ?? '').split(',')}
        onChangeAction={(values) => updateFilter('city', values)}
      />
    </form>
  );
};

export default Filters;
