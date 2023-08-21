
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const cors = require('cors');

app.use(cors());

app.use(express.json());

const userRoute = require('./Routes/userRoute');

app.use('/users',userRoute);


const docRoute = require('./Routes/docRoutes');

app.use('/doctors', docRoute);










app.get('/',(req,res)=>{
    res.status(200).send('Welcome to HomePage !')
})

app.listen(process.env.PORT,()=>{
    Connect()

    console.log("Listening to Port...")
})

const Connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);


        console.log("Connected to db...");
    } catch (error) {
        console.log(error);
    }
}