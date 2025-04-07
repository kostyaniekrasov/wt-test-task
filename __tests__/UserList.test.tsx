import { UserList } from '@/components';
import { User } from '@/types';
import { render, screen } from '@testing-library/react';

describe('UserList', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: { name: 'Company A' },
      address: { city: 'City A' },
    } as User,
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: { name: 'Company B' },
      address: { city: 'City B' },
    } as User,
  ];

  it('renders user list with users', () => {
    render(<UserList users={mockUsers} />);

    expect(screen.getByTestId('user-list-title')).toHaveTextContent('Users');
    expect(screen.getByTestId('user-card-container-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-card-container-2')).toBeInTheDocument();
  });

  it('shows no users message when list is empty', () => {
    render(<UserList users={[]} />);

    expect(screen.getByTestId('no-users-message')).toHaveTextContent(
      'User with filters not found',
    );
  });
});
