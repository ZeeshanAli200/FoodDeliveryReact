import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'
import Nav from '../../components/nav-bar';
import { signInWithEmailAndPassword, auth, doc, db, getDoc } from '../../config/firebase'


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

function Login() {
    let history = useHistory()
    const { state, dispatch } = useContext(GlobalContext);

    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [boollogin, setboollogin] = useState();
    const [errMess, seterrMess] = useState('');
    async function login() {
        try {
            if (email != '' && pass != '') {
                let signInUser = await signInWithEmailAndPassword(auth, email, pass)
                console.log(signInUser, ">>signIn");

                const docRef = doc(db, "FoodAppUsers", signInUser.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.data().UserRole == 'Restaurant') {
                    history.push('/login/homePage')
                    // console.log("Document data:", docSnap.data());
                } else if (docSnap.data().UserRole == 'Customer') {
                    // doc.data() will be undefined in this case
                    // console.log("No such document!");
                    history.push('/login/userhomePage')
                }


            }
            else {
                setboollogin("please fill empty fields!!")
                setTimeout(() => {
                    setboollogin('')
                }, 5000);
                console.log("please fill empty fields!!")
            }
        } catch (error) {
            seterrMess(error.message)
            setTimeout(() => {
                seterrMess('')
            }, 5000);

        }
    }
    return (
        <>
            <Nav/>
            <Grid mt={4} container spacing={2}>
                <Grid xs={2} xl={2} md={2}></Grid>
                <Grid xs={8} xl={8} md={8}>
                <Item xs={6} xl={6} md={6}>
                       <Typography variant="h4">Sign In</Typography>

                    </Item>
                    <Item xs={6} xl={6} md={6}>
                        <TextField onChange={(eve) => { setemail(eve.target.value) }} id="outlined-basic" label="Email" variant="outlined" />

                    </Item>


                    <Item xs={6} xl={6} md={6}>      <TextField type="password" onChange={(eve) => { setpass(eve.target.value) }} id="outlined-basic" label="Password" variant="outlined" />
                    </Item>


                    
                    
                    <Item xs={4} xl={4} md={4}>
                    <Button  onClick={login} variant="contained"
               
                >Log In</Button>
                
                    </Item>
                    


                </Grid>
                <Grid xs={2} xl={2} md={2}></Grid>
            </Grid> 

            {/* <label htmlFor="">Email:<input type="text" name="" id="" value={email} onChange={(event) => { setemail(event.target.value) }} /></label>
                <label htmlFor="">Password:<input type="text" name="" id="" value={pass} onChange={(event) => { setpass(event.target.value) }} /></label> */}




            {/* <button onClick={login}>Login</button>




                <h1>{errMess}</h1>
                <h1>{boollogin}</h1> */}
        </>
    )
}

export default Login;
