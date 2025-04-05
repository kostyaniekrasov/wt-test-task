import { Filters, UserCard } from '@/components';
import { fetchUsers } from '@/lib';

const Home = async ({ searchParams }: any) => {
  const users = await fetchUsers();
  const filtered = users.filter((u) => {
    const nameMatch =
      !searchParams.name ||
      u.name.toLowerCase().includes(searchParams.name.toLowerCase());
    const companyMatch =
      !searchParams.company || u.company.name === searchParams.company;
    const cityMatch =
      !searchParams.city || u.address.city === searchParams.city;
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
