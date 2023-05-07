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
app.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
app.listen(PORT,()=>{
    console.log('Server is Started ' + PORT);
})
