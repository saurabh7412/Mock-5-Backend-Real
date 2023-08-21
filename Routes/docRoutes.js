const express = require('express');

const router = express.Router();

const Docs = require("../Models/doctorModel");

const Users = require('../Models/userModel');
const Auth = require('../Middlewares/Auth');

router.get('/', Auth, async(req,res)=>{
    try {

        const {specialization, sortByDate, search} = req.query;

        let filter = {};

        if(specialization){
            filter.specialization = specialization
        }
        if(search){
            filter.name = { $regex : search , $options : "i" }
        }

        let sortOption = {};
        if(sortByDate == "desc"){
            sortOption.date = -1
        }else if(sortByDate == 'asc'){
            sortOption.date = 1
        }



        const checkDocs = await Docs.find(filter).sort(sortOption);

        return res.status(200).send({AllDocs : checkDocs});

        
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/appointments',Auth, async(req,res)=>{
    try {

        const {name, image, specialization, experience, location, date, slots, fee} = req.body;

        const newApp = await Docs.create({
            name, image, specialization, experience, location, date, slots, fee
        })

        return  res.status(200).send({msg: "Appointment Booked Successfully !", newApp});

        
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch('/edit/:id', async(req,res)=>{
    try {

        const {id} = req.params;

        const newData = await Docs.findByIdAndUpdate(id, req.body);

        const data = await Docs.findById(id);

        return  res.status(200).send({msg: "Details Edited Successfully !", updated_Data : data});


        
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete('/delete/:id', async (req,res)=>{
    try {

        const {id} = req.params;

        const deletedData = await Docs.findByIdAndDelete(id, req.body);

        res.status(200).send({msg : "Data deleted successfully"})

        
    } catch (error) {
        res.status(500).send(error)
    }
})






module.exports = router;