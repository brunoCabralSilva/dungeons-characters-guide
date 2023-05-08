import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { validateEmail } from '../components/loginValidation';

export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [erEmail, setErEmail] = useState('');

  const forgotPassword = async () => {
    const vEmail = validateEmail(email);
    if (!vEmail) {
      setErEmail('Necessário preencher um E-mail Válido');
    } else {
      try {
        await axios.post(`http://localhost:3333/users/forgot`,
        { email });

        setErEmail('E-mail enviado com sucesso. Verifique a sua Caixa de Entrada ou o SPAM.');

        setTimeout(() => navigate('/validation'), 3000);

      } catch(error) {
        setErEmail(`Houve um erro: ${error}`);
      }
    }
  };

  return(
    <div className="h-screen w-full flex bg-mobile sm:bg-gray-200 sm:bg-none bg-cover relative justify-center">
      <img
        src={require('../images/wallpapers/fullScreen.jpeg')}
        className="absolute w-full h-screen object-cover hidden sm:flex"
        alt="Emblema do Dungeons & Dragons"
      />
      <div className="bg-white/70 h-screen w-full absolute z-10" />
      <section className="w-full sm3:w-11/12 sm2:w-9/12 sm:w-7/12 lg:w-5/12 p-4 flex items-center justify-center z-20">
        <div className="flex flex-col w-full md:w-4/5 items-center">
          <img
            src={require('../images/dnd.png')}
            className="w-11/12"
            alt="Emblema do Dungeons & Dragons"
          />
          <div className="w-full px-3 flex flex-col items-center">
            <label htmlFor="email" className="flex flex-col mt-10 w-full">
              <input
                id="email"
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="Email"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <button
              type="button"
              onClick={ forgotPassword }
              className="w-full hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md text-sm px-2 py-2 text-center mb-5"
            >
              Resgatar Senha
            </button>
            <ErrorMessage message={ erEmail } />
          </div>
          <Link
            to="/login"
            type="button"
            className="mt-10 px-2 py-2 text-center mb-5 hover:underline w-11/12 transition duration-500 text-gray-800 text-sm"
          >
            Voltar para tela de Login
          </Link>
        </div>
      </section>
    </div>
  );
}