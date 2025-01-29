import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { setIsLoggedIncontext } from '../App'

export const Logout = () => {
  const button={marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'} 
  const setIsLoggedIn = useContext(setIsLoggedIncontext)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.post("http://localhost:5656/logout", { withCredentials:true })
      if( response.status === 200){
        navigate("/login")
        setIsLoggedIn(false)
      }
    }catch(error){
      console.log("Error in loging out: ", error)
    }
  }

  return (
    <>
    <Button variant='contained' color='error' style={button} to="/logout" onClick={handleLogout} component={Link}>Logout</Button>
    </>
  )
}
