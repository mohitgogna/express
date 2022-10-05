const express = require('express')
require("dotenv").config();

const app = express()

app.set('view engine', 'ejs')
app.use(logger);
//app.use(express.static("public"));


//middleware to access information coming from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const authRouter=require('./routes/login');
app.use('/user', userRouter);
app.use('/', mainRouter);
app.use('/login',authRouter);

app.listen(3000)

// app.get('/',logger, (req, res)=>{
//     console.log("Hello");
//     res.render('index', {text:"Info"});
// })

// app.get('/', (req, res) => {
//     console.log("Hello");
//     //res.send("Hi");
//     //res.sendStatus(500)
//     //res.status(500).send("Hello");
//     //res.json({message:"Hello"});
//     //res.render('index');
//     res.render('index', { text: "Info" });
// })



function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}