'use client';

import { User } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  users: Pick<User, 'company' | 'address'>[];
}

const Filters = ({ users }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const companies = Array.from(new Set(users.map((user) => user.company.name)));
  const cities = Array.from(new Set(users.map((user) => user.address.city)));

  const updateFilter = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      className="mb-6 space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search by Name"
        defaultValue={searchParams.get('name') ?? ''}
        onChange={(e) => updateFilter('name', e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500
          focus:outline-none"
      />

      <select
        value={searchParams.get('company') ?? 'default'}
        onChange={(e) => updateFilter('company', e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500"
      >
        <option value={'default'}>All companies</option>

        {companies.map((company) => (
          <option
            key={company}
            value={company}
          >
            {company}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('city') ?? 'default'}
        onChange={(e) => updateFilter('city', e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500"
      >
        <option value={'default'}>All cities</option>

        {cities.map((city) => (
          <option
            key={city}
            value={city}
          >
            {city}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Filters;
