import React, { ReactNode, useState } from 'react';
import contexto from './context';

interface IChildren { children: ReactNode };

export default function Prov({ children }: IChildren) {
  const [firstName, setFirst] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const setFirstName = (name: string): void => {
    setFirst(name);
  }

  return(
    <contexto.Provider
      value={{ 
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
      }}
    >
      { children }
    </contexto.Provider>
  );
}