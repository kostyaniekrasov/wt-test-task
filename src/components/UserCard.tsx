import { User } from '@/types';
import Link from 'next/link';
import React from 'react';

interface Props {
  user: Pick<User, 'id' | 'name' | 'email' | 'company' | 'address'>;
}

const UserCard = ({ user }: Props) => {
  console.log('UserCard rendered', user.id);
  return (
    <Link
      key={user.id}
      href={`/users/${user.id}`}
    >
      <article
        className="rounded-md border border-gray-300 p-4 text-gray-600 shadow-sm duration-300
          hover:bg-blue-400 hover:text-white hover:shadow-lg"
      >
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="">{user.email}</p>
        <p className="">{user.company.name}</p>
        <p className="">{user.address.city}</p>
      </article>
    </Link>
  );
};

export default React.memo(UserCard, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
