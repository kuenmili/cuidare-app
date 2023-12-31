import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

// SE ESTABLECE EL STORE DE REDUX.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR


const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea sirve para que podamos hacer peticiones a una Api/servidor
);



export default store;