import React, { useState, useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Box, Button, Dialog, DialogTitle, TextField, } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ProductService from '../../services/ProductService';
import CartService from '../../services/CartService';
import './ProductItem.css';

const ProductItem = ({product, id}) => {
  const [ openPopup, setOpenPopup ] = useState(false);
  const [ counter, setCounter ] = useState(1);
  const [ tempPrice, setTempPrice ] = useState(product.price)
  const [ allCarts, setAllCarts ] = useState([])
  const [ currentUserCart, setCurrentUserCart ] = useState()
  const [ productName, setProductName ] = useState(product.productName)
  const [ showField, setShowField ] = useState(false)
  const isAdmin = useSelector((state) => state.user.admin)
  const currentUser = useSelector((state) => state.user)
  const { handleSubmit, register, formState: {errors} } = useForm();

  useEffect(() => {
    CartService.getAllCarts().then((res) => setAllCarts(res.data.data)).catch((error) => console.log(error))
    getCurrentUserCart()
  }, [openPopup]) //this condition can be optimized since it runs way too many times when coming to the homePage

  let getCurrentUserCart = async () => {
    const currentCart = allCarts.filter((cart) => cart.customerId._id === currentUser.id)
    setCurrentUserCart(currentCart)
  }

  function openPurchasePopup() {
    setOpenPopup(true)
  }

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  function countDown() {
    if (isAdmin && tempPrice > 1){
      setTempPrice( tempPrice - 1)
    } else if (counter > 1){
      setCounter(counter - 1)  
    }
  }

  function countUp() {
    if (isAdmin){
      setTempPrice( tempPrice + 1) 
    } else {
      setCounter(counter + 1)  
    } 
  }

  function toggleProductField() {
    setShowField(!showField)
  }

  const updateProduct = async (data) => {
    let prod = Object.values(data)
    await ProductService.updateProduct(id, {price: tempPrice, productName: prod[0] }).catch(error => console.log(error))
    setOpenPopup(false);
  }

  const addProductToCart = async (product) => {
    let newCartProduct = {
      productId: product._id,
      quantity: counter,
      totalPrice: product.price * counter,
      cartId: currentUserCart[0]._id, 
    }
    await CartService.createOneCartProduct(newCartProduct).catch(error => console.log(error))
    setOpenPopup(false)
  }


  return (
    <Card sx={{ minWidth: 300, maxWidth: 350, minHeight: 240 }}>
      <Box>
          <CardMedia
          component="img"
          height="250"
          image={`http://localhost:3000/${product.image}`}
          alt={`the cover image of ${product.name}`}
          />
        <CardContent>
          <Box gutterBottom className="product-first-row">
            <Typography variant="span" element="span" className="product-name">{product.productName}</Typography>
            { isAdmin ? 
              <EditIcon className="edit-btn" onClick={openPurchasePopup}></EditIcon> 
              : 
              <button className="add-btn" onClick={openPurchasePopup}>+</button>
            }
            <Dialog
            open={openPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            <CloseIcon onClick={handleClosePopup} className="close-prod-popup-btn"></CloseIcon>
            <CardMedia
            component="img"
            height="300"
            image={`http://localhost:3000/${product.image}`}
            alt={`the cover image of ${product.name}`}
            className="edit-prod-image"
            align="center"
            />
            { isAdmin ? 
            <>
            <br/>
              <form onSubmit={handleSubmit(updateProduct)} className="change-prod-form">
              { showField ? 
                <>
                  <TextField
                  label='enter new product name'
                  { ...register(productName)}
                  type='text'
                  defaultValue={product.name}
                  >{productName}</TextField>
                  <CloseIcon className="edit-prod-icon" onClick={toggleProductField}></CloseIcon>
                </>
                :
                <>
                  <span className="edit-prod-name">{product.productName}</span>
                  <EditIcon className="edit-prod-icon" onClick={toggleProductField}></EditIcon>
                </>
              }
                <Button onClick={countDown}>-</Button>
                  <span>{`${tempPrice} ₪`}</span>
                <Button onClick={countUp}>+</Button>
                <Button type="submit">Save</Button>
              </form>
            </>
            :
            <div className="user-prod-info">
              <span className="edit-prod-name"> {`${product.productName} -----------------------`} </span>
              <span> {`${product.price} ₪`} </span>
            </div>
            }
            </DialogTitle>
              { !isAdmin && 
              <>
                <Box className="product-popup-counter">
                  <Button onClick={countDown}>-</Button>
                    <span>{counter}</span>
                  <Button onClick={countUp}>+</Button>
                </Box>
                <Button onClick={() => addProductToCart(product)}>Add {counter} {product.productName} for {product.price * counter}  ₪</Button> 
              </>
              }
            </Dialog>
          </Box>
          <Typography variant="span" element="span">
              <b>Price:</b> {`${product.price} ₪`} 
              <br />
              <br />
              <Box className="category-container">
              <span className="product-category-tag">{product.category.categoryName}</span>
              { product.hot ? <span className="hot-product-tag"/> : null}
              { product.new ? <span className="new-product-tag">NEW</span> : null}
              </Box>
          </Typography>
        </CardContent>
      </Box>
    </Card>

  )
}

export default ProductItem