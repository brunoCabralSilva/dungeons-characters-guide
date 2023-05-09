import { createContext } from 'react';
import { IContext } from './interface';

const initialValue: IContext = {
  firstName: '',
  lastName: '',
  email: '',
  setFirstName: () => {},
  setLastName: () => {},
  setEmail: () => {},
};

const contexto = createContext(initialValue);

export default contexto;