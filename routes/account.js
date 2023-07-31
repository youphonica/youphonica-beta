
require('dotenv').config()


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
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const jwt = require('jsonwebtoken')
const sanitizeHtml = require('sanitize-html');
const mongoSanitize = require('express-mongo-sanitize');
const puppeteer = require('puppeteer');
const { v4: uuid } = require('uuid');
uuid(); 



app.use(express.urlencoded( { extended: true } ))
app.use(session({ secret: 'secret'}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('secretData'))
app.use(mongoSanitize());
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
const Notifications = require('../models/notifications')
const Report = require('../models/report')
const posts = require('../routes/posts')
const catchAsync = require('../utility/catchAsync')
const authController = require('../controllers/authContollers')
const { authorize, checkUser } = require('../middleware/authMiddleware')




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
    req.session.returnTo = req.originalUrl
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
    res.locals.pin = req.flash('pin')
    res.locals.acbc = req.flash('acbc')
    res.locals.eca = req.flash('eca')
    res.locals.error = req.flash('error')
    res.locals.asi = req.flash('asi')
    res.locals.aalr = req.flash('aalr') // artist account limited reached
    res.locals.slo = req.flash('slo')
    res.locals.ntdaa = req.flash('ntdaa')
    res.locals.acs = req.flash('acs')
    res.locals.accs = req.flash('accs')
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
//eca = error creating account
//sir = sign in required
//slo = successfully logged out
//ntdaa = need to delete artist accounts


const router = express.Router()

const mongoose = require('mongoose');
const Artist = require("../models/artist")
const { findById } = require('../models/post')


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

    const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
        process.env.REDIRECT_URI)
    
        oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    
    

    const stripe = require('stripe')(process.env.STRIPE_SECRET);





    router.get('/sign-in',authController.sign_in_get)
    
    router.post('/sign-in', authController.sign_in_post)


    

router.get('/sign-out', (req, res) => {
        res.cookie('uid', '', { maxAge: 1 })
        res.cookie('uih', '', { maxAge: 1 })
        res.cookie('vt', '', { maxAge: 1 })
        req.flash('slo', 'successfully logged out')
        return res.redirect('/posts')
})







    
    const JWT_SECRET = process.env.JWT_SECRET

 
    
  
    



    













    router.get('/verify-email/:id/:token', async (req, res) => {
        try{
        const { id, token } = req.params
        const user = await User.findById(id)
        if(user == null || undefined){
            req.flash('pnf', 'error verifying email')
            return res.redirect('/posts')
        }
        const secret = JWT_SECRET + user.email
   
        const payload = jwt.verify(token, secret)
        const userSave = await User.findByIdAndUpdate(id, {verifiedEmail: true}, { runValidators: true, new: true });
        console.log('user update:', userSave)
        req.flash('ac', 'email verified')
        return res.redirect('/posts')
        }
        catch(e){
            console.log(e)
            res.send(e)
    }})











    router.get('/apply-for-artist-account', async (req, res) => {
        try{
            console.log('applying...')
            const uid = req.cookies.uid
            if(uid == null || undefined){
                console.log('no id')
                return res.redirect('/account/sign-in')
            }
            jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
                const id = decodedToken.id
                const user = await User.findById(id)
                const artists = await Artist.find({userId: id})
                if(err){
                    console.log('error for token verification')
                    return res.redirect('/posts')
                }
            // if(user.artists.length > 0 && user.account_tier == null || undefined){
            //     console.log('teir 1')
            //     return res.redirect('/account/upgrade-account')
            // }
            // if(user.artists.length > 0 || user.artists.length < 10 && user.account_tier === 2){
            //     console.log('teir 3')
            //     return res.redirect('/account/upgrade-account')
            // }
            // if(user.artists.length > 0 || user.artists.length < 50 && user.account_tier === 3){
            //     console.log('teir 4')
            //     return res.redirect('/account/upgrade-account')
            // }else{
            // if(user.first_artist == null || undefined){
         
                var notisFind = await Notifications.find({for: id})
                if(notis > 9){
                    var notis = '9+'
                    return res.render('apply-for-artist-account', { user, notis })
                }else{
            var notis = notisFind.length
            return res.render('apply-for-artist-account', { user, notis })
            }
            // }else{
            // req.flash('aalr', 'you already have an artist account')
            // return res.redirect('/posts')
            // }
        // }
            })
    }catch(e){
            console.log(e)
            return res.redirect('/posts')
        }
    })

  




    



















    

    router.get('/my-accounts', authController.my_accounts_get)
    
    
   
    









































        































































   
router.get('/account-settings', async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const id  = decodedToken.id
        const user = await User.findById(id)
        if(user.country){
            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
        return res.render('account-settings', { user, notis })
        }else{
            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
            return res.render('account-settings-incomplete', { user, notis })
        }
        })
        }catch(e){
            console.dir(e)
            return res.redirect('/posts')
        }
})
















router.get('/notifications', async (req, res) => {
    try{
    const uid = req.cookies.uid
    const uih = req.cookies.uih
    const cookies = req.cookies.cookieSettings
  if(uid == null || undefined){
    return res.redicrect('/posts')
  }
  jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
      if(err){
        console.log('error for token verification')
        return res.redirect('/account/sign-out')
      }
      const userId = decodedToken.id
      const user = await User.findById(userId)
      var notisFind = await Notifications.find({for: userId})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
      const notifications = await Notifications.find({ for: userId, read: false})
    //   return res.render('notifications', { user, notifications, notis, cookies })
      return res.send(notifications)

})}catch(e){
    return res.send(e)
}
})









router.put('/account-settings', async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }else{
        const id  = decodedToken.id
        const user = await User.findById(id)
        const userUpdate = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        console.log(userUpdate)
        req.flash('saa', 'account changes saved')
        return res.redirect('/account/account-settings')
        }})
        }catch(e){
            console.dir(e)
            return res.render('sww')
        }
})














































router.get('/:id/report-account', async (req, res) => {
    try{
        const { id } = req.params
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }else{
        const userId  = decodedToken.id
        const user = await User.findById(userId)
        const artist = await Artist.findById(id)
        if(user.id === artist.userId){
            return res.redirect('/posts')
        }
        var notisFind = await Notifications.find({for: userId})
        if(notis > 9){
            var notis = '9+'
            return res.render('report-account', { user, artist, notis })
        }else{
    var notis = notisFind.length
    return res.render('report-account', { user, artist, notis })
    }}
        })
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})








router.post('/:id/report-account', async (req, res) => {
    try{
        const { id } = req.params
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }else{
        const userId  = decodedToken.id
        const user = await User.findById(userId)
        const artist = await Artist.findById(id)
        if(user.id === artist.userId){
            return res.redirect('/posts')
        }
        const report = new Report()
        report.reason = req.body.reason
        if(req.body.details !== undefined || null){
        report.details = req.body.details
        }
        report.artistInvolved = artist.id
        report.date = Date.now()
        await report.save()
        req.flash('anf', 'artist has been reported')
        return res.redirect('/posts')
    }})
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})







router.get('/delete-account', async (req, res) => {
    const userID = req.cookies.id
    const uih = req.cookies.uih
    const user = await User.findById(userID)
    if(!user || user == undefined || null){
        return res.redirect('/posts')
    }
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    const checkUserId = await bcrypt.compare(user.id, uih)
    if(!checkUserId){
        return res.redirect('/posts')
    }
    if(checkUserId){
        var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
        return res.render('delete-user', { user, notis })
    }
})

router.delete('/delete-account', authorize, checkUser, async (req, res) => {
    const userID = req.cookies.id
    const uih = req.cookies.uih
    const user = await User.findById(userID)
    if(!user || user == undefined || null){
        return res.redirect('/posts')
    }
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    const checkUserId = await bcrypt.compare(user.id, uih)
    if(!checkUserId){
        return res.redirect('/posts')
    }
    const artId = user.artists.toString()
    const artist = await Artist.findById(artId)
    if(!checkUserId){
        return res.redirect('/posts')
    }
    if(checkUserId){
        if(user.cus_id == null || undefined){
            const deleteUser = await User.findByIdAndDelete(userId)
        }else{
            const deleteUser = await User.findByIdAndDelete(userId)
            const deletedCus = await stripe.customers.del(
            user.cus_id
          );
        }
    }
    if(checkUserId){  
    const concert = await Concert.find({artId: artist.id})
    if(artist.stripe_acct !== null || undefined){
    const deleted = await stripe.accounts.del(
        artist.stripe_acct
      );
    }
    if(user.cus_id !== null || undefined){
      const deletedCus = await stripe.customers.del(
        user.cus_id
      );
    }
    const concertDelete = await Concert.deleteMany({artId: artist.id})
    const deleteUser = await User.findByIdAndDelete(userID)
    const deleteArtist = await Artist.findByIdAndDelete(artist.id)}
    res.cookie('vt', '', { maxAge: 1 })
    res.cookie('id', '', { maxAge: 1 })
    req.flash('slo', 'successfully deleted account')
    return res.redirect('/posts')
})

    
    


module.exports = router