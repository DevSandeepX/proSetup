const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        type:String,
        default:'Employee'
    }],
    active:{
        type:Boolean,
        default:true
    }

}, {timestamps:true})



const User = mongoose.model('User', userSchema)
module.exports = User