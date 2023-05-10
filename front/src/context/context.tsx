import { createContext } from 'react';

interface IContext {
  firstName: String;
  lastName: String;
  email: String;
  setFirstName: (newState: string) => void;
  setLastName: (newState: string) => void;
  setEmail: (newState: string) => void;
}

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