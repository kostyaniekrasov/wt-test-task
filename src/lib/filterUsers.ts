import { User } from '@/types';

const filterUsers = (
  users: User[],
  searchParams: { [key: string]: string | string[] | undefined },
) => {
  const nameFilter = (searchParams.name as string)?.toLowerCase() || '';
  const companyParams = (searchParams.company as string)?.split(',') || [];
  const cityParams = (searchParams.city as string)?.split(',') || [];

  return users.filter((u) => {
    const nameMatch = !nameFilter || u.name.toLowerCase().includes(nameFilter);
    const companyMatch =
      companyParams.length === 0 || companyParams.includes(u.company.name);
    const cityMatch =
      cityParams.length === 0 || cityParams.includes(u.address.city);
    return nameMatch && companyMatch && cityMatch;
  });
};

export default filterUsers;
