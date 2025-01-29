import React, { useContext, useState } from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIncontext } from '../App';

function Login () {
  const setIsLoggedIn = useContext(setIsLoggedIncontext)
  const heading = { fontSize:"2.5rem", fontWeight:"600"};
  const PaperStyle = { padding:"2rem", paddingBottom:"px", margin:"100px auto", borderRadius:"1rem", boxShadow:"10px 10px 10px" };
  const row = { display:"flex", marginTop:"2rem"}
  const BtnStyle = { marginTop:"2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"}
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5656/login", {email, password},{ withCredentials:true})
    .then((result) => {
      if(result.data === "Success"){
        axios.get("http://localhost:5656/user", { withCredentials:true })
        .then((response) => {
          if(response.data.user){
            console.log(response.data.user)
            setIsLoggedIn(true)
            navigate("/home", { state: {user: response.data.user }})

          }
        })
      }else{
        alert("Login failed: User does not match!")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Grid align="center">
        <Paper style={PaperStyle} sx={{height:'45vh',width:{
          xs:"80vw",
          sm:"50vw",
          md:"40vw",
          lg:"30vw",
          xl:"20vw"
        }}}>
        <Typography style={heading}>Login</Typography>
          <form action="" onSubmit={handleLogin}>
            <TextField onChange={(e) => setEmail(e.target.value)} name="email" label="Enter email" type="email" style={row} sx={{label:{ fontWeight:"700", fontSize:"1.3rem"}}}></TextField>
            <TextField onChange={(e) => setPassword(e.target.value)} name="password" label="Enter password" type='password' style={row} sx={{label:{ fontWeight:"700", fontSize:"1.3rem"}}}></TextField>
            <Button style={BtnStyle} variant='contained' type='submit'>Login</Button>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

export default Login;
