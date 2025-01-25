import { useState } from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/Login.jsx";
import Home  from "./components/Home";
import Signup from "./components/Signup.jsx";
import { NavBar } from './components/NavBar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/home" element= {< Home/>} />
          <Route path="/login" element = {< Login />} />
          <Route path="/signup" element = {< Signup/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
