import React from 'react';
import { useHistory } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  db, collection, query, getDocs,where,addDoc,auth,signOut
} from '../../config/firebase'

export default function NavBarRestaurant() {
  let history=useHistory()
  return (
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
            Welcome to Restaurants
          </Typography>
          <Button color="inherit" onClick={()=>{
              history.push('/login/userhomePage')
          }}>Go To Restaurant</Button>
          <Button color="inherit" onClick={()=>{
            history.push('/login/userhomePage/orders')
          }}>My Cart</Button>

           <Button color="inherit" onClick={()=>{
            history.push('/login/userhomePage/orderStatus')
          }}>Order Status</Button>

          <Button color="inherit" onClick={async()=>{

          await signOut(auth)
        history.push('/login')              
          }}>Log Out</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
