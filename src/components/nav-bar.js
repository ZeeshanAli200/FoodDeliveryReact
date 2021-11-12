import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
function Nav(){
let history=useHistory()
return (
    // <div>

    //     <Link to='/users'> Register </Link>
    //     <Link to='/login'> Login </Link>
    // </div>

    <Box sx={{ flexGrow: 1 }}>
    <AppBar color="default" position="static">
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
          Welcome to Food App
        </Typography>
        <Button color="inherit" onClick={()=>{
            history.push('/users')
        }}>Register</Button>
        <Button color="inherit" onClick={()=>{
          history.push('/login')
        }}>Login</Button>

         


        
      </Toolbar>
    </AppBar>
  </Box>
)
}
export default Nav