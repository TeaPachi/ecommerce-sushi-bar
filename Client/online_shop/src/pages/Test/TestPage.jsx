import React, {useState, useEffect} from 'react';
import {Box, Typography, Paper, Button} from '@mui/material';
import './TestPage.css'
import CartService from '../../services/CartService';
import { useForm } from 'react-hook-form';

const TestPage = () => {
    const {register, handleSubmit} = useForm();

    function onSubmitButton(data) {
        console.log(data)
    }

    const [ products, setProducts ] = useState([{
        productName: 'test sushi',
        price: 3,
        category: 'sushi'
    },{
        productName: 'sussy sushi',
        price: 5,
        category: 'sushi'
    },
    {
        productName: 'test meal',
        price: 15,
        category: 'main course'
    }])

    const [ categories, setCategories ] = useState([{
        categoryName: 'sushi',
        value: 'sushi'
    },{
        categoryName: 'main course',
        value: 'main course'
    },
    {
        categoryName: 'all',
        value: ''
    }]);
    const [ cartProducts, setCartProducts ] = useState([]);
    const [counter, setCounter] = useState(0);

    const countUp = () => {
        console.log(counter);
        setCounter(counter + 1);
    };

    const countDown = () => {
        setCounter(counter - 1);
    }

    let tempTotal = 0;

    useEffect(() => {
        CartService.getAllCartProducts().then((res) => setCartProducts(res.data.data))
        products.forEach((product) => tempTotal += product.price) 
    }) 

    const filterProducts = (category) => {
        setCategories(category)
    }

    //call service to set count to cartproduct amount

  return (
    <Box className="test-wrapper">
        <Typography element="h2" variant="h2" className="test-text">test</Typography>
        <>
            <h1>Order weather</h1>
            <form onSubmit={handleSubmit(onSubmitButton)}>
                <input
                    {...register("fullName")}
                    type="text"
                    name="fullName"
                    placeholder="Name and surname"
                    id="name"
                />
                <input
                    {...register("city")}
                    type="text"
                    name="city"
                    placeholder="City"
                    id="city"
                />
                <p>I would like to:</p>
                <label htmlFor="field-rain">
                    <input
                        {...register("weather")}
                        type="radio"
                        name="weather"
                        value="rain"
                        id="field-rain"
                    />
                    Rain
                </label>
                <label htmlFor="field-wind">
                    <input
                        {...register("weather")}
                        type="radio"
                        name="weather"
                        value="wind"
                        id="field-wind"
                    />
                    Lots of wind
                </label>
                <label htmlFor="field-sun">
                    <input
                        {...register("weather")}
                        type="radio"
                        name="weather"
                        value="sun"
                        id="field-sun"
                    />
                    Sunny
                </label>
                <button type="submit">
                    Send
                </button>
            </form>
        </>
        <div>
            <p>{counter}</p>
            <button onClick={countUp}>Add</button>
            <button onClick={countDown}>Deduct</button>
        </div>

        { cartProducts.map((product, i) =>
            <Paper key={i}>
                <Typography variant="p" element="p"> name: {product.productId.productName}</Typography>
                <br></br>
                <Typography variant="p" element="p">price: {product.productId.price}</Typography>
                <br></br>
                <Typography variant="p" element="p">quantity: </Typography>
                <br></br>
                <Typography variant="p" element="p">totalPrice: {product.totalPrice}</Typography>
            </Paper>
        )}
    </Box>
  )
}

export default TestPage