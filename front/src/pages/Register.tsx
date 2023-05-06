import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    const vFirstName = firstName.length < 3;
    const vSecName = lastName.length < 3;
    const validateEmail = /\S+@\S+\.\S+/;
    const vEmail = !email || !validateEmail.test(email) || email === '';
    const vEqPassword = password !== password2;
    const vPassword = password.length < 6;
    const vRPassword = password2.length < 6;

    if(vFirstName) setErFirstName('Insira um nome com pelo menos três caracteres');
    else setErFirstName('');

    if(vSecName) setErLastName('Insira um nome com pelo menos três caracteres');
    else setErLastName('');

    if (logs.data.exist) {
      setErEmail('Email já cadastrado na base de dados');
    } else {
      if (vEmail) setErEmail("Insira um E-mail válido");
      else setErEmail('');
    }

    const year: number = Number(date.slice(0,4));
    const month: number = Number(date.slice(5,7));
    const day: number = Number(date.slice(8,10));
    const atualYear: number = new Date().getFullYear();

    let dateVar: number = 0;

    if(year < atualYear - 120 || year > atualYear) {
      setErDate('Impossível ter nascido na data informada');
      dateVar = 1;
    } else if (year > atualYear - 10) {
      setErDate('Você precisa ter nascido há pelo menos 10 anos');
      dateVar = 1;
    } else if (month > 12 || month < 1) {
      setErDate('Impossível ter nascido na data informado');
      dateVar = 1;
    } else if (day < 1 || day > 31) {
      setErDate('Impossível ter nascido na data informada');
      dateVar = 1;
    } else {
      setErDate('');
      dateVar = 0;
    }

    if (vEqPassword) {
      setErPassword('Senhas inseridas não são semelhantes');
      setErPassword2('Senhas inseridas não são semelhantes');
    } else {

      if (vPassword) setErPassword("Insira uma senha com pelo menos 6 caracteres");
      else setErPassword('');
  
      if (vRPassword) setErPassword2("Insira uma senha com pelo menos 6 caracteres");
      else setErPassword2('');
    }

    return !(vFirstName || vSecName || vEmail || vEqPassword || vPassword ||vRPassword || logs.data.exist || dateVar === 1);
  };

  const register = async (): Promise<void> => {
    const validation: boolean = await validateData();
    if (validation) {
      try {
        const reg = await axios.post(`http://localhost:3333/users/create`,
        { firstName, lastName, email, password, dateOfBirth: date });

        console.log(reg);
        
        localStorage.setItem('D&D-Characters-guide', JSON.stringify(reg.data.user.token));

        navigate('/home');

      } catch(error) {
        window.alert(error);
      }
    }
  };

  const errorMessage = (message: string) => {
    if (message !== '') {
      return (<div className="w-full text-center color: $cleanWhite; font-weight: 600; margin: 0.5vh 0 3vh 0; line-height: 3vh;">{message}</div>);
    } return <div className="height: 3vh;" />
  }

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
            { errorMessage(erFirstName) }
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
            { errorMessage(erLastName) }
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
            { errorMessage(erEmail) }
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
            { errorMessage(erDate) }
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
            { errorMessage(erPassword) }
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
            { errorMessage(erPassword2) }
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