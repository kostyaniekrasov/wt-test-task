import { filterUsers } from '@/lib';
import { User } from '@/types';

describe('filterUsers', () => {
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

  it('filters by name', () => {
    const result = filterUsers(mockUsers, { name: 'john' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John Doe');
  });

  it('filters by company', () => {
    const result = filterUsers(mockUsers, { company: 'Company A' });
    expect(result).toHaveLength(1);
    expect(result[0].company.name).toBe('Company A');
  });

  it('filters by city', () => {
    const result = filterUsers(mockUsers, { city: 'City B' });
    expect(result).toHaveLength(1);
    expect(result[0].address.city).toBe('City B');
  });

  it('returns all users when no filters', () => {
    const result = filterUsers(mockUsers, {});
    expect(result).toHaveLength(2);
  });
});
