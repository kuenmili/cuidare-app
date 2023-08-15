require('./db')
require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const server = express();
const router = require('./src/routes/index');

// REQUERIMOS LA DB AL INICIO PARA CONECTARLA CUANDO SE INICIE INDEX.
// UTILIZAMOS .ENV
// IMPORTAMOS EXPRESS PARA ESTABLECER LA CONEXION DEL SERVIDOR E IMPORTAMOS ROUTER PARA ESTABLECER LA RUTA PRINCIPAL

//HABILITAMOS EL MIDDLEWARE PARA QUE SE PUEDA LEER EL CUERPO DE LA APP EN FORMATO JSON.
server.use(express.json());


//CONFIGURAMOS EL SERVIDOR PARA QUE PUEDA TOMAR PETICIONES DESDE CUALQUIER LADO Y CON LOS METODOS GET POST OPTIONS PUT Y DELETE.
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});


//ESTABLECEMOS EN EL PATH '/' AL ENRUTADOR DEL BACK
server.use('/', router);


// CONEXION DEL SERVIOR EN EL PUERTO.
server.listen(PORT, () => {
   console.log('Server raised in port: ' + PORT);
});