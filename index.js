const express = require('express');
const dotenv = require('dotenv');
const cons = require('cons');
const app = express();
dotenv.config();
require('./Database/conn');

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Link The Router File
app.use(require('./router/auth'));
app.use(cons());


app.listen(PORT,()=>{
    console.log('Server is Started ' + PORT);
})
