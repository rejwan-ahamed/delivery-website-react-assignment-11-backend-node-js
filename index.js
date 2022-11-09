const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


// middle ware
app.use(cors());
app.use(express.json())

// get api
app.get('/',(req,res)=>{
    res.send('get api is working')
})


// mongo db 

const uri = `mongodb+srv://${env.process.DB_User}:${env.process.DB_Password}@cluster0.vhnnfcc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// api listening
app.listen(port,()=>{
    console.log(`api listening port is ${port}`)
})

