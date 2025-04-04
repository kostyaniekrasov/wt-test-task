import { User } from '@/types';

const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export default fetchUserById;
