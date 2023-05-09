import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const dataToken: string | null = localStorage.getItem('D&D-Characters-guide');

    const validateToken = async () => {
      if (dataToken) {
        const token = await axios.post(`http://localhost:3333/users/authentication`, { token: JSON.parse(dataToken) },
        );
        if (!token.data.auth) {
          navigate('/login');
        } else {
          const decode = await axios.post(`http://localhost:3333/users/decode`, { token: JSON.parse(dataToken) });
          console.log(decode);
          setName(`${decode.data.firstName} ${decode.data.lastName}`);
          setEmail(decode.data.email);
        }
      } else navigate('/login');
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const first = (): string => {
    if(open) return 'translate-y-2 -rotate-45';
    return 'translate-x-0 rotate-0';
  };

  const second = (): string => {
    if(open) return 'translate-x-0 rotate-45';
    return 'translate-x-0 rotate-0';
  };

  const third = (): string => {
    if(open) return 'opacity-0 transition duration-500 z-0';
    return 'opacity-1 transition duration-500 z-30';
  };

  return(
    <nav className="border border-bottom flex justify-between px-2 sm:p-3 sm:px-3 items-center">
      <img
        src={ require('../images/icon.png') }
        alt="Dnd Extralife"
        className="w-8 cursor-pointer"
        onClick={ () => navigate('/home') }
      />
      <img
        src={ require('../images/title.png') }
        alt="Dnd Extralife"
        className="w-64 hidden sm2:flex sm:w-96"
        onClick={ () => navigate('/home') }
      />

      <div className="cursor-pointer w-11 h-12 p-2 z-50" onClick={ () => setOpen(!open) }>
        <div className={`w-full h-1 bg-red-600 mt-1 transition duration-500 ${first()}`} />
        <div className={`w-full h-1 bg-red-600 mt-1 transition duration-500 ${second()}`} />
        <div className={`w-full h-1 bg-red-600 mt-1 transition duration-300 ${third()}`} />
      </div>

      <div className={ `${!open ? 'hidden' : 'flex' } flex-col fixed top-0 right-0 justify-center h-screen w-full sm2:w-56 bg-white z-40 px-1 border`}>
        <div className="flex flex-col items-center z-30">
          <Link
            to="/home"
            className="w-full text-center py-2 mb-1 hover:bg-red-600/20 bg-white transition-colors duration-500"
            onClick={ () => setMenu(!menu) }
          >
            Início
          </Link>
          <Link
            to="/make-character-sheet"
            className="w-full text-center py-2 mb-1 hover:bg-red-600/20 bg-white transition-colors duration-500"
            onClick={ () => setMenu(!menu) }
          >
            Criar Ficha
          </Link>
          <Link
            to="/character-sheet"
            className="w-full text-center py-2 mb-1 hover:bg-red-600/20 bg-white transition-colors duration-500"
            onClick={ () => setMenu(!menu) }
          >
            Minhas Fichas
          </Link>
          <Link
            to="/profile"
            className="w-full text-center py-2 mb-1 hover:bg-red-600/20"
            onClick={ () => setMenu(!menu) }
          >
            Perfil
          </Link>
        </div>
        <div className="flex w-full absolute items-end h-full justify-center z-10 mb-28">
          <Link
            to="/login"
            onClick={ () => localStorage.removeItem('D&D-Characters-guide') }
            className="hover:font-bold hover:text-red-600"
          >
            Sair
          </Link>
        </div>
      </div>
    </nav>
  );
}