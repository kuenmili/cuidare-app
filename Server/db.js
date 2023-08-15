require("dotenv").config()
const mongoose = require('mongoose');

//ESTABLECEMOS LA CONEXION DE LA DB CON LA CONNECTION STRING PROVEIDA POR MONGO.

const { DB_CONNECTION } = process.env;

mongoose.connect(DB_CONNECTION)
.then(() => {
    console.log('Database connected succesfully');
}).catch(err => {
    console.log(err);
})