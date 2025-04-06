import { Filters, UserList } from '@/components';
import { fetchUsers } from '@/lib';

const Home = async ({ searchParams }: any) => {
  const users = await fetchUsers();
  const filtered = users.filter((u) => {
    const name = searchParams.name?.toLowerCase() || '';
    const companyParams = searchParams.company?.split(',') || [];
    const cityParams = searchParams.city?.split(',') || [];

    const nameMatch = !name || u.name.toLowerCase().includes(name);
    const companyMatch =
      companyParams.length === 0 || companyParams.includes(u.company.name);
    const cityMatch =
      cityParams.length === 0 || cityParams.includes(u.address.city);

    return nameMatch && companyMatch && cityMatch;
  });

  return (
    <main className="container mx-auto p-4">
      <Filters users={users} />
      <UserList users={filtered} />
    </main>
  );
};

export default Home;
