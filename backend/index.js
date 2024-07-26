import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Test");
});

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1 : Allow All Origins with Default of cors
app.use(cors());
// Option 1 : Allow Custom origins
//app.use(cors({
//    origin: 'http://localhost:3000',
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    allowedHeaders: ['Content-Type'],
//}));

app.use('/books', booksRoute);

//Mongo DB connection using Mongoose
mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to database");
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });

