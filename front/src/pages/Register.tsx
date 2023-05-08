import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { equalityPassword, validateEmail, validateName, validatePassword, validateDate } from '../components/loginValidation';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [erFirstName, setErFirstName] = useState('');
  const [erLastName, setErLastName] = useState('');
  const [erEmail, setErEmail] = useState('');
  const [erDate, setErDate] = useState('');
  const [erPassword, setErPassword] = useState('');
  const [erPassword2, setErPassword2] = useState('');
  const navigate = useNavigate();

  const validateData = async () => {
    const logs = await axios.post(`http://localhost:3333/users/email`,
    { email });
    const vFirstName = validateName(firstName);
    const vLastName = validateName(lastName);
    const vEmail = validateEmail(email);
    const vEqPassword = equalityPassword(password, password2);
    const vPassword = validatePassword(password);
    const vRPassword = validatePassword(password2);
    const vDate = validateDate(date);

    if(!vFirstName) setErFirstName('Insira um nome com pelo menos três caracteres');
    else setErFirstName('');

    if(!vLastName) setErLastName('Insira um nome com pelo menos três caracteres');
    else setErLastName('');

    if (logs.data.exist) {
      setErEmail('Email já cadastrado na base de dados');
    } else {
      if (!vEmail) setErEmail("Insira um E-mail válido");
      else setErEmail('');
    }

    if (!vDate) {
      setErDate('Data Inválida! Lembre-se que você precisa ter pelo menos 10 anos para utilizar esta aplicação');
    } else setErDate('');

    if (!vEqPassword) {
      setErPassword('Senhas inseridas não são semelhantes');
      setErPassword2('Senhas inseridas não são semelhantes');
    } else {

      if (!vPassword) setErPassword("Insira uma senha com pelo menos 6 caracteres");
      else setErPassword('');
  
      if (!vRPassword) setErPassword2("Insira uma senha com pelo menos 6 caracteres");
      else setErPassword2('');
    }

    return (vFirstName && vLastName && vEmail && vEqPassword && vPassword && vRPassword && !logs.data.exist && vDate);
  };

  const register = async (): Promise<void> => {
    const validation: boolean = await validateData();
    console.log(validation);
    if (validation) {
      try {
        const reg = await axios.post(`http://localhost:3333/users/create`,
        { firstName, lastName, email, password, dateOfBirth: date });
        
        localStorage.setItem('D&D-Characters-guide', JSON.stringify(reg.data.user.token));

        navigate('/home');

      } catch(error) {
        window.alert(error);
      }
    }
  };

  return(
    <div className="min-h-screen w-full flex bg-mobile sm:bg-gray-200 sm:bg-none bg-cover relative justify-center">
      <img
        src={require('../images/wallpapers/fullScreen.jpeg')}
        className="absolute w-full min-h-screen object-cover hidden sm:flex"
        alt="Emblema do Dungeons & Dragons"
      />
      <div className="bg-white/70 h-full w-full absolute z-10" />
      <section className="w-full sm3:w-11/12 sm2:w-9/12 sm:w-7/12 lg:w-5/12 p-4 flex items-center justify-center z-20">
        <div className="flex flex-col w-full md:w-4/5 items-center">
          <img
            src={require('../images/dnd.png')}
            className="w-11/12"
            alt="Emblema do Dungeons & Dragons"
          />
          <div className="w-full px-3 flex flex-col items-center">
            <label htmlFor="firstName" className="flex flex-col mt-10 w-full">
              <input
                id="firstName"
                type="text"
                value={ firstName }
                onChange={ (e) => setFirstName(e.target.value) }
                placeholder="Primeiro Nome"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <ErrorMessage message={ erFirstName } />
            <label htmlFor="lastName" className="flex flex-col mt-3 w-full">
              <input
                id="lastName"
                type="text"
                value={ lastName }
                onChange={ (e) => setLastName(e.target.value) }
                placeholder="Último Nome"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <ErrorMessage message={ erLastName } />
            <label htmlFor="email" className="flex flex-col mt-3 w-full">
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
            <ErrorMessage message={ erEmail } />
            <label htmlFor="datanasc" className="flex flex-col mt-3 w-full">
              <input
                id="datanasc"
                type="date"
                value={ date }
                onChange={ (e) => setDate(e.target.value) }
                placeholder="Data de Nascimento"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <ErrorMessage message={ erDate } />
            <label htmlFor="password" className="flex flex-col mt-3 w-full">
              <input
                id="password"
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Senha"
                autoComplete="off"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <ErrorMessage message={ erPassword } />
            <label htmlFor="password2" className="flex flex-col mt-3 w-full">
              <input
                id="password2"
                type="password"
                value={ password2 }
                onChange={ (e) => setPassword2(e.target.value) }
                placeholder="Repita a Senha"
                className="shadow-md rounded-full px-2 py-2 text-center text-sm"
              />
            </label>
            <ErrorMessage message={ erPassword2 } />
            <button
              type="button"
              onClick={ register }
              className="w-full hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md text-sm px-2 py-2 text-center"
            >
              Registrar
            </button>
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