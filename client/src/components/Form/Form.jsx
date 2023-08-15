import style from '../Form/style.module.css'
import { useState } from 'react';

const Login = ({login, signUp}) => {

  const [dni, setDni] = useState(""); // Estado local que se utilizara para enviar el dni requerido para registrarse o ingresar.
  const [showLoginForm, setShowLoginForm] = useState(null); // Estado local para setear el campo correcto y mostrarlo en pantalla.

  const handleChange = (event) => {   // Funcion para setear el estado local con el campo para ingresar
    setDni(event.target.value);       // utilizamos event.target.value para controlar el estado.
  };

  const handleSubmit = (event) => {   // Funcion para enviar el estado local a la funcion que se le pasa por parametro
    event.preventDefault();           // login. Se llama a preventDefault para que cuando se envia el formulario no
    login(dni);                       // se refresque la pagina automaticamente. Se envia y luego se resetea el estado local.
    setDni("");
  };

  const handleFormToggle = (event) => {  // Funcion para mostrar el campo a rellenar, ya sea login o signup.
    setShowLoginForm(event.target.name); // Cambiado a solo el nombre del botón
    setDni("");                          // Resetear el valor del input al cambiar entre formularios
  };

  const handleSignUpSubmit = (event) => { // Funcion para enviar el formulario con la funcion para registrarse.
    event.preventDefault(); // Después de un registro exitoso, 
    signUp(dni)             //se podría cambiar automáticamente al formulario de inicio de sesión
    
    setShowLoginForm("showLogin"); // Cambiado a "showLogin"
    setDni(""); // Resetear el valor del input después de registrarse
  };

  return (
    <div > 
      <div className={style.container}>       
          <button 
              className= {style.mainButtons}
              name="showLogin" 
              onClick={handleFormToggle}>
                Log in
          </button>
          <button 
              className={style.mainButtons}
              name="showSignUp" 
              onClick={handleFormToggle}>
                Sign up
          </button>        
      </div>
      <div className={style.containerForm}>
        <h1 className={style.title}>Let's be bloggers!</h1>

    {/* Formulario para iniciar sesion */}
        {showLoginForm === "showLogin" && ( // Cambiado a comparación estricta
        <div >
          <form 
            className={style.inputBox}
            onSubmit={handleSubmit}
          >            
            <input
              type="text"
              name="dni"
              required
              value={dni}
              onChange={handleChange}
              placeholder="Dni"
            />  
            <button 
              className={style.submit}
              type="submit">Log in</button>
          </form>    
          </div>    
        )}

        {showLoginForm === "showSignUp" && ( // Cambiado a comparación estricta
          <form 
            className={style.inputBox}
            onSubmit={handleSignUpSubmit}>
          <input
              type="text"
              name="dni"
              required
              value={dni}
              onChange={handleChange}
              placeholder="Dni"
            />
            <button 
            className={style.submit}
            type="submit">Sign up</button>
          </form>
        )}
    </div>
        </div>
  );
};

export default Login;
