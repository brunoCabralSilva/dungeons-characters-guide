import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { validateEmail, validatePassword } from '../components/loginValidation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erMessage, setErMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const dataToken: string | null = localStorage.getItem('D&D-Characters-guide');

    const validateToken = async () => {
      if (dataToken) {
        const token = await axios.post(`http://localhost:3333/users/authentication`, { token: JSON.parse(dataToken) },
        );
        if (token.data.auth) {
          navigate('/home');
        }
      }
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (): Promise<void> => {

    const vEmail: boolean = validateEmail(email);
    const vPassword: boolean = validatePassword(password);

    if (!vEmail || !vPassword) {
      setErMessage('Não foi possível realizar o Login. Por favor, verifique os dados informados.');
      setTimeout(() => setErMessage(''), 3000);
    } else {
      try {
        const resp = await axios.post(`http://localhost:3333/users/login`,
          {
            email,
            password,
          },
        );
        
        localStorage.setItem('D&D-Characters-guide', JSON.stringify(resp.data.user.token));
        
        navigate('/home');
  
      } catch(error) {
        setErMessage('Email e/ou senha Incorretos');
        setTimeout(() => setErMessage(''), 3000);
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
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="Email"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <label htmlFor="password" className="flex flex-col mt-3 w-full">
              <input
                id="password"
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Password"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <button
              type="button"
              onClick={ login }
              className="w-full hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md text-sm px-2 py-2 text-center"
            >
              Login
            </button>
          </div>
          <div className="w-full flex justify-end">
            <Link
              to="/forgot"
              className="text-right hover:underline mb-10 pt-2 px-4 text-gray-800 text-sm"
            >
              Esqueceu a Senha?
            </Link>
          </div>
          <ErrorMessage message={ erMessage } />
          <Link
            to="/register"
            type="button"
            className="mt-10 px-2 py-2 text-center mb-5 hover:underline w-11/12 transition duration-500 text-gray-800 text-sm"
          >
            Ainda não possui cadastro?
          </Link>
        </div>
      </section>
    </div>
  );
}