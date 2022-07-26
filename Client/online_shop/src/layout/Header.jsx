import React from 'react';
import './Layout.css';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuth } from '../state/slices/authSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth)

  const handleLogout = async () => {
    dispatch(toggleAuth(false))
    console.log(`isAuth currently set to ${isAuth}`)
    await AuthService.logout();
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="header-wrapper">
      <AppBar position="static" color="primary">
        <Toolbar variant="dense" className="logo-wrapper">
            <NavLink to="/home" className="header-logo-link">
                  <i className="header-logo"></i>
                  <Typography variant="p" className="header-logo-text">Sushi-bar</Typography>
                  
            </NavLink>
            {isAuth ? (
              <>
              <ul className="nav-list">
                <li><Button variant="filled" onClick={handleLogout} className='link-active'>logout</Button></li>
              </ul>
            </>)
            :  
            (<>
              <ul className="nav-list">
                <li><NavLink to="register" className='link-active'>Register</NavLink></li>
                <li><NavLink to="login" className='link-active'>Login</NavLink></li>
              </ul>
            </>)
            }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header