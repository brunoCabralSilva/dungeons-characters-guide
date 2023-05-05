export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface IUserCreate {
	name: string;
	email: string;
	password: string;
	dateOfBirth: string;
}

export interface IReqUser {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

export interface IResponseCreateUser {
  message: string;
  user: IReqUser;
}