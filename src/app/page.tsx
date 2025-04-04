import { Filters, UserList } from '@/components';
import { fetchUsers } from '@/lib';

const Home = async () => {
  const users = await fetchUsers();
  return (
    <main className="container mx-auto p-4">
      <Filters users={users} />
      <UserList users={users} />
    </main>
  );
};

export default Home;
