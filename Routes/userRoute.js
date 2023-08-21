const express = require('express');

const router = express.Router();

const Users = require('../Models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/',async(req,res)=>{
    try {
        const users = await Users.find();
        return res.status(200).send({AllUsers : users})

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/signup',async(req,res)=>{
    try {

        const {email,password} = req.body;
        const userCheck = await Users.findOne({email});
        if(userCheck){
            return res.status(400).send('User Already Exist !')
        }
        // if( !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()<>?]/.test(password) || password.length < 8){
        //     return res.status(400).send('Make Correct Password!')
        // }

        const newPass = await bcrypt.hash(password,10);

        const newUser = await Users.create({...req.body, password : newPass})

        return res.status(200).send({msg: "New User Registered !", newUser: newUser});

        
    } catch (error) {
        res.status(500).send(error)
    }
})



router.post('/login', async(req,res)=>{
    try {

        const {email,password} = req.body;

        const userCheck = await Users.findOne({email});
        if(!userCheck){
            return res.status(400).send('User Not Found. Register First !')
        }

        const verify = await bcrypt.compare(password, userCheck.password)

        if(!verify){

          return res.status(400).send('Wrong Password !')
        }

        const token = jwt.sign({userID : userCheck._id, email : userCheck.email},'abc123')

        return res.status(200).send({msg: "Login Successful !", token});

        
    } catch (error) {
        res.status(500).send(error)
    }
})







module.exports =  router;