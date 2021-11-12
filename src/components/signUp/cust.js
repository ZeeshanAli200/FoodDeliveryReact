import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../screens/context/context'
import Nav from '../../components/nav-bar';
import { Link, useHistory } from 'react-router-dom'


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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




export default function Customer() {
    let history = useHistory()
    const { state, dispatch } = useContext(GlobalContext);
    const [userName, setUserName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [phoneNum, setphoneNum] = useState('');
    const [errMess, seterrMess] = useState('');

    const [boolmsg, setboolmsg] = useState()


    let [resOrCus, setresOrCus] = useState("Restaurant")
    let [country, setCountry] = useState(["pakistan", "china", "afghanistan"])
    let [countryName, setcountryName] = useState("pakistan")

    let [pkcities, setpkcities] = useState(["karachi", "islamabad", "hyderbad"])
    let [chinacities, setchinacities] = useState(['wuhan', 'beiging', 'shanghai'])
    let [afgcities, setafgcities] = useState(['kabul', 'kandhar', 'jalalabad'])
    let [cityName, setcityName] = useState("karachi")
    async function addUser() {
        try {
            if (userName != '' && email != '' && password != '' && phoneNum != '') {

                let { user } = await createUserWithEmailAndPassword(auth, email, password)
                let newUser = {
                    Username: userName,
                    UserRole: "Customer",
                    email: email,
                    uid: user.uid,
                    country: countryName,
                    city: cityName,
                    cellNo: phoneNum
                }
                const dataRef = doc(db, "FoodAppUsers", user.uid)
                await setDoc(dataRef, newUser)
                history.push('/users/userhomePage')
                console.log(user)


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
            <Grid container spacing={2}>
                <Grid xs={2} xl={2} md={2}></Grid>
                <Grid xs={8} xl={8} md={8}>
                    <Item xs={6} xl={6} md={6}>
                        <Typography variant="h4">Customer Sign Up</Typography>

                    </Item>
                    <Item xs={6} xl={6} md={6}>
                        <TextField onChange={(eve) => { setUserName(eve.target.value) }} id="outlined-basic" label="User Name" variant="outlined" />

                    </Item>
                    <Item xs={6} xl={6} md={6}>      <TextField type="number" onChange={(eve) => { setphoneNum(eve.target.value) }} id="outlined-basic" label="Phone No" variant="outlined" />
                    </Item>

                    <Item xs={6} xl={6} md={6}>      <TextField onChange={(eve) => { setemail(eve.target.value) }} id="outlined-basic" label="Email" variant="outlined" />
                    </Item>


                    <Item xs={6} xl={6} md={6}>      <TextField onChange={(eve) => { setpassword(eve.target.value) }} type="password" id="outlined-basic" label="Password" variant="outlined" />
                    </Item>
                    <Item xs={6} xl={6} md={6}>

                        <FormControl sx={{ m: 1, width: '25ch' }}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={countryName}
                                label="Country"
                                placeholder="Country"
                                onChange={(eve) => {

                                    setcountryName(eve.target.value)
                                    console.log(countryName, "onclick");
                                    // console.log(eve.target);
                                    if (eve.target.value == 'pakistan') {
                                        console.log(pkcities[0]);
                                        setcityName(pkcities[0])
                                    }
                                    if (eve.target.value == 'china') {
                                        console.log(chinacities[0]);
                                        setcityName(chinacities[0])
                                    }
                                    if (eve.target.value == 'afghanistan') {
                                        console.log(afgcities[0]);
                                        setcityName(afgcities[0])
                                    }




                                }}

                            >
                                {
                                    country.map((countryname) =>
                                        <MenuItem value={countryname}>{countryname}</MenuItem>
                                    )
                                }


                            </Select>


                        </FormControl>
                    </Item>
                    <Item xs={6} xl={6} md={6}>

                        <FormControl sx={{ m: 1, width: '25ch' }}>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cityName}
                                label="City"
                                placeholder="City"

                                onChange={(e) => { setcityName(e.target.value) }}
                                onClick={(eve) => { setcityName(eve.target.value) }}


                                id="cityselect"

                            >

                                {

                                    countryName == "pakistan" ? (
                                        pkcities.map((cityname, i) =>






                                            <MenuItem value={cityname} key={i + cityname}>{cityname}</MenuItem>





                                        )) :
                                        countryName == "china" ? (

                                            chinacities.map((cityname, i) =>

                                                <MenuItem value={cityname} key={i + cityname}>{cityname}</MenuItem>
                                            )
                                        ) : countryName == "afghanistan" && (
                                            afgcities.map((cityname, i) =>

                                                <MenuItem value={cityname} key={i + cityname}>{cityname}</MenuItem>
                                            )
                                        )



                                }



                            </Select>


                        </FormControl>
                    </Item>
                    <Item xs={4} xl={4} md={4}>
                        <Button onClick={addUser} variant="contained"

                        >Sign Up</Button>

                    </Item>
                    <Item xs={4} xl={4} md={4}>
                        <Button onClick={() => {
                            history.push('/login')
                        }} variant="contained"

                        >Log In</Button>

                    </Item>



                </Grid>
                <Grid xs={2} xl={2} md={2}></Grid>
            </Grid>










            {/* <div>
                <label>User Name:<input onBlur={(eve) => { setUserName(eve.target.value) }} type="text" /></label>
                <label>Email:<input onBlur={(eve) => { setemail(eve.target.value) }} type="text" /></label><br /><br />
                <label>Phone:<input onBlur={(eve) => { setphoneNum(eve.target.value) }} type="number" /></label><br />

                <label>Location:
                    <select

                        onClick={(eve) => {

                            setcountryName(eve.target.value)
                            console.log(countryName, "onclick");
                            // console.log(eve.target);
                            if (eve.target.value == 'pakistan') {
                                console.log(pkcities[0]);
                                setcityName(pkcities[0])
                            }
                            if (eve.target.value == 'china') {
                                console.log(chinacities[0]);
                                setcityName(chinacities[0])
                            }
                            if (eve.target.value == 'afghanistan') {
                                console.log(afgcities[0]);
                                setcityName(afgcities[0])
                            }




                        }} defaultChecked="pakistan">
                        {
                            country.map((countryname, i) =>
                                <option value={countryname} key={i}>{countryname}</option>
                            )
                        }
                    </select>

                    <select

                        onChange={(e) => { setcityName(e.target.value) }}
                        onClick={(eve) => { setcityName(eve.target.value) }}


                        id="cityselect"
                    >
                        {

                            countryName == "pakistan" ? (
                                pkcities.map((cityname, i) => {

                                    return (

                                        <>




                                            <option value={cityname} key={i + cityname}>{cityname}</option>

                                        </>

                                    )

                                })) :
                                countryName == "china" ? (

                                    chinacities.map((cityname, i) => {
                                        return (
                                            <>

                                                <option value={cityname} key={i + cityname}>{cityname}</option>

                                            </>
                                        )
                                    })
                                ) : countryName == "afghanistan" && (
                                    afgcities.map((cityname, i) => {
                                        return (
                                            <>

                                                <option value={cityname} key={i}>{cityname}</option>

                                            </>
                                        )
                                    })
                                )



                        }
                    </select>
                </label>


                <label>Password:<input onBlur={(eve) => { setpassword(eve.target.value) }} type="password" /></label> <br />
                <button onClick={addUser}>Sign Up</button>
                <button onClick={() => {
                    history.push('/login')
                }}>Log In</button>
            </div> */}
        </>
    )
}