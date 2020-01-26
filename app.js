const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/database');
const loginRoutes = require('./routes/auth');
const detailRoutes = require('./routes/detail');
const app = express();
 
mongoose.connect(config.database,{useNewUrlPaser: true})
.then(() => {
	console.log('Connected to database');
},
err => {
	console.log(err);
    console.log('Connection Failed');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    	"Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    	"GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use('/userAuth',loginRoutes);
app.use('/user',detailRoutes);
module.exports = app; 