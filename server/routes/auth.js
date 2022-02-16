const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requirelogin')


router.get('/protected', requireLogin, (req,res)=>{
    res.send('hello protected data')
})

router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"Please enter required fields"})              //returning as we do not move further in such case
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"})              
        }
        bcrypt.hash(password, 10)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter email/password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email/password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id, name, email, followers, following} = savedUser
                res.json({token, user:{_id, name, email, followers, following}})
            }
            else{
                return res.status(422).json({error:"Invalid email/password"})
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router