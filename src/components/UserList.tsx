'use client';

import { User } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { UserCard } from '@/components';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-2 text-2xl font-semibold">Users</h1>

      <AnimatePresence mode="sync">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default UserList;
