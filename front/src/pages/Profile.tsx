import React from 'react';
import Nav from '../components/Nav';

export default function Profile() {
  return(
    <div className="relative">
      <Nav />
      <img
        src={require('../images/wallpapers/fullScreen.jpeg')}
        className="absolute w-full h-screen object-cover hidden sm:flex"
        alt="Emblema do Dungeons & Dragons"
      />
      <div className="bg-white/70 h-screen w-full absolute z-10" />
      <div className="relative z-30">
        Perfil
      </div>
    </div>
  );
}