import { Filters, UserCard } from '@/components';
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

      <section className="flex flex-col gap-4">
        <h1 className="mb-2 text-2xl font-semibold">Users</h1>

        {filtered.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
