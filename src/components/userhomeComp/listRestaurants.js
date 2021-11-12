import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../screens/context/context';
import { Link, useHistory } from 'react-router-dom'
import {
    db, collection, getDocs, query, where
} from '../../config/firebase'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import restauImg from '../../images/restau.jpeg'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




export default function ListOfRestaurants() {
    let history=useHistory();
    let { state, dispatch } = useContext(GlobalContext)
    // let [listRestau,setlistRestau]=useState([])
    useEffect(async () => {
        dispatch({ type: 'restaurantList', payload: [] })
        dispatch({type:'restauId',payload:''})
        const q = query(collection(db, "FoodAppUsers"), where("UserRole", "==", "Restaurant"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dispatch({ type: 'restaurantList', payload: doc.data() })

            console.log(doc.id, " => ", doc.data());
        });

    }, [state.authUser])
    let [comp, setcomp] = useState('')
    return (
        <>
            <Grid container spacing={2}>
                {state.RestaurantList.map((restauData, i) => (

                    <Grid mt={1} md item xs={12} xl={4} md={4}>
                        <Item>
                            <Card key={i} >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restauImg}

                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {restauData.RestaurantName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Please Visit Us!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button id={restauData.userid} size="large" onClick={(eve)=>{
                                        console.log(eve.target.id)
                                        dispatch({type:'restauId',payload:eve.target.id})
                                        history.push('/login/userhomePage/dishes')
                                    }
                                    }>See Menu
                                    </Button>
                                    
                                </CardActions>
                            </Card>
                        </Item>
                    </Grid>





                ))}
            </Grid>


            <h1>List</h1>
        </>

    )
}