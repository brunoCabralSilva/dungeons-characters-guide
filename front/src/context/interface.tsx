import { ReactNode } from 'react';

export interface IContext {
  firstName: String;
  lastName: String;
  email: String;
  setFirstName: (newState: string) => void,
  setLastName: (newState: string) => void,
  setEmail: (newState: string) => void,
}

export interface IChildren {
  children: ReactNode;
}