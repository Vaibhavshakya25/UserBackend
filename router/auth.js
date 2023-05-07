const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');

const User = require('../models/userSchema');
// Middleware
const Middleware = (req,res,next)=>{
    console.log('Middleware is pending');
    next();
}


router.get('/',(req,res)=>{
    res.send('This is Home Page');
})

router.post('/register',async (req,res)=>{
    const {firstName, lastName, phone, email, password, cpassword} = req.body;
    if(!firstName || !lastName || !phone || !email || !password || !cpassword){
        return res.json({message: "Please fill all the Required Data"});
    } 

    try{
        const userexist = await User.findOne({email:email});

        if(userexist){
            return res.status(422).json({error: "Email Already Registered"})
        }

            const user = new User({firstName, lastName, phone, email, password, cpassword});
            const store =  await user.save();

       if(store){
         res.status(201).json({message: "Data is Register in Database"});
       }
    }
    catch(err){
        res.status(500).json({message :"Failed to Register", error : error});
    }
})

router.post('/signin',async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"fill all required data"});
        }

        const userlogin = await User.findOne({email:email});
        if(userlogin){
            const matchpass = await bycrypt.compare(password,userlogin.password);
            if(matchpass){
                res.status(200).json({message:"Login Success"});
            }
            else{
                res.status(400).json({error: "Invalid Password"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credential"})
        }
    }
    catch(err){
        res.status(400).json({message:"Failed to Login"})
    }
})

router.get('/users',async (req,res)=>{
    try{
        const response =await  User.find({});
        res.status(200).send(response);
    }
    catch(error){
        res.status(400).json({error:"Failed to Fetch Data"});
    }
})

module.exports = router;