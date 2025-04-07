'use client';

import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

interface Props {
  companies: string[];
  cities: string[];
}

const MultiSelect = dynamic(() => import('../ui/MultiSelect'), { ssr: false });

const Filters = ({ companies, cities }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <header>
      <form
        className="mb-6 flex flex-col gap-4 md:flex-row"
        onSubmit={(e) => e.preventDefault()}
        data-testid="filters-form"
      >
        <input
          type="text"
          placeholder="Search by Name"
          defaultValue={searchParams.get('name') ?? ''}
          onChange={handleNameFilterChange}
          className="h-14 w-full rounded-md border-2 border-gray-300 p-2 duration-300
            placeholder:text-gray-400 hover:border-blue-400 focus:border-blue-400
            focus:outline-none"
          data-testid="name-filter-input"
        />

        <div
          data-testid="company-filter-wrapper"
          className="w-full"
        >
          <MultiSelect
            options={companies}
            placeholder="Filter by Company"
            defaultValue={(searchParams.get('company') ?? '').split(',')}
            onChangeAction={(values) => updateFilter('company', values)}
          />
        </div>

        <div
          data-testid="city-filter-wrapper"
          className="w-full"
        >
          <MultiSelect
            options={cities}
            placeholder="Filter by City"
            defaultValue={(searchParams.get('city') ?? '').split(',')}
            onChangeAction={(values) => updateFilter('city', values)}
          />
        </div>
      </form>
    </header>
  );
};

export default Filters;
