import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/context'
import Nav from '../../components/nav-bar';
import { Link, useHistory } from 'react-router-dom'


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Restaurant from '../../components/signUp/Restaurant'
import Customer from '../../components/signUp/cust'

import {
    auth, doc, createUserWithEmailAndPassword, db, collection, addDoc,
    setDoc


} from '../../config/firebase'

import { Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { Button } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function Users() {
    let history = useHistory()
    const { state, dispatch } = useContext(GlobalContext);



    let [resOrCus, setresOrCus] = useState("Restaurant")

    return (
        <>
            <Nav/>
            <Grid container spacing={2}>
                <Grid xs={4} xl={4} md={4}></Grid>
                <Grid mt={4} mb={2} xs={4} xl={4} md={4}>
                <RadioGroup row
                        aria-label="signUp"
                        defaultValue="Restaurant"
                        name="radio-buttons-group"

                    >
                        <FormControlLabel onClick={(eve) => {

                            setresOrCus(eve.target.value)

                        }} value="Restaurant" control={<Radio />} label="Restaurant" />
                        <FormControlLabel onClick={(eve) => {

                            setresOrCus(eve.target.value)

                        }} value="Customer" control={<Radio />} label="Customer" />

                    </RadioGroup>                   
                </Grid>
                <Grid  xs={4} xl={4} md={4}></Grid>
            </Grid>


            {

                resOrCus == "Restaurant" ? (
                    <Restaurant />

                ) : (
                    <Customer />

                )
            }


        </>
    )
}

export default Users;
