import { Filters } from '@/components';
import { User } from '@/types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Filters', () => {
  const mockUsers: Pick<User, 'company' | 'address'>[] = [
    {
      company: { name: 'Company A', catchPhrase: '', bs: '' },
      address: {
        city: 'City A',
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
    },
    {
      company: { name: 'Company B', catchPhrase: '', bs: '' },
      address: {
        city: 'City B',
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
    },
  ];

  const mockRouter = { push: jest.fn() };
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    jest.clearAllMocks();
  });

  it('renders all filter inputs', async () => {
    render(<Filters users={mockUsers} />);

    await waitFor(() => {
      expect(screen.getByTestId('filters-form')).toBeInTheDocument();
      expect(screen.getByTestId('name-filter-input')).toBeInTheDocument();
      expect(screen.getByTestId('company-filter-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('city-filter-wrapper')).toBeInTheDocument();
    });
  });

  it('updates name filter and calls router.push', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<Filters users={mockUsers} />);

    const nameInput = screen.getByTestId('name-filter-input');

    jest.useFakeTimers();

    await user.type(nameInput, 'John');
    jest.advanceTimersByTime(300);

    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith(
          expect.stringContaining('name=John'),
        );
      },
      { timeout: 1000 },
    );

    jest.useRealTimers();
  });

  it('updates company filter when selection changes', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<Filters users={mockUsers} />);

    const companyWrapper = await screen.findByTestId('company-filter-wrapper');
    const companyInput = companyWrapper.querySelector('input');

    if (!companyInput) throw new Error('Company input not found');

    jest.useFakeTimers();

    await user.type(companyInput, 'Company A');
    user.tab();

    jest.advanceTimersByTime(100);

    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith(
          expect.stringContaining('company=Company+A'),
        );
      },
      { timeout: 1000 },
    );

    jest.useRealTimers();
  });

  it('updates city filter when selection changes', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<Filters users={mockUsers} />);
    const cityWrapper = await screen.findByTestId('city-filter-wrapper');
    const cityInput = cityWrapper.querySelector('input');

    if (!cityInput) {
      throw new Error('Company input not found');
    }

    jest.useFakeTimers();

    await user.type(cityInput, 'City B');
    user.tab();

    jest.advanceTimersByTime(100);

    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith(
          expect.stringContaining('city=City+B'),
        );
      },
      { timeout: 1000 },
    );
  });

  it('displays default values from searchParams', async () => {
    const searchParamsWithValues = new URLSearchParams({
      name: 'Jane',
      company: 'Company A',
      city: 'City B',
    });
    (useSearchParams as jest.Mock).mockReturnValue(searchParamsWithValues);

    render(<Filters users={mockUsers} />);

    await waitFor(() => {
      const nameInput = screen.getByTestId('name-filter-input');
      expect(nameInput).toHaveValue('Jane');

      expect(screen.getByTestId('company-filter-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('city-filter-wrapper')).toBeInTheDocument();
    });
  });
});
