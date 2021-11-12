import React, {useState } from 'react';
import { useHistory } from 'react-router';
import {
    auth,signOut
} from '../../../config/firebase'
import NavBarRestaurant from '../../../components/restaurantHomeNav/Homenav';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import AddDish from '../../../components/Restauranthomepage/addDish'
import Dashboad from '../../../components/Restauranthomepage/dashboard';


export default function RestaurantHomeScreen(){
  
  let [comp,setcomp]=useState('')
  let history=useHistory()
  return(
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Restaurant Admin Portal
          </Typography>
          <Button color="inherit" onClick={()=>{
              setcomp('adddish')
          }}>Add Dishes</Button>
          <Button color="inherit" onClick={()=>{
                            setcomp('dash')
          }}>Dashboard</Button>
          <Button color="inherit" onClick={async()=>{
            await signOut(auth)
            history.push('/login')              
          }

            
          }>Log Out</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
    {
      comp=='adddish'?(<AddDish/>):comp=='dash'?(<Dashboad/>):(<AddDish/>)
    }
    
    </>

  )
}