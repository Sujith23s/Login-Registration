import React, { useContext } from 'react'
import {AppBar, Typography, Toolbar, Button} from "@mui/material";
import { Link } from 'react-router-dom';
import { Logout } from './Logout';
import { isLoggedIncontext } from '../App';

export const NavBar = () => {
  const isLoggedIn = useContext(isLoggedIncontext);
  const button={marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'}

  return (
    <>
      <AppBar sx={{bgcolor:"black"}}>
        <Toolbar>
          <Typography variant='h4' sx={{flexGrow:1}}>Login page</Typography>
          {isLoggedIn?<Logout></Logout>: (
            <>
              <Button variant='contained' to="/login" color='error' style={button} component={Link}>Login</Button>
              <Button variant='contained' to="/signup" color='warning' style={button} component={Link}>Signup</Button>
            </>
          )}

          
        </Toolbar>
      </AppBar>
    </>
  )
}


