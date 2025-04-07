import { fetchUsers, UserSchema } from '@/lib';

describe('fetchUsers', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and validates users successfully', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
          geo: {
            lat: '12.34',
            lng: '56.78',
          },
        },
        phone: '123-456-7890',
        website: 'http://johndoe.com',
        company: {
          name: 'Test Co',
          catchPhrase: 'Innovative Solutions',
          bs: 'Business Solutions',
        },
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });

    const result = await fetchUsers();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
    );
    expect(UserSchema.array().safeParse(result).success).toBe(true);
  });

  it('throws error on fetch failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
  });

  it('throws error on invalid user data', async () => {
    const invalidMockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: { name: 'Test Co' },
        address: { city: 'Test City' },
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(invalidMockUsers),
    });

    await expect(fetchUsers()).rejects.toThrow('Failed to validate users');
  });
});
