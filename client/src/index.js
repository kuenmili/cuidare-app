import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import React from 'react';
import App from './App';

//INDEX ESTABLECE EL STORE DE REDUX COMO COMPONENTE QUE ENGLOBA LA APP.
// SE UTILIZA BROWSER ROUTER PARA QUE ENGLOBE LA APP CON SU ENRUTADOR.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
   <BrowserRouter>
   <App />
  </BrowserRouter> 
 </Provider>
  
);