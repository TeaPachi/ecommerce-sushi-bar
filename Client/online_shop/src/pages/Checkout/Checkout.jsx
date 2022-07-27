import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, List } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormInput from '../../components/FormInput/FormInput';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import OrderService from '../../services/OrderService';
import { fireAlert } from '../../utils/Alert';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const currentUser = useSelector((state) => state.user)
    const { handleSubmit, register, formState: {errors} } = useForm();
    let [ subtotal, setSubtotal ] = useState(0)
    const [ checkoutProducts, setCheckoutProducts ] = useState(location.state.filteredCarts);
    const [ downloadReceipt, setDownloadReceipt ] = useState(false)

    let city = currentUser.city
    let street = currentUser.street
    
    const fieldValues = [
        {label: 'city', inputName: 'city', defaultValue: city},
        {label: 'street', inputName: 'street', defaultValue: street},
        {label:'credit card', inputName: 'creditCard', type: 'number'},
    ]

    let tempTotal = 0;

    useEffect(() => {
        checkoutProducts.forEach((product) => tempTotal += product.totalPrice) 
        setSubtotal(tempTotal)
    })

    useEffect(() => {
        console.log(downloadReceipt)
    }, [downloadReceipt])

    const createOrder = async(data) => {
        try {
            let newOrder = {
                customerId: currentUser.id,
                cartId: checkoutProducts[0].cartId._id,
                subtotal: subtotal, 
                address: `${data.city} ${data.street}`, 
                paymentMethod: data.creditCard,
            }
            let result
            await OrderService.createOneOrder(newOrder).then((res) => result = res.data.data)
              if (downloadReceipt) {
                const element = document.createElement("a");
                let productsText = (JSON.stringify(result, null, 10)) 
                const file = new Blob([productsText], {
                  type: "text/plain"
                });
                element.href = URL.createObjectURL(file);
                element.download = `Receipt.txt`;
                document.body.appendChild(element);
                element.click();
              }
            fireAlert('Success!', 'Thank you for ordering')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Box className="checkout-container">
        <Box className="checkout-banner">
            <div>
                {checkoutProducts.map((product, i) => (
                    <List key={i} className="checkout-item-container">
                        <CheckoutItem product={product}></CheckoutItem>
                    </List>
                ))}
            </div>
            <Typography className="checkout-subtotal"> Subtotal: {subtotal} ₪</Typography> 
        </Box>

        <Box className="checkout-form-wrapper">
        <Paper className="order-form-container" elevation={9} >
            <Typography variant="h4" element="h4">Customer details</Typography>
            <Typography variant="h6" element="h6">shipping address</Typography>
            <form onSubmit={handleSubmit(createOrder)} className="order-form"> 
                {fieldValues.map((input, i) => 
                    <FormInput key={i} {...input} register={register} errors={errors}/>  
                )}
                <span className="receipt-wrapper">
                    <input name="receipt" type="checkbox" className="receipt-checkbox" onChange={() => setDownloadReceipt(Boolean(!downloadReceipt))}></input>
                    <label htmlFor="receipt">Download a receipt</label>
                </span>
                <Button type="submit" variant="contained">Order now</Button> 
            </form>
        </Paper>
        </Box>
    </Box>
  )
}

export default Checkout