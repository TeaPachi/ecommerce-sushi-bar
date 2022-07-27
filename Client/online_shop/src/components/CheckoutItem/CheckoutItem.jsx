import React from 'react';
import { Divider, Typography, Box } from '@mui/material';
import './CheckoutItem.css';

const CheckoutItem = ({product}) => {
  return (
    <Box className="checkoutProduct-container">
        <img className="checkoutProduct-image" src={`http://localhost:3000/${product.productId.image}`}></img>
        <Typography variant="span" element="span">{product.productId.productName}</Typography>
        <Typography variant="span" element="span">{product.productId.price} ₪</Typography>
        <Typography variant="span" element="span">x{product.quantity}</Typography>
        <Typography variant="span" element="span">{product.totalPrice} ₪</Typography>
        <Typography variant="span" element="span">{product.productId.quantity}</Typography>
    </Box>
  )
}

export default CheckoutItem