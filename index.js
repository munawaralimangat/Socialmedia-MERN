import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import { error } from "console";
import {register} from "./controllers/auth.js"

//configuration 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}))
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

dotenv.config()

//file storage //uploading will be saved here.
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})
const upload = multer({storage})


//ROUTES
app.post('/auth/register',upload.single("picture"),register)

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})

.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server port ${PORT}-mongodb atlas`)
    })
})
.catch((error)=> console.log(`${error} ${PORT} did not connect`))