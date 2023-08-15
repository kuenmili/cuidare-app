require('./db')
require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const server = express();
const router = require('./src/routes/index');

server.use(express.json());

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

server.use('/', router);

server.listen(PORT, () => {
   console.log('Server raised in port: ' + PORT);
});