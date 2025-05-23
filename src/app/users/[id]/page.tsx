import { RecursiveRender } from '@/components';
import fetchUserById from '@/lib/fetchUserById';
import { User } from '@/types';
import Link from 'next/link';

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  let user: User | null = null;

  try {
    user = await fetchUserById(Number(resolvedParams.id));
  } catch (error) {
    return (
      <section
        className="container mx-auto p-4"
        data-testid="error-message"
      >
        <p className="text-red-500">
          Error fetching user: {(error as Error).message}
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <Link
        href={'/'}
        className="mb-4 flex h-14 w-fit items-center rounded-xl bg-blue-400 px-4 font-semibold
          text-white duration-300 hover:bg-blue-500"
        data-testid="back-button"
      >
        Back to Users
      </Link>

      <div
        className="rounded-md border border-gray-300 p-4 shadow-sm"
        data-testid="user-details"
      >
        <h1 className="mb-4 text-2xl font-bold">User Info</h1>
        {!user && (
          <h2
            className="text-xl font-semibold"
            data-testid="not-found-message"
          >
            User not found
          </h2>
        )}
        {RecursiveRender(user)}
      </div>
    </section>
  );
};

export default UserPage;
