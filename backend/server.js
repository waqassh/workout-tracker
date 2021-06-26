const express = require('express');;
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

//hier haal ik de gegevens op uit een bestand om te zorgen voor connectie
const uri = process.env.BEL_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

//hier maak ik een connectie
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establieshed successfully");
})

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/users');

app.use('/exercise', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})