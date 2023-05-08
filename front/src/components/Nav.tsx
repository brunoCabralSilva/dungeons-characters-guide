import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const dataToken: string | null = localStorage.getItem('D&D-Characters-guide');

    const validateToken = async () => {
      if (dataToken) {
        const token = await axios.post(`http://localhost:3333/users/authentication`, { token: JSON.parse(dataToken) },
        );
        if (!token.data.auth) {
          navigate('/login');
        }
      } else navigate('/login');
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <nav className="border border-bottom flex justify-between p-3 items-center">
      <img
        src={ require('../images/icon.png') }
        alt="Dnd Extralife"
        className="w-12 cursor-pointer"
        onClick={ () => navigate('/home') }
      />
      <img
        src={ require('../images/title.png') }
        alt="Dnd Extralife"
        className="w-64 hidden sm2:flex sm:w-96"
        onClick={ () => navigate('/home') }
      />
      <div
        className={`w-12 h-12 ${menu ? 'bg-white' : 'bg-red-600'} rounded-full cursor-pointer`}
        onClick={ () => setMenu(!menu) }
      />
      <div className={`${menu ? 'menu' : 'menu-disable'} transition-all flex flex-col justify-between`}>
        <div className="flex flex-col justify-around items-center">
          <div
            className="w-12 h-12 bg-red-600 rounded-full cursor-pointer mb-3"
            onClick={ () => setMenu(!menu) }
          />
          <p>Name</p>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/home"
            className="mb-5 hover:underline hover:decoration-red-600 hover:decoration-2 hover:underline-offset-2"
            onClick={ () => setMenu(!menu) }
          >
            Início
          </Link>
          <Link
            to="/make-character-sheet"
            className="mb-5 hover:underline hover:decoration-red-600 hover:decoration-2 hover:underline-offset-2"
            onClick={ () => setMenu(!menu) }
          >
            Criar Ficha
          </Link>
          <Link
            to="/character-sheet"
            className="mb-5 hover:underline hover:decoration-red-600 hover:decoration-2 hover:underline-offset-2"
            onClick={ () => setMenu(!menu) }
          >
            Minhas Fichas
          </Link>
          <Link
            to="/profile"
            className="mb-5 hover:underline hover:decoration-red-600 hover:decoration-2 hover:underline-offset-2"
            onClick={ () => setMenu(!menu) }
          >
            Perfil
          </Link>
        </div>
        <div className="flex justify-center">
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