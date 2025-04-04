import { Filters } from '@/components';
import { fetchUsers } from '@/lib';

const Home = async () => {
  const users = await fetchUsers();
  return (
    <main className="container mx-auto p-4">
      <Filters users={users} />
    </main>
  );
};

export default Home;
