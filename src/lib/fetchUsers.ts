import { User } from '@/types';
import { UserSchema } from '@/lib';

const fetchUsers = async (): Promise<User[]> => {
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
};

export default fetchUsers;
