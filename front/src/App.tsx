import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to ="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}