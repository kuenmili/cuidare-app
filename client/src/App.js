import {  Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Login from './components/Form/Form';
import Home from './components/Home/Home';

function App() { 
  
  const [access, setAccess] = useState(false);  // estado local que setea si el usuario esta logueado o no
  const navigate = useNavigate();

  const login = async (dni) => {   // Funcion asincrona para loguearse con los datos que vienen del componente Form.

      await axios.post("http://localhost:3001/login", { dni: dni }) // esperamos que el axios post envie el objeto dni con el valor del dni que se recibe por parametro.
      .then(({ data }) => {     // desestructuramos data de la respuesta de axios.
        const { access } = data;  // desestructuramos access de data para setear el estado de acceso del usuario.
        setAccess(access);
        access ? navigate('/home')  // si hay usuario navegamos a home, si no enviamos un window alert.
        : window.alert("Sign up to access home page");
      });
};

const signUp = async (dni) => { // Funcion asincrona para registrarse con los datos enviados por parametro desde el componente Form
  await axios.post("http://localhost:3001/signup", { dni: dni }) // esperamos al axios.
};

  return (
    <div className="App">
      {/** Envolvemos las rutas en el Router de React y establecemos el path
       *  y el componente que se renderizara en ese path. A cada componente 
       * le asignamos las propiedades que correspondan. */}
      <Routes>
        <Route path="/" element = {<Login login={login} signUp={signUp} />}/>
        <Route path="/home" element = {<Home access={access} />}/> 
      </Routes>
    </div>
  );
}

export default App;
