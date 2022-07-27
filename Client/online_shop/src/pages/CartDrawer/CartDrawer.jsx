import React, { useState, useEffect } from 'react';
import { Typography, Button, List, Divider, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartService from '../../services/CartService';
import DeleteIcon from '@mui/icons-material/Delete';
import CartProductItem from '../../components/CartProductItem/CartProductItem';
import './CartDrawer.css';

const CartDrawer = ({filteredCarts}) => {
  let navigate = useNavigate();
  let [ total, setTotal ] = useState(0)

  const submitCart = () => {
    if (filteredCarts) {
      navigate('/checkout', {state: {filteredCarts, test: 3}})
    } else {
    console.log('add products to cart first') 
    }
  }

  const deleteAllCartProducts = async () => {
    await CartService.deleteManyCartProducts(filteredCarts[0].cartId._id).then((res) => console.log(res.data.data)).catch((err) => console.log(err.response.data.message))
  }

  let tempTotal = 0;

  useEffect(() => {
    filteredCarts.forEach((product) => tempTotal += product.totalPrice) 
    setTotal(tempTotal)
  }, [filteredCarts])

  return (
    <Box className="cart"> 
      <div className="single-products-container">
        {filteredCarts.map((cartProduct) => (
          <List key={cartProduct._id} className="single-cartProduct-container">
            <CartProductItem cartProduct={cartProduct} filteredCart={filteredCarts}/>
          </List>
        ))}
      </div>
      <div className="bottom-cart-container">
          <Box className="cartproduct-info-container">
            <Typography element="span" variant="span"> Total Amount: {total} ₪</Typography>
            <IconButton aria-label="delete" onClick={() => deleteAllCartProducts(filteredCarts._id)}>
              <DeleteIcon /> 
            </IconButton>
          </Box>
          <Button className="move-to-checkout-btn" onClick={() => {submitCart()}}>Move To checkout →</Button>
      </div>
    </Box>
  )
}

export default CartDrawer