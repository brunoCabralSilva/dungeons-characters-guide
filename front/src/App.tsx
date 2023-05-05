import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to ="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}