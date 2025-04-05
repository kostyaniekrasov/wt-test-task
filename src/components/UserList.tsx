import { User } from '@/types';
import Link from 'next/link';

interface Props {
  users: Pick<User, 'id' | 'name' | 'email' | 'company' | 'address'>[];
}

const UserList = ({ users }: Props) => {
  return (
    <ul className="flex flex-col gap-4">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/users/${user.id}`}
        >
          <li className="rounded-md border border-gray-300 p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.company.name}</p>
            <p className="text-gray-600">{user.address.city}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default UserList;
