import bcrypt from "bcrypt"
import UserSchema from  "./schema/user.schema.js"
export async function register(req,res){
    try {
        let { username,password } = req.body;
        if(password.length<4 && password.length < 4){
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
