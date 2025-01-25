import React, { useState } from 'react'
import { useNavigate} from "react-router-dom"
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import axios from "axios"

const Signup = () => {

  const heading = { fontSize:"2.5rem", fontWeight:"600"};
  const PaperStyle = { padding:"2rem", margin:"100px auto", borderRadius:"1rem", boxShadow:"10px 10px 10px" };
  const row = { display:"flex", marginTop:"2rem"}
  const BtnStyle = { marginTop:"2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"}

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("h")
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5656/signup", {name, email, password, gender})
      .then(result => {
        if (result.status === 201){
          navigate("/login");
          console.log("Signup successful")
          console.log(result.status)
        }
      })
      .catch(err => {
        if(err.response && err.response.status === 400) {
          window.alert("User alreay exixt. Please use another email.")
        }else{
          console.log(err)
        }
      })
  }

  return (
    <>
      <Grid align="center">
        <Paper style={PaperStyle} sx={{height:'60vh',width:{
          xs:"80vw",
          sm:"50vw",
          md:"40vw",
          lg:"30vw",
          xl:"20vw"
        }}}>
        <Typography style={heading}>Signup</Typography>
          <form action="" onSubmit={handleSignup} >
            <TextField required autoCapitalize='name' name="name" onChange={(e) => setName(e.target.value)} label="Enter name" type='name' style={row} sx={{label:{ fontWeight:"700", fontSize:"1.3rem"}}}></TextField>
            <TextField required autoComplete='email' name="email" onChange={(e)=>setEmail(e.target.value)} label="Enter email" type="email" style={row} sx={{label:{ fontWeight:"700", fontSize:"1.3rem"}}}></TextField>
            <TextField required name="password" onChange={(e)=>setPassword(e.target.value)} label="Enter password" type='password' style={row} sx={{label:{ fontWeight:"700", fontSize:"1.3rem"}}}></TextField>
            {/* <label>Gender:</label>
             <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option> */}
            {/* </select> */}
            <Button style={BtnStyle} variant='contained' type='submit'>Signup</Button>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

export default Signup
