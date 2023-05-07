const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
dotenv.config();
require('./Database/conn');

app.use(express.json());

const PORT = process.env.PORT || 6000;

// Link The Router File
app.use(require('./router/auth'));
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.listen(PORT,()=>{
    console.log('Server is Started ' + PORT);
})
