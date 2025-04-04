import { User } from '@/types';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export default fetchUsers;
