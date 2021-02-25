import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import apiRoutes from './server/api-routes';
import mongoose from 'mongoose'
import path from 'path';
import dotenv from 'dotenv'
import cors from 'cors'

// Setup Express
const app = express();
app.use(cors())
const port = process.env.PORT || 10000;
dotenv.config()

// Setup body-parser
app.use(bodyParser.json({ extended: false }));

// Setup express-session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "G7INTERN"
}));

// Setup our routes. These will be served as first priority.
// Any request to /api will go through these routes.
app.use("/api", apiRoutes);

// If we're in production...
if (process.env.NODE_ENV === 'production') {
    console.log("Running in production!");

    // Make the "build" folder available statically
    app.use(express.static(path.join(__dirname, "client/build")));

    // If we don't match ANYTHING else, return client/build/index.html on another GET request.
    app.get("*", (req, res) => {
        res.sendFile(
            path.sendFile(__dirname, 'client/build', 'index.html')
            );
    });
}

//Connect to DB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://pjia958:Mongo7@cluster0.wwpp1.mongodb.net/interndb?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()=>console.log('Connected to Database'))

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb+srv://pjia958:Mongo7@cluster0.wwpp1.mongodb.net/interndb?retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, () => console.log(`App server listening on port ${port}!`));