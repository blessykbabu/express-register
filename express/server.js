import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import conn from "./connection.js"
dotenv.config();
const app = express();

app.use(express.json());    //express is middle ware

app.use("/", express.static("./static"));

app.use("/api", router);
conn().then(() => {
   app.listen(process.env.PORT, (error) => {
      if(error) {
         console.log(error);
         return;
      }
      console.log("Server started on port 3000");
   })
})
.catch((error)=>{
   console.log(error)
})
