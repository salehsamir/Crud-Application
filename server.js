const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

const connectDB = require('./server/database/connection');



const app = express();

dotenv.config({path : 'config.env'});

const PORT = process.env.PORT || port;

// log request..
app.use(morgan('tiny'));  // provides the minimal output,declare a status ,respons time in milisecond

// mongodb connection 
connectDB();



//parse request to body-parser..

app.use(bodyParser.urlencoded({extended:true}));

// set view engine 

app.set('view engine','ejs');

// load assets..

app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

// load routes

app.use('/',require('./server/routes/router'))


app.listen(3000,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});