import React, { useState, useEffect }from 'react';
import { Typography, Button, Divider, Box } from '@mui/material';
import CartService from '../../services/CartService';
import './CartProductItem.css';

const CartProductItem = (cartProduct, filteredCarts) => {
    const [ tempQuantity, setTempQuantity ] = useState(cartProduct.cartProduct.quantity)
    const [ result, setResult ] = useState()
    const removeCartProduct = async (id) => {
        await CartService.deleteOneCartProduct(id).catch(error => console.log(error))   
    }

    const tempPrice = cartProduct.cartProduct.productId.price
        
    const increaseCartProductQuantity = () => {
        setTempQuantity(tempQuantity + 1)
    }

    const reduceCartProductQuantity = async () => {
        if (tempQuantity > 1) {
            setTempQuantity(tempQuantity - 1)
        }
    }
    
    useEffect(() => {
        setResult(tempQuantity * tempPrice)
        CartService.updateOneCartProduct(cartProduct.cartProduct._id, {quantity: tempQuantity, totalPrice: result}).catch(error => console.log(error))
    }, [tempQuantity, result])


  return (
    <Box className="cartProduct-container">
        <img className="cartProduct-image" src={`http://localhost:3000/${cartProduct.cartProduct.productId.image}`}></img>
        <Typography variant="span" element="span">{cartProduct.cartProduct.productId.productName}</Typography>
        <Typography variant="span" element="span">{cartProduct.cartProduct.totalPrice} ₪</Typography>
        <Box className="cartProduct-quantity-container">
            <Button onClick={increaseCartProductQuantity}> ↑ </Button>
            <Typography variant="span" element="span">{cartProduct.cartProduct.quantity}</Typography>
            <Button onClick={reduceCartProductQuantity}> ↓ </Button>
        </Box>
        <Button onClick={() => removeCartProduct(cartProduct.cartProduct._id)}> X </Button>
        <Divider /> 
    </Box>
  )
}

export default CartProductItem