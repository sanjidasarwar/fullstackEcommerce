import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
console.log(process.env.PORT);

const port = process.env.PORT || 8000

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.get('/', (req, res)=>{
    res.send('Api working')
})

app.listen(port, ()=>{
    console.log(`listing to port ${port}`);
    
})

