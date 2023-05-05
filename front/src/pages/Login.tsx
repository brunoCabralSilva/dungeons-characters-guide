import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return(
    <div className="h-screen w-full flex bg-gray-200">
      <img
        src={require('../images/wallpapers/fullScreen.jpeg')}
        className="w-3/5 object-cover p-10"
        alt="Emblema do Dungeons & Dragons"
      />
      <section className="w-2/5 p-4 flex items-center justify-center">
        <div className="flex flex-col w-2/3 items-center">
          <img
            src={require('../images/dnd.png')}
            className="w-11/12"
            alt="Emblema do Dungeons & Dragons"
          />
          <label htmlFor="email" className="flex flex-col mt-10 w-full px-3">
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              className="shadow-md rounded-full px-2 py-2 text-center"
            />
          </label>
          <label htmlFor="password" className="flex flex-col mt-3 w-full px-3">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="shadow-md rounded-full px-2 py-2 text-center"
            />
          </label>
          <button
            type="button"
            className="w-11/12 hover:font-bold transition duration-500 rounded-full mt-3 bg-red-700 text-white shadow-md px-2 py-2 text-center"
          >
            Login
          </button>
          <Link
            to="/forgot"
            className="w-full text-right hover:underline mb-10 pt-2 px-3 text-gray-700"
          >
            Esqueceu a Senha?
          </Link>
          <Link
            to="/register"
            type="button"
            className="mt-10 px-2 py-2 text-center mb-5 hover:underline w-11/12 transition duration-500 text-gray-700"
          >
            Ainda não possui cadastro?
          </Link>
        </div>
      </section>
    </div>
  );
}