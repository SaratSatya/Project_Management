import express from "express";
import cors from "cors";

const app=express();

//Middleware
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));// Whatever files are present in public folder I can access it using URL from frontend.

//cors configuration
app.use(cors({
  origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
  credentials:true,
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowHeaders:["Content-Type","Authorization"],
}),
)

//import the routes 

import routes from './routes/healthcheck.routes.js'

app.use('/api/v1/healthcheck',routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



export default app; 