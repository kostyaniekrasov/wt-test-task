import { User } from '@/types';
import { cache } from 'react';

const getCities = cache((users: Pick<User, 'address'>[]) =>
  Array.from(new Set(users.map((u) => u.address.city))),
);

export default getCities;
