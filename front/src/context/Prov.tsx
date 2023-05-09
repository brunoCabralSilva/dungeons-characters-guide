import React, { ReactNode, useState } from 'react';
import contexto from './context';
import { IChildren } from './interface';

export default function Prov({ children }: IChildren): ReactNode {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

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