import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../screens/context/context'
import { Link, useHistory } from 'react-router-dom'
import {
    db, collection, query, getDocs, where,doc,updateDoc
} from '../../config/firebase'



import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import { styled } from '@mui/material/styles';



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



export default function Dashboad() {
    let { state, dispatch } = useContext(GlobalContext)
    useEffect(async () => {
        dispatch({ type: 'RestaurantOrders', payload: [] })
        const q = query(collection(db, "orders"))

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (ordersdish) => {
            let custInfoWithOrders = {
                CustomerId: ordersdish.data().CustomerId,
                CustomerName: ordersdish.data().CustomerName,
                CustomerCellNo: ordersdish.data().cellNo,
                orderId:ordersdish.id,
                confirmDelivery:ordersdish.data().confirmDelivery,
            }
            let orderrefer = collection(db, "orders", ordersdish.id, "dishes")
            const que = query(orderrefer, where("RestaurantOwnerId", "==", String(state.authUser.userid)))

            const querySnapshotdish = await getDocs(que);

            let tempOrderedDishes = []
            let tprice = 0
            querySnapshotdish.forEach((ordersdish) => {

                // console.log(ordersdish.data());
                tempOrderedDishes.push(ordersdish.data())
                tprice += +ordersdish.data().Price

            })
            // console.log(tempordered);
            custInfoWithOrders.totalPrice = tprice
            custInfoWithOrders.Orders = tempOrderedDishes
            console.log(custInfoWithOrders);
            // temporderedish.orderedDishes = tempordered
            // temporderedish.totalPrice = tprice
            dispatch({ type: "RestaurantOrders", payload: custInfoWithOrders })

        });
    }, [state.authUser])
function acceptOrder(ord){

    
ord.Orders.map(async(myorders)=>{
    const dataRef = doc(db, `orders/${ord.orderId}/dishes/${ord.orderId+myorders.dishId}`)
    
await updateDoc(dataRef, {
  accept: true,
  pending:false
});
})

    console.log(ord,"****");
}
function deliverOrder(ord){

    
ord.Orders.map(async(myorders)=>{
    const dataRef = doc(db, `orders/${ord.orderId}/dishes/${ord.orderId+myorders.dishId}`)
    
await updateDoc(dataRef, {
  accept: false,
  pending:false,
  deliver:true
});
})

    console.log(ord,"****");
}

    return (
        <>{console.log(state.RestaurantOrders)}

            {
                state.RestaurantOrders.length > 0 && state.RestaurantOrders.every(status => status.Orders.length<1)==false ?(
                    <>
                        {/* <Grid container spacing={2}>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                            <Grid mt={3} md item xs={4} xl={4} md={4}>
                                <Typography gutterBottom variant="h4" component="div" >DASHBOARD</Typography>
                            </Grid>
                            <Grid mt={1} md item xs={4} xl={4} md={4}>

                            </Grid>
                        </Grid> */}



                        {/* ////////////////////////////////////////////// */}
                        <Grid container spacing={2}>
                            {
                                state.RestaurantOrders.map((dishdata, orderNo) => (
                                    <Grid mt={1} md item xs={12} xl={6} md={6}>
                                        <Item>
                                            <TableContainer component={Paper}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Order # {orderNo + 1}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Customer Name: {dishdata.CustomerName}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Cell No: {dishdata.CustomerCellNo}
                                                </Typography>
                                                <Table aria-label="simple table">

                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Dish Name</TableCell>
                                                            <TableCell align="center">Quantity</TableCell>
                                                            <TableCell align="center">Price</TableCell>
                                                            <TableCell align="center">Order Status</TableCell>
                                                            <TableCell align="center">Total Price</TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            dishdata.Orders.map((dataorder, j) => (
                                                                <>
                                                                    <TableRow

                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        {

                                                                            // dishdata.Orders.length - 1 == j ? (
                                                                            //     <>

                                                                            //         <TableCell component="th" scope="row">
                                                                            //             {dataorder.DishName}
                                                                            //         </TableCell>
                                                                            //         <TableCell align="center">{dataorder.quantity}</TableCell>
                                                                            //         <TableCell align="center">{dataorder.Price}</TableCell>
                                                                            //         {
                                                                            //             dataorder.pending? (
                                                                            //                 <TableCell align="center">Pending</TableCell>) :
                                                                            //                 dataorder.accept ? (<TableCell align="center">Accepted</TableCell>) :
                                                                            //                     dataorder.deliver&& (<TableCell align="center">Delivered</TableCell>)
                                                                            //         }
                                                                            //         <TableCell align="center">Total Amount: Rs.{dishdata.totalPrice}/=</TableCell>


                                                                            //     </>
                                                                            // ) : (
                                                                            <>

                                                                                <TableCell component="th" scope="row">
                                                                                    {dataorder.DishName}
                                                                                </TableCell>
                                                                                <TableCell align="center">{dataorder.quantity}</TableCell>
                                                                                <TableCell align="center">{dataorder.Price}</TableCell>
                                                                                {
                                                                                    dataorder.pending ? (
                                                                                        <TableCell align="center">Pending</TableCell>) :
                                                                                        dataorder.accept ? (<TableCell align="center">Accepted</TableCell>) :
                                                                                            dataorder.deliver && (<TableCell align="center">Delivered</TableCell>)
                                                                                }

                                                                                {
                                                                                    dishdata.Orders.length - 1 == j && (
                                                                                        <TableCell align="center">Rs.{dishdata.totalPrice}/=</TableCell>
                                                                                    )
                                                                                }
                                                                                {/* {
                                                                                dishdata.Orders.every(status=>status.pending) && dishdata.Orders.length-1==j  ?(
                                                                                    

                                                                                ):(

                                                                                )
                                                                            } */}
                                                                            </>

                                                                            // )

                                                                        }
                                                                    </TableRow>
                                                                    {
                                                                        dishdata.Orders.every(status => status.pending) && dishdata.Orders.length - 1 == j ? (
                                                                            <TableRow>
                                                                                <TableCell></TableCell>
                                                                                <TableCell align="center"></TableCell>
                                                                                <TableCell align="center"><Button onClick={()=>{acceptOrder(dishdata)}} size="small" variant="contained">
                                                                                    Accept
                                                                                </Button></TableCell>
                                                                                <TableCell align="center"></TableCell>
                                                                            </TableRow>

                                                                        ) : dishdata.Orders.every(status => status.accept) && dishdata.Orders.length - 1 == j ? (
                                                                            <TableRow>
                                                                            <TableCell></TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                            <TableCell align="center"><Button onClick={()=>{deliverOrder(dishdata)}} size="small" variant="contained">
                                                                                Deliver
                                                                            </Button></TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                        </TableRow>
                                                                            ): dishdata.Orders.every(status => status.deliver)&& !dishdata.confirmDelivery && dishdata.Orders.length - 1 == j ?(
                                                                                <TableRow>
                                                                            <TableCell></TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                            <TableCell align="center">
                                                                                <Typography variant="h5">
                                                                                Delivery In Progress
                                                                                </Typography>
                                                                                </TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                        </TableRow>
                                                                            ): dishdata.Orders.every(status => status.deliver)&& dishdata.confirmDelivery && dishdata.Orders.length - 1 == j &&(
                                                                                <TableRow>
                                                                            <TableCell></TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                            <TableCell align="center">
                                                                                <Typography variant="h5">
                                                                                Delivered Successfully
                                                                                </Typography>
                                                                                </TableCell>
                                                                            <TableCell align="center"></TableCell>
                                                                        </TableRow>
                                                                            )

                                                                    }

                                                                </>
                                                            ))
                                                        }


                                                    </TableBody>
                                                    
                                                </Table>
                                            </TableContainer>
                                        </Item>
                                    </Grid>
                                ))

                            }
                        </Grid>

                        {/* //////////////////////////////////////// */}


                    </>
                ) : (
                    <h1>NO ORDERS</h1>
                )
            }
        </>
    )

}
