import { Router } from "express";
import auth from "./middlewares/auth.js";
import multer from 'multer'
import path from 'path'

import * as userHandlers from "./request-handler.js";
const storage =multer.diskStorage({
    destination:"./files",
    filename:(req,file,cb)=>{
    cb(null,file.originalname);
}})
const upload=multer({storage:storage});//storage objct

const router = Router()

router.route("/register").post(userHandlers.register);
router.route("/login").post(userHandlers.login);
router.route("/profile").get(auth, userHandlers.profile);

router.route("/add-note").post(auth, userHandlers.addNote);
router.route("/get-note").get(auth,userHandlers.getNote)
router.route("/file").post(upload.single("myfile"),(req,res)=>{
    console.log(req.file);
    res.json("file stored")
})//myfile is a input filed name
router.route("/get-file/:file").get((req,res)=>{
    let fileName=req.params;
    res.sendFile(path.resolve(`./files/${fileName.file}`));
})
export default router;
