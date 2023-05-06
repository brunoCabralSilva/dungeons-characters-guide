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
      <div
        className="w-12 h-12 bg-red-600 rounded-full cursor-pointer"
        onClick={ () => setMenu(!menu) }
      />

      { menu &&
        <div className="fixed top-0 right-0 p-3 pb-20 bg-white border border-left h-screen w-full sm:w-56 flex flex-col justify-between">
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
              className="mb-5"
              onClick={ () => setMenu(!menu) }
            >
              Início
            </Link>
            <Link
              to="/make-character-sheet"
              className="mb-5"
              onClick={ () => setMenu(!menu) }
            >
              Criar Ficha
            </Link>
            <Link
              to="/character-sheet"
              className="mb-5"
              onClick={ () => setMenu(!menu) }
            >
              Minhas Fichas
            </Link>
            <Link
              to="/profile"
              className="mb-5"
              onClick={ () => setMenu(!menu) }
            >
              Perfil
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/login"
              onClick={ () => localStorage.removeItem('D&D-Characters-guide') }
            >
              Sair
            </Link>
          </div>
        </div>
      }
    </nav>
  );
}