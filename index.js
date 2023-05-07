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
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
app.listen(PORT,()=>{
    console.log('Server is Started ' + PORT);
})
