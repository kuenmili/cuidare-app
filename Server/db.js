require("dotenv").config()
const mongoose = require('mongoose');

const { DB_CONNECTION } = process.env;

mongoose.connect(DB_CONNECTION)
.then(() => {
    console.log('Database connected succesfully');
}).catch(err => {
    console.log(err);
})