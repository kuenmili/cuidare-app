import style from '../Form/style.module.css'
import { useState } from 'react';

const Login = ({login, signUp}) => {

  const [dni, setDni] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(null); // Cambiado a null

  const handleChange = (event) => {
    setDni(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(dni);
    setDni("");
  };

  const handleFormToggle = (event) => {
    setShowLoginForm(event.target.name); // Cambiado a solo el nombre del botón
    setDni(""); // Resetear el valor del input al cambiar entre formularios
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    signUp(dni)
    // Después de un registro exitoso, podrías cambiar automáticamente al formulario de inicio de sesión
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
