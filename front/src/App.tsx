import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Forgot from './pages/login/Forgot';
import Home from './pages/Home';
import ListOfSheets from './pages/ListOfSheets';
import NewSheet from './pages/NewSheet';
import Profile from './pages/Profile';
import Validation from './pages/login/ResetPassword';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to ="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/validation" element={<Validation />} />
      <Route path="/home" element={<Home />} />
      <Route path="/character-sheet" element={<ListOfSheets />} />
      <Route path="/make-character-sheet" element={<NewSheet />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}