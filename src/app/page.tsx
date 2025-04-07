import { Filters, UserList } from '@/components';
import { fetchUsers, filterUsers } from '@/lib';
import { User } from '@/types';

interface Props {
  readonly searchParams: Readonly<
    Promise<{
      [key: string]: string | string[] | undefined;
    }>
  >;
}

export default async function Home({ searchParams }: Props) {
  let users: User[] = [];
  try {
    users = await fetchUsers();
  } catch (error) {
    return (
      <main
        className="container mx-auto p-4"
        data-testid="error-message"
      >
        <p className="text-red-500">
          Error fetching users: {(error as Error).message}
        </p>
      </main>
    );
  }

  const resolvedSearchParams = await searchParams;

  const filteredUsers = filterUsers(users, resolvedSearchParams);

  return (
    <main
      className="container mx-auto p-4"
      data-testid="home-page"
    >
      <Filters users={users} />
      <UserList users={filteredUsers} />
    </main>
  );
}
