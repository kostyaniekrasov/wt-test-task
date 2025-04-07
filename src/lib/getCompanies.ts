import { User } from '@/types';
import { cache } from 'react';

const getCompanies = cache((users: Pick<User, 'company'>[]) =>
  Array.from(new Set(users.map((u) => u.company.name))),
);

export default getCompanies;
