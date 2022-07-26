import React, { useState, useEffect, useMemo } from 'react';
import ProductService from '../../services/ProductService';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, IconButton, Grid, Typography, Button, Dialog, DialogTitle } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ProductItem from '../../components/ProductItem/ProductItem';
import SearchBar from '../../components/SearchBar/SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import CartDrawer from '../CartDrawer/CartDrawer';
import CartService from '../../services/CartService';
import './HomePage.css';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput/FormInput';

const drawerWidth = 370;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(6),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: (30),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const HomePage = () => {
  const [ products, setProducts ] = useState([]);
  const [ allCarts , setAllCarts ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ categorySelected, setCategorySelected ] = useState('');
  const [ isChecked, setIsChecked ] = useState({ hot: false, new: false });
  const [ openPopup, setOpenPopup ] = useState(false);
  const [ open, setOpen ] = useState(false);

  const isAdmin = useSelector((state) => state.user.admin)
  const userAddress = useSelector((state) => state.user)
  const currentUser = useSelector((state) => state.user)

  const { handleSubmit, register, formState: {errors} } = useForm();

  const fieldValues = [
    {label: 'product name', inputName: 'productName'},
    {label: 'category id', inputName: 'category'},
    {label: 'price', inputName: 'price', type: 'number'},
    {label: 'image (local storage)', inputName: 'image'},
  ]

  useEffect(() => {
    ProductService.getAllProductCategories().then((res) => setCategories(res.data.data))
  })
  
  useEffect(() => {
    ProductService.getAllProducts().then((res) => setProducts(res.data.data))
  }) 

  useEffect(() => {
    CartService.getAllCartProducts().then((res) => setAllCarts(res.data.data))
  }) 

  function getCategorySelected(event) {
    setCategorySelected(event.target.innerHTML)
    console.log(categorySelected)
  }

  function getProductSearched(event) {
    setCategorySelected(event.target.value)
    console.log(categorySelected)
  }

  const showOnlyUserCart = () => {
    return allCarts.filter((cProduct) => cProduct.cartId.customerId === currentUser.id)
  }

  let filteredCarts = useMemo( showOnlyUserCart, [currentUser.id, allCarts] )

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const openAddProduct = () => {
    setOpenPopup(true)
  }

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  function resetCategories() {
    setCategorySelected('')
  }

  const handleChange = (e) => {
    if (e.target.checked && e.target.name == 'hot') {
      setIsChecked({ hot: true, new: false })
    } else if (e.target.checked && e.target.name == 'new') {
      setIsChecked({ hot: false, new: true })
    }
  }

  const createProduct = async(data) => {
    try {
      if ( isChecked.hot === true ) {
        data.hot = true
      } else if (isChecked.hot === false){
        data.new = true
      }
      await ProductService.createProduct(data)
      setOpenPopup(false)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Box open={open}>
          <IconButton
            className="toggle-drawer-icon"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
          { isAdmin ?  null : <ShoppingCartIcon/> } 
          </IconButton>
        </Box>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}

        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <CartDrawer filteredCarts={filteredCarts}/>
      </Drawer>
      <DrawerHeader />
      <Main open={open}>
        <Box className="home-product-container" sx={{ flexGrow: 1 }} >
        { isAdmin ? <span></span> : <p className="currentAddress">Your current delivery address: { userAddress.city + ' ' + userAddress.street }</p>}
          <Box className="home-filtering-bar">
            <SearchBar getProductSearched={getProductSearched} products={products} />
            <Box className="category-select-wrapper">
              <Typography element="span" variant="span" className="categories-title">Categories:</Typography>
                {categories.map((pCategory)=> (
                  <Typography key={pCategory._id} element="span" variant="span" className="product-category-select" align="center" onClick={getCategorySelected}>
                    {pCategory.categoryName}
                  </Typography>
                ))}
              <Typography value='' element="span" variant="span" className="product-category-select" align="center" onClick={resetCategories}>All</Typography>
            </Box>
          </Box>
          <Grid className="home-product-grid" container spacing={3}>
            {products.filter((product) => {
              if (product.category.categoryName === categorySelected) {
                return product
              }
              if (categorySelected == '') {
                return product
              } else if ( product.productName.toLowerCase().includes(categorySelected.toLowerCase())){
                return product
              } 
              }).map((product)=> (
              <Grid key={product._id} item >
                <ProductItem product={product} id={product._id} />
              </Grid>
            ))}
            { isAdmin && <Button className="admin-add-product" onClick={openAddProduct}>+</Button> }
          </Grid>
          <Dialog
            open={openPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="center" className="add-prod-title">
              Add product
            </DialogTitle>
              <form onSubmit={handleSubmit(createProduct)} className="add-product-form">
                {fieldValues.map((input, i) => 
                  <FormInput key={i} {...input} register={register} errors={errors}/>  
                )}
                <div className="radio-input-addprod">
                  <label htmlFor="hot">
                    <input
                      {...register("hot")}
                      type="checkbox"
                      name="hot"
                      defaultValue={isChecked}
                      onChange={handleChange}
                    />
                    hot
                  </label>
                  <label htmlFor="new">
                    <input
                      {...register("new")}
                      type="checkbox"
                      name="new"
                      defaultValue={isChecked}
                      onChange={handleChange}
                    />
                    new
                  </label>
                </div>
                <Button type="submit">Add</Button> 
              </form>
          </Dialog>
        </Box>
      </Main>
    </Box>
  );
}

export default HomePage;