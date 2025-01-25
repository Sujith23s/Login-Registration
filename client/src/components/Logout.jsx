import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const Logout = () => {
  const button={marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'} 

  return (
    <>
    <Button variant='contained' color='error' style={button} to="/logout" component={Link}>Logout</Button>
    </>
  )
}
