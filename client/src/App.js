import {  Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Login from './components/Form/Form';
import Home from './components/Home/Home';

function App() { 
  
  const [access, setAccess] = useState(false);  
  const navigate = useNavigate();

  const login = (userdata) => {
    const dni = userdata;
    axios.post("http://localhost:3001/login", { dni: dni }) // Cambia aquí
      .then(({ data }) => {
        const { access } = data;
        setAccess(access);
        access ? navigate('/home')
        : window.alert("Sign up to access home page");
      });
};

const signUp = (userdata) => {
  const dni = userdata
  axios.post("http://localhost:3001/signup", { dni: dni }) // Cambia aquí
    .then(({ data }) => {
      const { access } = data;
      setAccess(access);
      access && navigate('/home');
    });
};
   
   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate]); 

   
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Login login={login} signUp={signUp} />}/>
        <Route path="/home" element = {<Home access={access} />}/> 
      </Routes>
    </div>
  );
}

export default App;
