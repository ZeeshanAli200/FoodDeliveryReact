import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import {
    db, collection, query, getDocs, where,setDoc,doc,addDoc
} from '../../../config/firebase'
import NavBarRestaurant from '../../../components/restaurantHomeNav/Homenav';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { spacing } from '@mui/system';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function Orders() {
    let history = useHistory()

    let { state, dispatch } = useContext(GlobalContext)
    
 async function placeOrder(){
    
    const docRef = await addDoc(collection(db, "orders"),{ 
        CustomerId:state.authUser.uid,
        CustomerName:state.authUser.Username,
        cellNo:state.authUser.cellNo,
        pending:false,
        accept:false,
        deliver:false,
        confirmDelivery:false
    }
    )
    state.myCart.map(async(cartDishes,i)=>{
       
        // console.log(state.my);
        // console.log(cartDishes);
        
        cartDishes.pending=true
        cartDishes.accept=false
        cartDishes.deliver=false
        const dataRef = doc(db, `orders/${docRef.id}/dishes/${docRef.id+cartDishes.dishId}`)
            await setDoc(dataRef, cartDishes)
    })
    alert("Your Order is Placed Successfully!")
    dispatch({type:"emptyCart",payload:[]})
   
    
}
    return (
        <div>
            <NavBarRestaurant />
            {
                state.myCart.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                            <Grid mt={3} md item xs={4} xl={4} md={4}>
                                <Button onClick={placeOrder} style={{ margin: "0 auto" }} size="large" variant="contained" endIcon={<SendIcon />}>
                                    Place Order
                                </Button>
                            </Grid>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                        </Grid>




                        <Grid container spacing={2}>
                            {
                                state.myCart.map((dishdata, i) => (

                                    <Grid mt={1} md item xs={12} xl={4} md={4}>

                                        {/* {console.log(dishdata)} */}
                                        <Item>
                                            <Card key={i} >
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={dishdata.DishImage}

                                                />

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {dishdata.DishName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Rs.{dishdata.Price}/=
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Delivery {dishdata.DeliverType}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        Quantity:{dishdata.quantity}
                                                    </Typography>


                                                </CardContent>

                                                <CardActions>

                                                    <Button startIcon={<DeleteIcon />} size="large" onClick={() => {
                                                        dispatch({ type: 'deleteOrder', payload: dishdata.dishId })
                                                    }}>Drop From Cart
                                                    </Button>

                                                </CardActions>

                                            </Card>
                                        </Item>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </>
                ) : (
                    <Grid container spacing={2}>
                        <Grid mt={1} md item xs={4} xl={4} md={4}>

                        </Grid>
                        <Grid mt={3} md item xs={4} xl={4} md={4}>
                            <Typography gutterBottom variant="h4" component="div">Your Cart Is Empty!</Typography>
                        </Grid>
                        <Grid mt={1} md item xs={4} xl={4} md={4}>

                        </Grid>
                    </Grid>

                )

            }
        </div>

    )
}