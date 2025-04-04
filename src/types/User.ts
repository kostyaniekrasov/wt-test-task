interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
}

export default User;
