import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../context/context'
import { Link, useHistory } from 'react-router-dom'
import {
    db, collection, query, getDocs, where,updateDoc,doc
} from '../../../config/firebase'
import NavBarRestaurant from '../../../components/restaurantHomeNav/Homenav';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';


import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function OrderStatus() {
    let history = useHistory()

    let { state, dispatch } = useContext(GlobalContext)
    let [confirmDelivery, setconfirmDelivery] = useState(false);
    useEffect(async () => {
        dispatch({ type: 'orderedDishes', payload: [] })
        const q = query(collection(db, "orders"), where("CustomerId", "==", String(state.authUser.uid)),where("confirmDelivery","==",false))


        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (ordersdish) => {

        // if(ordersdish.data().confirmDelivery==false){
            const que = query(collection(db, "orders", ordersdish.id, "dishes"))

            const querySnapshotdish = await getDocs(que);
            
            let tempordered = []
            let tprice = 0
            querySnapshotdish.forEach((ordersdish) => {


                tempordered.push(ordersdish.data())
                tprice += +ordersdish.data().Price

            })
            
            let temporderedish = {
                pending: tempordered.every(status=>status.pending),
                accept: tempordered.every(status=>status.accept),
                deliver: tempordered.every(status=>status.deliver),
                CustomerId: ordersdish.data().CustomerId,
                orderId:ordersdish.id,
                confirmDelivery:ordersdish.data().confirmDelivery


            }
            const orderIdRef = doc(db, "orders", ordersdish.id);


            await updateDoc(orderIdRef,temporderedish)
            // tempordered.every(status=>status.pending)?()

            temporderedish.orderedDishes = tempordered

            console.log(temporderedish);
            temporderedish.totalPrice = tprice


            dispatch({ type: "orderedDishes", payload: temporderedish })
            
        // }
        });
    }, [state.authUser])

    async function confirmFunc(orderCard){
        
        const dataRef = doc(db, `orders/${orderCard.orderId}`)
            
        await updateDoc(dataRef, {
            confirmDelivery:true
        });
        
    }

    return (
        <div>
            {console.log(state.Orders)}
            <NavBarRestaurant />
            {
                state.Orders.length > 0 ?(
                    <>
                    
                        {/* <Grid container spacing={2}>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                            <Grid mt={3} md item xs={4} xl={4} md={4}>
                                <Typography gutterBottom variant="h4" component="div" >Order Status</Typography>
                            </Grid>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                        </Grid> */}
                        {/* ////////////////////////////////////////////// */}
                        <Grid container spacing={2}>
                            {
                                
                                state.Orders.map((dishdata, orderNo) => (

                                    <Grid mt={1} md item xs={12} xl={6} md={6}>
                                        <Item>
                                            <TableContainer component={Paper}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Order # {orderNo + 1}{console.log(dishdata)}
                                                </Typography>
                                                <Table aria-label="simple table">

                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Dish Name</TableCell>
                                                            <TableCell align="center">Quantity</TableCell>
                                                            <TableCell align="center">Price</TableCell>
                                                            <TableCell align="center">Total Price</TableCell>
                                                            <TableCell align="center">Order Status</TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        {dishdata.orderedDishes.map((dataorder, j) => (

                                                            <TableRow

                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                {

                                                                    dishdata.orderedDishes.length - 1 == j ? (
                                                                        <>

                                                                            <TableCell component="th" scope="row">
                                                                                {dataorder.DishName}
                                                                            </TableCell>
                                                                            <TableCell align="center">{dataorder.quantity}</TableCell>
                                                                            <TableCell align="center">{dataorder.Price}</TableCell>
                                                                            <TableCell align="center">Total Amount: Rs.{dishdata.totalPrice}/=</TableCell>
                                                                            {
                                                                                dishdata.pending? (
                                                                                    <TableCell align="center">Pending</TableCell>) :
                                                                                    dishdata.accept ? (<TableCell align="center">Accepted</TableCell>) :
                                                                                        dishdata.deliver&& (<TableCell align="center">Delivered</TableCell>)
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        <>

                                                                            <TableCell component="th" scope="row">
                                                                                {dataorder.DishName}
                                                                            </TableCell>
                                                                            <TableCell align="center">{dataorder.quantity}</TableCell>
                                                                            <TableCell align="center">{dataorder.Price}</TableCell>
                                                                        </>
                                                                    )

                                                                }
                                                            </TableRow>

                                                        ))

                                                        }
                                                    </TableBody>
                                                    {
                                                        dishdata.deliver&&(
                                                    <TableFooter>

                                                        <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell align="center"></TableCell>
                                                            <TableCell align="center"><Button onClick={()=>{
                                                                confirmFunc(dishdata)
                                                                
                                                            }} size="small" variant="contained">
                                                            Confirm Delivery
                                                            </Button></TableCell>
                                                            <TableCell align="center"></TableCell>

                                                        </TableRow>

                                                    </TableFooter>)
}
                                                </Table>
                                            </TableContainer>
                                        </Item>
                                    </Grid>
                                ))
                        //         ):(
                        //             <Grid container spacing={2}>
                        //     <Grid mt={1} md item xs={4} xl={4} md={4}>

                        //     </Grid>
                        //     <Grid  mt={3} md item xs={4} xl={4} md={4}>
                        //         <Typography gutterBottom variant="h4">
                        //             No Orders Placed
                        //         </Typography>
                               
                        //     </Grid>
                        //     <Grid mt={1} md item xs={4} xl={4} md={4}>

                        //     </Grid>
                        // </Grid>
                        //         )
                            }
                        </Grid>

                        {/* //////////////////////////////////////// */}


                    </>
                ) : (
                    console.log("empty")
                )
            }
        </div>

    )
}