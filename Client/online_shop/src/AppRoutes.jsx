import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import Page404 from './pages/Page404/Page404';
import Checkout from './pages/Checkout/Checkout';
import TestPage from './pages/Test/TestPage';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>\
        <Route path='/test' element={<TestPage/>}/>
        <Route path="/home" element={
          <ProtectedRoute isAuth={isAuth}>
            <HomePage />
          </ProtectedRoute >
        }/>
        <Route path="/checkout" element={
          <ProtectedRoute isAuth={isAuth}>
            <Checkout/>
          </ProtectedRoute >
        }/>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Page404/>}/>
    </Routes>
  )
}

const ProtectedRoute = ({ isAuth, children }) => {
    if(!isAuth){
      return <Navigate to="/login"/>
    } 
    return children;
  }

export default AppRoutes