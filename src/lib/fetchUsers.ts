import { UserSchema } from '@/lib';
import { User } from '@/types';
import { cache } from 'react';

const fetchUsersCached = cache(async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  const result = UserSchema.array().safeParse(data);

  if (!result.success) {
    throw new Error('Failed to validate users');
  }

  return result.data;
});

export default fetchUsersCached;
