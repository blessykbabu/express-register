import bcrypt from "bcrypt"
import UserSchema from  "./schema/user.schema.js"
import jwt from "jsonwebtoken"
import userSchema from "./schema/user.schema.js";
const {sign}=jwt;
export async function register(req,res){
    try {
        let { username,password } = req.body;
        if(user.length<4 && password.length < 4){
            return res.json("invalid username or password");
        }
        
        let hashedPass = await bcrypt.hash(password,10)
        let userExit = await UserSchema.findOne({username})
        if(userExit){
            return res.status(401).send("user already exists");
        }
        let result = await UserSchema.create({username,password:hashedPass});
        return res.status(200).send("registration successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
}

export async function login(req,res) {
    try {
        let { username,password } =req.body;
        if(username.length<4 && password.length < 4){
            return res.json("invalid username or password");
        }
        let user=await UserSchema.findOne({username})
        let passCheck=await bcrypt.compare(password,user.password)
       if(passCheck){
       let token=await sign({
        username:user.username,
        id:user._id
       },
       
       process.env.SECRET_KEY,
       {
        expiresIn:"24h"
       }
       )
     return res.json({
        msg:"Login successful",
        token:token
     });

       }

return res.status(403).send("Incorrect username or password")

    } catch (error) {
        console.log(error)
        res.json("Error occured")
    }
}
export async function profile(req,res){
    try {
      let user=req.user;
      let userDtaile=await userSchema.findOne({_id:user.id})
   if(userDetails){
    return.json(userDtaile)
   }
   
   
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}