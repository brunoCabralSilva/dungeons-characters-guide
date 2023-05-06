import { Types } from 'mongoose';

export interface ILogin {
  email: string;
  password: string;
}

export interface IEmail {
  email: string;
}

export interface IUser {
  _id: string;
  firstName: string;
	lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  __v?: number,
}

export interface IUserCreateResponse {
  _id: Types.ObjectId;
  firstName: string;
	lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  __v?: number,
}

export interface IUserCreateRequest {
  firstName: string;
	lastName: string;
	email: string;
	password: string;
	dateOfBirth: string;
}

export interface IReqUser {
  _id: string | Types.ObjectId;
  firstName: string;
	lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface IResponseCreateUser {
  message: string;
  user: IReqUser;
}