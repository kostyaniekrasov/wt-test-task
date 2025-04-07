import { User } from '@/types';
import Link from 'next/link';
import React from 'react';

interface Props {
  user: Pick<User, 'id' | 'name' | 'email' | 'company' | 'address'>;
}

const UserCard = ({ user }: Props) => {
  return (
    <Link
      key={user.id}
      href={`/users/${user.id}`}
      data-testid="user-card-link"
    >
      <article
        className="rounded-md border border-gray-300 p-4 text-gray-600 shadow-sm duration-300
          hover:bg-blue-400 hover:text-white hover:shadow-lg"
        data-testid="user-card"
      >
        <h3
          className="text-lg font-semibold"
          data-testid="user-card-name"
        >
          {user.name}
        </h3>
        <p data-testid="user-card-email">{user.email}</p>
        <p data-testid="user-card-company-name">{user.company.name}</p>
        <p data-testid="user-card-address-city">{user.address.city}</p>
      </article>
    </Link>
  );
};

export default React.memo(UserCard, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
