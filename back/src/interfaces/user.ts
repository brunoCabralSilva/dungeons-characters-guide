import { Types } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  __v?: number,
}

export interface IUserCreateResponse {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  __v?: number,
}

export interface IUserCreateRequest {
	name: string;
	email: string;
	password: string;
	dateOfBirth: string;
}

export interface IReqUser {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  dateOfBirth: string;
}

export interface IResponseCreateUser {
  message: string;
  user: IReqUser;
}