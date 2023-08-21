
const jwt = require("jsonwebtoken");

const Users = require('../Models/userModel');

const Auth = async (req,res,next)=>{

    const token = req.headers.authorization;

    if(!token){
        return res.status(400).send('Login First !')
    }

    const decoded = jwt.verify(token, "abc123")
    console.log(decoded);

    if( !decoded ){
        return res.status(400).send('user Not Authorized !')
    }
    else{
        let result = await Users.findById(decoded.userID);
        if(result){
            next()

        }else{
            return res.status(400).send('user dont exist in Auth !')
        }
    }
}

module.exports = Auth;