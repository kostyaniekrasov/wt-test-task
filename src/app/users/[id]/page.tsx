import { RecursiveRender } from '@/components';
import fetchUserById from '@/lib/fetchUserById';
import Link from 'next/link';

const UserPage = async ({ params }: { params: { id: string } }) => {
  const user = await fetchUserById(Number(params.id));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="container mx-auto p-4">
      <Link
        href={'/'}
        className="mb-4 inline-block text-blue-500 underline"
      >
        Back to Users
      </Link>
      <div className="rounded-md border border-gray-300 p-4 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">User Info</h1>
        {RecursiveRender(user)}
      </div>
    </section>
  );
};

export default UserPage;
