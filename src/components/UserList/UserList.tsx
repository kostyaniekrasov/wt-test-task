'use client';

import { UserCard } from '@/components';
import { User } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <section
      className="flex flex-col gap-4"
      data-testid="user-list"
    >
      <h1
        className="mb-2 text-2xl font-semibold"
        data-testid="user-list-title"
      >
        Users
      </h1>

      <AnimatePresence mode="sync">
        {users.map((user) => (
          <motion.div
            key={user.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-testid={`user-card-container-${user.id}`}
          >
            <UserCard user={user} />
          </motion.div>
        ))}

        {!users.length && (
          <div
            className="w-full rounded-md bg-gray-300 p-4"
            data-testid="no-users-message"
          >
            <p className="text-xl font-semibold text-gray-500">
              User with filters not found
            </p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UserList;
