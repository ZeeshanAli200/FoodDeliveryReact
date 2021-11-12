import React, { useContext, useState } from 'react';
// import { GlobalContext } from '../../context/context'
// import { Link, useHistory } from 'react-router-dom'
// import {
//     auth, doc, createUserWithEmailAndPassword, db, collection, addDoc,
//     setDoc
// } from '../../../config/firebase'

import NavBarRestaurant from '../../../components/restaurantHomeNav/Homenav';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

import ListOfRestaurants from '../../../components/userhomeComp/listRestaurants';


export default function UserHomeScreen(){
  
  let [comp,setcomp]=useState('')
  return(
    <>
    <NavBarRestaurant/>
    <ListOfRestaurants/>
    
    </>

  )
}