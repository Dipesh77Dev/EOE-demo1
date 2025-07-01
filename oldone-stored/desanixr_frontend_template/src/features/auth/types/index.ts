export type AuthUser = {
  _id: string;
  email: string;
  contact: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: 'ADMIN' | 'USER';
};

export type UserResponse = {
  user: AuthUser;
  token: string;
};
