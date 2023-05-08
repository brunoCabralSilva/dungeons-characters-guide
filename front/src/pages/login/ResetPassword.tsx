import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { equalityPassword, validateEmail, validatePassword } from '../../components/loginValidation';
import ErrorMessage from '../../components/ErrorMessage';

export default function Validation() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [erEmail, setErEmail] = useState('');
  const [change, setChange] = useState(false);

  const changePassword = async () => {
    const vEqPassword: boolean = equalityPassword(password, password2);
    const vPassword: boolean = validatePassword(password);
    const vRPassword: boolean = validatePassword(password2);

    if (!vEqPassword) {
      setErEmail('Senhas inseridas não são semelhantes');
    } else {
      if (!vPassword || !vRPassword) setErEmail("Insira uma senha com pelo menos 6 caracteres");
      else {
        const change = await axios.post(`http://localhost:3333/users/change-password`, { email, password });
        
        const login = await axios.post(`http://localhost:3333/users/login`, { email, password });

        localStorage.setItem('D&D-Characters-guide', JSON.stringify(login.data.user.token));

        setErEmail(change.data.message);

        if (change.data.message === "Senha alterada com sucesso, redirecionando...") {
          setTimeout(() => navigate('/home'), 3000);
        }
      }
    }
  };

  const validateData = async () => {
    const vEmail: boolean = validateEmail(email);
    const vCode: boolean = validatePassword(code);

    if (!vEmail) {
      setErEmail('Necessário preencher um E-mail Válido');
    } else if(code.length !== 6 || !vCode) {
      setErEmail('Necessário preencher um Código Válido');
    } else {
      try {
        const resp = await axios.post(`http://localhost:3333/users/login`, { email, password: code });

        if(resp) {
          setChange(true);
          setErEmail('');
        } else {
          setChange(false);
          setErEmail('Email e/ou senha não confere');
        }
      } catch(error) {
        setChange(false);
        setErEmail(`Ocorreu um erro': ${error}`);
      }
    }
  };

  return(
    <div className="h-screen w-full flex bg-mobile sm:bg-gray-200 sm:bg-none bg-cover relative justify-center">
      <img
        src={require('../../images/wallpapers/fullScreen.jpeg')}
        className="absolute w-full h-screen object-cover hidden sm:flex"
        alt="Emblema do Dungeons & Dragons"
      />
      <div className="bg-white/70 h-screen w-full absolute z-10" />
      <section className="w-full sm3:w-11/12 sm2:w-9/12 sm:w-7/12 lg:w-5/12 p-4 flex items-center justify-center z-20">
        <div className="flex flex-col w-full md:w-4/5 items-center">
          <img
            src={require('../../images/dnd.png')}
            className="w-11/12"
            alt="Emblema do Dungeons & Dragons"
          />
          <div className="w-full px-3 flex flex-col items-center mb-5">
            {
              !change && <div className="w-full">
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
                <label htmlFor="code" className="flex flex-col mt-2 w-full">
                  <input
                    id="code"
                    type="text"
                    value={ code }
                    onChange={ (e) => setCode(e.target.value) }
                    placeholder="Código Recebido"
                    autoComplete="off"
                    className="shadow-md rounded-full px-2 py-2 text-center text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={ validateData }
                  className="w-full hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md text-sm px-2 py-2 text-center"
                >
                  Validar
                </button>
              </div>
            }
            {
              change &&
              <div className="w-full">
              <label htmlFor="password" className="flex flex-col mt-10 w-full">
                <input
                  id="password"
                  type="password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  placeholder="Nova Senha"
                  autoComplete="off"
                  className="shadow-md rounded-full px-2 py-2 text-center text-sm"
                />
              </label>
              <label htmlFor="password2" className="flex flex-col mt-2 w-full">
                <input
                  id="password2"
                  type="password"
                  value={ password2 }
                  onChange={ (e) => setPassword2(e.target.value) }
                  placeholder="Repita a Senha"
                  autoComplete="off"
                  className="shadow-md rounded-full px-2 py-2 text-center text-sm"
                />
              </label>
              <button
                type="button"
                onClick={ changePassword }
                className="w-full hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md text-sm px-2 py-2 text-center"
              >
                Alterar Senha
              </button>
            </div>
          }
          </div>
          <ErrorMessage message={ erEmail } />
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