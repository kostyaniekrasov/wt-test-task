import { UserCard } from '@/components';
import { User } from '@/types';
import { render, screen } from '@testing-library/react';

describe('UserCard', () => {
  const mockUser: Pick<User, 'id' | 'name' | 'email' | 'company' | 'address'> =
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: {
        name: 'Test Co',
        catchPhrase: '',
        bs: '',
      },
      address: {
        city: 'Test City',
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
    };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByTestId('user-card-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('user-card-email')).toHaveTextContent(
      'john@example.com',
    );
    expect(screen.getByTestId('user-card-company-name')).toHaveTextContent(
      'Test Co',
    );
    expect(screen.getByTestId('user-card-address-city')).toHaveTextContent(
      'Test City',
    );
  });

  it('has correct href in Link', () => {
    render(<UserCard user={mockUser} />);
    const link = screen.getByTestId('user-card-link');
    expect(link).toHaveAttribute('href', '/users/1');
  });
});
