import React from 'react';
import './RegisterPage.css';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import FormInput from '../../components/FormInput/FormInput';
import { Box, Button, Paper, Typography } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux'; make it so the state address changes when the appropriate field are filled
import {useNavigate} from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import CartService from '../../services/CartService';


const RegisterPage = () => {
    let navigate = useNavigate();

    const { handleSubmit, register, formState: {errors} } = useForm();
    
    const onSubmit = async(data) => {
        try {
            const res = await AuthService.register(data) 
            const newUserId = res.data.userId
            await CartService.createOneCart({ customerId: newUserId })
            fireAlert('Registered succesfuly!', 'redirecting to login')
            setTimeout(
                navigate('/login')
            , 15000)
        } catch (error) {
            fireAlert(`username or email already in use`, false, true );
            console.log(error.response.data.message)
        }
    }

    const registerFields = [
        {label: 'email', inputName: 'email', type: 'email'},
        {label: 'first name', inputName: 'firstName'},
        {label: 'last name', inputName: 'lastName'},
        {label: 'username', inputName: 'username'},
        {label: 'password', inputName: 'password', type: "password"},
        {label: 'confirm password', inputName: 'confirmPassword', type: "password"},
        {label: 'city', inputName: 'city', required: false},
        {label: 'street', inputName: 'street', required: false},
    ]

  return (
    <Box className="register-page-wrapper">
        <Box className="register-page-banner">
            {/* <Typography variant="h1" component="h1" className="register-page-title">
                Welcome! 
                <br/> 
                <Typography variant="h4" component="p"> Register so you can order with us</Typography>
            </Typography>  */}
        </Box>
        <Paper sx={{ maxWidth: 400 }} className="register-form-wrapper">
            <Typography className="register-paper-title" variant="h3" element="h3">Register</Typography>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    {registerFields.map((input, i) => 
                        <FormInput key={i} {...input} register={register} errors={errors} />  
                    )}
                    <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }} className="register-page-button">Register</Button>
                </form>
            </div>
        </Paper>
    </Box>
    
  )
}

export default RegisterPage