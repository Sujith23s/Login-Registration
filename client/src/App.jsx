import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from "./components/Login.jsx";
import Home  from "./components/Home";
import Signup from "./components/Signup.jsx";
import { NavBar } from './components/NavBar.jsx';
import axios from "axios"

export const isLoggedIncontext = createContext();
export const setIsLoggedIncontext = createContext();

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    axios.get("http://localhost:5656/user", { withCredentials: true})
    .then((result) => {
      if(result.data.user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    })
    .catch(() => setIsLoggedIn(false))
  },[])

  return (
    <>
      <isLoggedIncontext.Provider value={isLoggedIn}>
        <setIsLoggedIncontext.Provider value={setIsLoggedIn}>
          <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
              <Route path="/login" element= {isLoggedIn? <Navigate to="/home"/>: < Login/>} />
              <Route path="/signup" element = {isLoggedIn?<Navigate to="/home"/>: < Signup />} />
              <Route path="/home" element = { isLoggedIn?< Home/>: <Navigate to="/login"/>} />
            </Routes>
          </BrowserRouter>
        </setIsLoggedIncontext.Provider>
      </isLoggedIncontext.Provider>
    </>
  )
}

export default App
