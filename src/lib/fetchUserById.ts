import { User } from '@/types';
import UserSchema from './validation';

const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await response.json();

  const result = UserSchema.safeParse(data);
  if (!result.success) {
    throw new Error('Failed to validate user');
  }
  return result.data;
};

export default fetchUserById;
