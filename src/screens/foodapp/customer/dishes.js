import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import {
    db, collection, query, getDocs, where, addDoc
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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function Dishes() {
    let history = useHistory()
    let [quantity,setquantity]=useState(1)

    let { state, dispatch } = useContext(GlobalContext)
    useEffect(async () => {
        dispatch({ type: 'Dishesadd', payload: [] })
        const q = query(collection(db, "Dishes"), where("RestaurantOwnerId", "==", String(state.Restaurantid)))

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log("********", doc.data());
            let newUpd = doc.data()
            newUpd.dishId = doc.id
            console.log(doc.id);
            newUpd.quantity=quantity
            dispatch({ type: 'Dishesadd', payload: newUpd })
        });
    }, [state.authUser, state.Restaurantid])
    async function addcartDish(order) {
        // order.CustomerId = state.authUser.uid
        // order.pending = true
        // order.delivered = false
        // order.accepted = false
        console.log(order,"order!!!!");
        // const dataRef = collection(db, "Orders")
        // await addDoc(dataRef, order)
       
        if(order.quantity<1){
            alert("Please Select Valid Quantity!")
        }
        else{
            dispatch({type:'addcart',payload:order})
            alert("Added Into Cart!")
        }
        
        // history.push('/users/userhomePage/orders')
       
    }

    return (
         <>
            <NavBarRestaurant />
            <h1>Dish</h1>
            {console.log(state.Dishes)}
            <Grid container spacing={2}>
                {
                    state.Dishes.map((dishdata, i) => (
                        <Grid mt={1} md item xs={12} xl={4} md={4}>
                            {console.log(dishdata)}
                            <Item>
                                <Card>
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
                                    </CardContent>
                                    <CardActions>
                                        <Button size="large" 
                                        onClick={() => { addcartDish(dishdata) }}>Add to Cart
                                        </Button>
                                {/* //adding item */}
                                        <Button 
                                        onClick={()=>{

                                            let dishquanUpd=dishdata.quantity

                                            if(dishquanUpd<=10){
                                                dishquanUpd++
                                                // setquantity(quantity+1)
                                               console.log(dishquanUpd,"adding*********************");
                                               
                                               let dishdataUp={
                                                ...dishdata,
                                                quantity:dishquanUpd
                                            }
                                            dispatch({type:'setquantity',payload:dishdataUp})
                                            }
                                            else{
                                                

                                                let dishdataUp={
                                                   ...dishdata,
                                                   quantity:10
                                               }
                                               dispatch({type:'setquantity',payload:dishdataUp})
                                            }
                                            
                                        }}
                                        style={{ fontWeight: 'bolder' }} size="medium">+</Button>
                                        <Typography style={{ marginLeft: '15px' }} variant="h6" color="text.secondary">
                                            {dishdata.quantity}
                                        </Typography>
                                        {/* //minus item */}
                                        <Button 
                                         onClick={()=>{

                                            let dishquanUpd=dishdata.quantity

                                            if(dishquanUpd>=1){
                                                dishquanUpd--
                                                // setquantity(quantity+1)
                                               console.log(dishquanUpd,"adding*********************");
                                               
                                               let dishdataUp={
                                                ...dishdata,
                                                quantity:dishquanUpd
                                            }
                                            dispatch({type:'setquantity',payload:dishdataUp})
                                            }
                                            else{
                                                

                                                let dishdataUp={
                                                   ...dishdata,
                                                   quantity:1
                                               }
                                               dispatch({type:'setquantity',payload:dishdataUp})
                                            }
                                            
                                        }}
                                        style={{ fontWeight: 'bolder' }} size="medium" >-
                                        </Button>

                                    </CardActions>
                                </Card>
                            </Item>
                        </Grid>
                    ))
                }
            </Grid>

        </>

    )
}