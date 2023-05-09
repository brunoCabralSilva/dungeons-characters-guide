import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewSheet() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const dataToken: string | null = localStorage.getItem('D&D-Characters-guide');

    const validateToken = async () => {
      if (dataToken) {
        const token = await axios.post(`http://localhost:3333/users/authentication`, { token: JSON.parse(dataToken) },
        );
        if (!token.data.auth) {
          navigate('/login');
        }
      }
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className="relative">
      <Nav />
      <img
        src={require('../images/wallpapers/fullScreen.jpeg')}
        className="absolute w-full h-screen object-cover"
        alt="Emblema do Dungeons & Dragons"
      />
      <div className="bg-white/70 h-screen w-full absolute z-10" />
      <div className="relative z-30">
        Criar Ficha
      </div>
    </div>
  );
}