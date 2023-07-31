
const express = require("express")
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const AppError = require('../views/AppError')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const Joi = require('joi')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const puppeteer = require('puppeteer'); 
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid');
uuid(); 



app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('secretData'))
app.use(express.static(path.join(__dirname, 'public')))



app.set('view engine', 'ejs')

app.use(morgan('tiny'))
// app.use((req, res   ) => {
//     console.log('new request...')
//     // res.send('request recieved')
// })

const Concert = require('../models/post')
const Quote = require('../models/quotes')
const Artists = require('../models/artist')
const User = require('../models/user')
const posts = require('../routes/posts')
const wrapAsync = require('../utility/catchAsync')
const { authorize, checkUser } = require('../middleware/authMiddleware')

  
const validateLogin = (req, res, next) => {
    if (!req.cookies.vt && req.cookies.id){
    return res.redirect('/sign-in')
    }else{
        next()
    }
}




const sessionOptions = {
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: + 1000 * 60 * 60 * 24 * 7
    }
}



app.use(session(sessionOptions))
app.use(flash())


app.use((req, res, next) => {
    res.locals.sp = req.flash('sp')
    res.locals.saa = req.flash('saa')
    res.locals.ad = req.flash('ad')
    res.locals.search = req.flash('search')
    res.locals.pd = req.flash('pd')
    res.locals.postnf = req.flash('postnf')
    res.locals.postFail = req.flash('postFail')
    res.locals.paynf = req.flash('paynf')
    res.locals.anf = req.flash('anf')
    res.locals.ls = req.flash('ls')
    res.locals.lf = req.flash('lf')
    res.locals.lus = req.flash('lus')
    res.locals.ac = req.flash('ac')
    res.locals.acbc = req.flash('acbc')
    res.locals.ntdaa = req.flash('ntdaa')
    next();
})


//req.flash abreviation meanings - 
//sp = successfully posted
//saa = successful artist account creation
//ad = account deletion
//search is obvious
//pd = post deletion
//postnf = post not found
//paynf = payment route not found (it couldn't find the concert that you want to purchase)
//anf = artist not found
//ls = login successful
//lf = login failed
//lus = login unsuccessful
//ac = account created
//acbc = account couldn't be created

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router()

const mongoose = require('mongoose');
const Artist = require("../models/artist")
const catchAsync = require("../utility/catchAsync")


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })



    app.post('/', (req, res) => {
        console.log('request sent')
        console.log(req.body.pid)
      })




module.exports = router