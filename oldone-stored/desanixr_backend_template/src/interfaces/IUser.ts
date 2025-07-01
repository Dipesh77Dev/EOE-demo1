export interface IUser {
  _id: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  contact: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export interface IUserInputDTO {
  email: string;
  password: string;
  contact: string;
  firstName: string;
  lastName: string;
  bio: string;
}
