const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
});

userschema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        this.cpassword = await bcrypt.hash(this.cpassword,10);
    }
    next();
})

const User = new mongoose.model("Registered",userschema);

module.exports = User;