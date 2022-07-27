import React, { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleAuth } from '../../state/slices/authSlice';
import { isAdmin, setUser } from '../../state/slices/userSlice';
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput';
import AuthService from '../../services/AuthService';
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { handleSubmit, register, formState: {errors} } = useForm();
    const [ error, setError ] = useState('');

    const fieldValues = [
      {label: 'username', inputName: 'username'},
      {label: 'password', inputName: 'password', type: "password"},
    ]

  const onSubmit = async ( data ) => {  
    try {
      const res = await AuthService.login(data)  
      if (res.data.status === 'success') {
        dispatch(toggleAuth(true))
        dispatch(setUser(res.data.user))
        {res.data.admin ? dispatch(isAdmin(true)) : dispatch(isAdmin(false))}
        navigate('/home')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <Box className="login-page-wrapper">
        <Box className="login-form-wrapper">
            <Paper className="login-form-container" elevation={9} >
                <Typography className="login-paper-title" variant="h4" element="h4">Login</Typography>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    {fieldValues.map((input, i) => 
                        <FormInput key={i} {...input} register={register} errors={errors} error={error}/>  
                    )}
                    { error && <Typography element="p" align="center" className="login-error">{error}</Typography>}
                    <Button type="submit" variant="contained" className="login-page-button">Login</Button> 
                    <Typography align="center"><Link to="/register" className="login-redirect-to-register">don't have an account yet? click here to register</Link></Typography>
                </form>
            </Paper>
        </Box>
        <Box className="login-page-banner">
            <Typography variant="h1" component="h1" className="login-page-title" align="center">
                Welcome back! 
                <br/> 
                <Typography variant="h4" component="p">Login so you can get right back to ordering</Typography>
            </Typography> 
        </Box>
    </Box>
  )
}

export default LoginPage