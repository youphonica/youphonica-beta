require('dotenv').config()


const express = require("express")
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const AppError = require('../views/AppError')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const Joi = require('joi')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
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
app.use(express.static( 'public'))
app.set('view engine', 'ejs')

app.use(morgan('tiny'))
// app.use((req, res   ) => {
//     console.log('new request...')
//     // res.send('request recieved')
// })

app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );




const Concert = require('../models/post')
const Artist = require('../models/artist')
const Audio = require('../models/audio')
const User = require('../models/user')
const Refund = require('../models/refund')
const posts = require('../routes/posts')
const Report = require('../models/report')
const ChatMsg = require('../models/chat')
const catchAsync = require('../utility/catchAsync')
const allowedChars = require('../utility/allowedChars')
const { authorize, checkUser } = require('../middleware/authMiddleware')
const Notifications = require('../models/notifications')
const validateLogin = (req, res, next) => {
    if (!req.cookies.id && req.cookies.vt){
    return res.redirect('/account/sign-in')
    }else{
        next()
    }
}



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, 
 useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })


    const accessKeyId = process.env.ACCESS_KEY_YOUPHONICA
    const region = process.env.REGION_YOUPHONICA
    const secretAccessKey = process.env.ACCESS_SECRET_YOUPHONICA
    const bucketName = process.env.BUCKET_YOUPHONICA_IMAGES

//aws environment 
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
})


const s3Uid = uuid()

const s3 = new AWS.S3()

const uploadIMG = multer({
    storage: multerS3({
    bucket: bucketName,
    s3:s3,
    key: function(request, file, ab_callback) {
        const newFileName = Date.now() + "-" + file.originalname;
        const fullPath = `thumbs/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    }
})
})






const stripe = require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router()
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









































router.get('/', catchAsync (async(req, res) => {
    try{
        const { genre } = req.query;
        const { search } = req.query;
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        const dateObject = new Date()
var day = dateObject.getUTCDay()


if(day === 0){
    var day = 'Sunday'
}if(day === 1){
    var day = 'Monday'
}if(day === 2){
    var day = 'Tuesday'
}if(day === 3){
    var day = 'Wednesday'
}if(day === 4){
    var day = 'Thursday'
}if(day === 5){
    var day = 'Friday'
}if(day === 6){
    var day = 'Saturday'
}

console.log(day)

        // if(!clearSearch){
        // console.log('bad 1')
        // return res.redirect('/posts')
        // }

        if(search){
            console.log(search)
        }
        const createToken = (id) => {
            return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
            expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1
            })
        }
        const token = req.cookies.cookieSettings
        jwt.verify(token, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedTokenCookie) => {
            if(err){
                console.log('error!')
            }else{
                console.log(decodedTokenCookie.id)
            }  
        })
        const cookies = req.cookies.cookieSettings
        const priceRange = "all"

        //user checks
        if(uid == null || undefined){
            const Concerts = await Concert.find({}).populate('artist');
                const notis = 0 
                return res.render('home', { Concerts, cookies, posts, priceRange, notis })
        }

        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/account/sign-in')
            }   
        const id = decodedToken.id
        const user = await User.findById(id)
        if(search){
            console.log(search)
            const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
            const clearSearch = allowedChars.test(search)
            if(clearSearch){
                var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
            const Concerts = await Concert.find({ title: {$regex:search}}).populate('artist');
            return res.render('home', { Concerts, cookies, priceRange, notis })
            }else{
            req.query.search = ''
            req.query = ''
            console.log('bad')
            var notis = await Notifications.estimatedDocumentCount({for: id})
            if(notis > 9){
                var notis = '9+'
            }
            const Concerts = await Concert.find().populate('artist');
            return res.render('home', { Concerts, cookies, priceRange, notis })
            }
    }
    if(!genre || genre == 'all'){
        console.log('last')
        var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
        const Concerts = await Concert.find({}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis })
}
})}catch(e){
    console.log('error', e)
var notis = 0
    const Concerts = await Concert.find({}).populate('artist');
    return res.render('home', { Concerts, notis })
}
}))




























router.get('/under-10', catchAsync (async(req, res) => {
    try{
        const { genre } = req.query;
        const { search } = req.query;
        const cookies = req.cookies.cookieSettings
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        if(!clearSearch){
        console.log('bad 1')
        return res.redirect('/posts')
        }
        const createToken = (id) => {
            return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
            expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1
            })
        }
        const token = req.cookies.cookieSettings
        jwt.verify(token, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error!')
            }else{
                console.log(decodedToken.id)
            }  
        })
    const priceRange = 10
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            var notis = 0
            const Concerts = await Concert.find({ genre: genre, price: 0 }).populate('artist')
            return res.render('home', { Concerts, cookies, priceRange, notis })
        }   
    const id = decodedToken.id
    const user = await User.findById(id)
    var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
    console.log(notis)

    if(genre){
        console.log('genre')
        const Concerts = await Concert.find({ genre: genre, price: { $lte: 10 } }).populate('artist')
        return res.render('home', { Concerts, cookies, priceRange })
    }
    if(search){
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        if(clearSearch){
        const Concerts = await Concert.find({ title: {$regex:search}, price: { $lte: 10 }}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis })
        }else{
        req.query.search = ''
        req.query = ''
        console.log('bad')
        const Concerts = await Concert.find({price: { $lte: 10 }}).populate('artist');
        return res.redirect('/posts')
        }
    }
    if(genre && search !== '' || null){
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        console.log('both')
        if(clearSearch){
        const Concerts = await Concert.find({genre: genre}, { price: { $lte: 10 }}, { title: {$regex:search}}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis})
        }else{
            console.log('bad both')
            return res.redirect('/posts')
        }
    }
    if(!genre || genre == 'all'){
        const Concerts = await Concert.find({price: { $lte: 10 }}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis })
}
})}catch(e){
    console.log(e)
    var notis = 0
    const Concerts = await Concert.find({ price: { $lte: 10 }}).populate('artist');
    return res.render('home', { Concerts, cookies, priceRange, notis })
}
}))













router.get('/under-15', catchAsync (async(req, res) => {
    try{
        const { genre } = req.query;
        const { search } = req.query;
        const cookies = req.cookies.cookieSettings
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        if(!clearSearch){
        console.log('bad 1')
        return res.redirect('/posts')
        }
        const createToken = (id) => {
            return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
            expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1
            })
        }
        const token = req.cookies.cookieSettings
        jwt.verify(token, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error!')
            }else{
                console.log(decodedToken.id)
            }  
        })
    const priceRange = 15
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            var notis = 0
            const Concerts = await Concert.find({ genre: genre, price: 0 }).populate('artist')
            return res.render('home', { Concerts, cookies, priceRange, notis })
        }   
    const id = decodedToken.id
    const user = await User.findById(id)
    var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
    console.log(notis)

    if(genre){
        console.log('genre')
        const Concerts = await Concert.find({ genre: genre, price: { $lte: 15 } }).populate('artist')
        return res.render('home', { Concerts, cookies, priceRange, notis })
    }
    if(search){
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        if(clearSearch){
        const Concerts = await Concert.find({ title: {$regex:search}, price: { $lte: 15 }}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis })
        }else{
        req.query.search = ''
        req.query = ''
        console.log('bad')
        const Concerts = await Concert.find({price: { $lte: 15 }}).populate('artist');
        return res.redirect('/posts')
        }
    }
    if(genre && search !== '' || null){
        const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{0,60}$/
        const clearSearch = allowedChars.test(search)
        console.log('both')
        if(clearSearch){
        const Concerts = await Concert.find({genre: genre}, { price: { $lte: 15 }}, { title: {$regex:search}}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis})
        }else{
            console.log('bad both')
            return res.redirect('/posts')
        }
    }
    if(!genre || genre == 'all'){
        const Concerts = await Concert.find({price: { $lte: 15 }}).populate('artist');
        return res.render('home', { Concerts, cookies, priceRange, notis })
}
})}catch(e){
    console.log(e)
    var notis = 0
    const Concerts = await Concert.find({ price: { $lte: 15 }}).populate('artist');
    return res.render('home', { Concerts, cookies, priceRange, notis })
}
}))



















router.get('/:id', async(req, res) => {
    try{
     const { id } = req.params
     const uih = req.cookies.uih
     const uid = req.cookies.uid
     if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
     const concert = await Concert.findById(id).populate('artist')
     if(concert == null || undefined){
        req.flash('pnf', 'post not found')
        return res.redirect('/posts')
     }
     const price = concert.price
     const currency = new Intl.NumberFormat('en-US', 
     { style: 'currency', currency: 'GBP' }).format(price)
     const artist = concert.artist
     const artistId = artist.id
     const concertArtist = await Artist.findById(artistId)
     if(!concert) {
     //    return next(new routerError('page not found', 404))
     req.flash('pnf', 'post not found')
     return res.redirect('/posts')
     }
    if(uid == null || undefined){
        const notis = 0
        return res.render('detailsSO', { concert, currency, notis })
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.render('detailsSO', { concert, currency }) 
            //user is the artist and artist is banned
        }
        const userId = decodedToken.id
        const user = await User.findById(userId)
      
        console.log(userId)


        //artist is user
        if(userId === artistId){
            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
            return res.render('details', { concert, currency, user, notis, artist}) 
        }
        if(userId !== artistId){
            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
            return res.render('details', { concert, currency, user, notis, artist}) 
        }
    })

 }catch(e){
    console.log(e)
    req.flash('pnf', 'post not found')
    return res.redirect('/posts')

 }
 })





















//editing

router.get('/:id/edit', async(req, res) => {
 try{
    const { id } = req.params
    const concert = await Concert.findById(id).populate('artist')
    const concertArtist = concert.artist.userId
    const artistId = concert.artId
    const artist = await Artist.findById(artistId)
    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/account/sign-in')
        }
    const userId = decodedToken.id
    const user = await User.findById(userId)
    if(!user || user == undefined || null){
    return res.redirect('/account/sign-in')
    }
    if (artist.banned === 'true' || artist.isVerified === 'false'){
            return res.redirect('/posts')
    }
   if (user && concertArtist === user.id && artist.banned === 'false'){
    var notisFind = await Notifications.find({for: id})
    if(notis > 9){
        var notis = '9+'
    }
var notis = notisFind.length
        return res.render('edit', {concert, concertArtist, user, notis})
   }
    if(!concert) {
        //    return next(new routerError('page not found', 404))
            res.redirect('/posts')
        }else
        req.flash('na', "you're not authorized to view this page")
   return res.redirect('/posts')
    })
    }catch(e){
        console.log(e)
        res.redirect('/posts')
    }
})





















router.post('/:id',  async(req, res) => {
    try{
    const { id } = req.params;
    console.log(req.body)
    const concert = await Concert.findById(id).populate('artist')
    const concertArtist = concert.artist.userId
    const artistId = concert.artId
    const artist = await Artist.findById(artistId)
    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/posts')
        }else{
    const userId = decodedToken.id
    const user = await User.findById(userId)
    const allowedCharsTitle = /^[a-zA-Z0-9_? ]{5,60}$/
    const allowedCharsDesc = /^[a-zA-Z0-9_.:? ]{50,350}$/
    const allowedFileTypes =  /(\.mp4|\.AVI|\.MOV|\.WEBM|\.MPEG-4)$/i;
    const priceRegex = /^\d+(.\d{1,2})?$/
    const {title, desc, year, month, genre, visibility, price} = req.body
    const validTitle = allowedCharsTitle.test(title)
    const validDesc = allowedCharsDesc.test(desc)
    const validPrice = priceRegex.test(price)
    if (!validTitle){
        return res.redirect('/posts')
    }if (!validDesc){
        return res.redirect('/posts')
    }if (!validPrice){
        return res.redirect('/posts')
    }if(artist.banned === 'true' || artist.iVerified === 'false'){
        return res.redirect('/posts')
    }if (concertArtist === userId && artist.banned === 'false'){
    const concertUpdate = await Concert.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    return res.redirect(`/posts/${concert._id}`)
    }}})
    }catch(e) 
    {
        console.log(e)
    return res.redirect('/posts')
    }
})

















































router.get('/:id/details', async(req, res) => {
    try{
       const { id } = req.params
       const concert = await Concert.findById(id).populate('artist')
       const concertArtist = concert.artist.userId
       const artistId = concert.artId
       const artist = await Artist.findById(artistId)
       const uid = req.cookies.uid
       if(uid == null || undefined){
           return res.redirect('/account/sign-in')
       }
       jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
           if(err){
               console.log('error for token verification')
               return res.redirect('/account/sign-in')
           }
       const userId = decodedToken.id
       const user = await User.findById(userId)
       if(!user || user == undefined || null){
       return res.redirect('/account/sign-in')
       }
       if (artist.banned === 'true' || artist.isVerified === 'false'){
               return res.redirect('/posts')
       }
      if (user && concertArtist === user.id && artist.banned === 'false'){
       var notisFind = await Notifications.find({for: id})
       if(notis > 9){
           var notis = '9+'
       }
   var notis = notisFind.length
           return res.render('new', {concert, concertArtist, user, notis})
      }
       if(!concert) {
           //    return next(new routerError('page not found', 404))
               return res.redirect('/posts')
           }else
           req.flash('na', "you're not authorized to view this page")
      return res.redirect('/posts')
       })
       }catch(e){
           console.log(e)
           return res.redirect('/posts')
       }
   })
   
   

























   router.post('/:id/details', uploadIMG.single('img'), async(req, res) => {
    try{
    const { id } = req.params;
    const concert = await Concert.findById(id).populate('artist')
    const concertArtist = concert.artist.userId
    const artistId = concert.artId
    const artist = await Artist.findById(artistId)
    const allowedFileTypes = /(\.jpg|\.jpeg|\.png)$/i;
    console.log(req.file)
    const fileName = req.file.originalname

    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    if(!allowedFileTypes.exec(fileName)){
        return res.redirect('/posts')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/posts')
        }else{
    const userId = decodedToken.id
    const user = await User.findById(userId)
    const allowedCharsTitle = /^[a-zA-Z0-9_? ]{5,60}$/
    const allowedCharsDesc = /^[a-zA-Z0-9_.:? ]{50,350}$/
    const allowedFileTypes =  /(\.mp4|\.AVI|\.MOV|\.WEBM|\.MPEG-4)$/i;
    const priceRegex = /^\d+(.\d{1,2})?$/
    const {title, desc, year, month, genre, visibility, price} = req.body
    const validTitle = allowedCharsTitle.test(title)
    const validDesc = allowedCharsDesc.test(desc)
    const validPrice = priceRegex.test(price)
    console.log(req.file.location)
    console.log(req.file.key)
    if (!validTitle){
        return res.redirect('/posts')
    }if (!validDesc){
        return res.redirect('/posts')
    }if (!validPrice){
        return res.redirect('/posts')
    }if(artist.banned === 'true' || artist.iVerified === 'false'){
        return res.redirect('/posts')
    }if (concertArtist === userId && artist.banned === 'false'){
    const concertUpdate = await Concert.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    const concertUpdateThumb = await Concert.findByIdAndUpdate(id, {img: req.file.location, img_key: req.file.key}, { runValidators: true, new: true });
    return res.redirect(`/posts/${concert._id}`)
    }}})
    }catch(e) 
    {
        console.log(e)
    return res.redirect('/posts')
    }
})















router.get('/:id/edit-thumbnail', async(req, res) => {
    try{
    const { id } = req.params

    const concert = await Concert.findById(id).populate('artist')
    const concertArtist = concert.artist.userId
    var img = concert.img
    if(img == null || undefined){
        var img = 'none'
    }
    console.log(img)
    const artist = concert.artist
    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    if(concert == null || undefined){
        return res.redirect('/posts')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
    if(err){
        console.log('error for token verification')
        return res.redirect('/posts')
    }
    const id  = decodedToken.id
    const user = await User.findById(id)
   if (concertArtist === user.id && user.id === artist.userId){
        var notisFind = await Notifications.find({for: id})
        if(notis > 9){
            var notis = '9+'
        }
    var notis = notisFind.length
        return res.render('edit-thumb', {concert, concertArtist, user, img, notis})
    }else
        req.flash('na', "you're not authorized to view this page")
        return res.redirect('/posts')
    })
    }catch(e){
        console.log(e)
        req.flash('na', "you're not authorized to view this page")
        return res.redirect('/posts') 
    }})






















router.patch('/:id', uploadIMG.single('img'), async(req, res) => {
    try{
    const { id } = req.params;
    const concert = await Concert.findById(id)
    const allowedFileTypes = /(\.jpg|\.jpeg|\.png)$/i;
    const fileName = req.file.originalname
    const uid = req.cookies.uid
     if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
    if(!allowedFileTypes.exec(fileName)){
        return res.redirect('/posts')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/posts')
        }
    const userId  = decodedToken.id
    const user = await User.findById(userId)
    if(user && concert.userId === user.id){
    console.log(req.file.location)
    console.log(req.file.key)
    const updateThumb = await Concert.findByIdAndUpdate(id, { img: req.file.location}, { runValidators: true, new: true })
    const updateThumbKey = await Concert.findByIdAndUpdate(id, { img_key: req.file.key}, { runValidators: true, new: true })
    req.flash('sp', 'thumbnail updated')
    return res.redirect(`/posts/${concert._id}`)
    }else{
        return res.redirect(`/posts/${concert.id}/edit-thumbnail`) 
    }})
    }catch(e) 
    {
        console.log(e)
        return res.redirect('/posts')
    }
})



































router.get('/:id/delete', async (req, res) => {
    try{
        const { id } = req.params
        const concert = await Concert.findById(id).populate('artist')
        const concertArtist = concert.artist.userInfo.toString()
        const artist = await Artist.findById(concert.artId)
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        console.log(user)
        if(!user || user == undefined || null){
        return res.redirect('/account/sign-in')
        }
        var notisFind = await Notifications.find({for: userId})
        if(notis > 9){
            var notis = '9+'
        }else{
    var notis = notisFind.length
            if (concert && concertArtist === user.id && user.id === artist.userId){
                return res.render('delete-post', { user, artist, concert, notis })
            }else{

                return res.redirect('/posts')
            }}
    })}catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})
































router.delete('/:id', catchAsync (async(req, res) => {
    try{
        const { id } = req.params
        const concert = await Concert.findById(id).populate('artist')
        const concertArtist = concert.artist.userInfo.toString()
        const artist = await Artist.findById(concert.artId)
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.render('artistShowUser', { artist }) 
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        if(!user || user == undefined || null){
        return res.redirect('/account/sign-in')
        }
        if (concert && concertArtist === user.id && user.id === artist.userId){
            const removePost = await Artist.findByIdAndUpdate(artist.id, {$pull: { posts: { id: concert.id } }})
            const deletedConcert = await Concert.findByIdAndDelete(id);
            req.flash('pd', 'post successfully deleted')
            res.redirect('/posts') //make an official page to confirm the deletion of the post
        }
        else{
        req.flash('na', "you're not authorized to do this")
        return res.redirect('/posts')
       }
    })}catch(e){
        req.flash('pnf', 'post could not be found')
        console.log(e)
        return res.redirect('/posts')
    
    }
}))











































//watch routes

router.get('/watch/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const  uid  = req.cookies.uid
        const concert =  await Concert.findById(id)
        const artistId = concert.artId
        const artist = await Artist.findById(artistId)
        
        const concert_id = concert.id
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        if(concert.type === 'audio'){
            return res.redirect(`/posts/listen/${concert.id}`)
        }
        if(concert.video_key == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        if(!user || user == undefined || null){
        return res.redirect('/account/sign-in')
        }
        
        var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
       
            const url = s3.getSignedUrl('getObject', {
                Bucket: process.env.BUCKET_YOUPHONICA_VIDEOS,
                Key: concert.video_key,
                Expires: 1000,
            })  


        return res.render('watch-video', { concert, user, url, notis})
    })}catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})











router.get('/listen/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const  uid  = req.cookies.uid
        const concert =  await Concert.findById(id).populate('tracks')
        const concert_id = concert.id
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        if(!user || user == undefined || null){
        return res.redirect('/account/sign-in')
        }
        let i = 0
        let j = 1
        let k = 1
        // const tracks = concert.tracks
        // console.log(tracks.track_key_5)
        // const tracks_list = [concert.tracks.track_key_1]
        // const tracks = concert.tracks_list
        // while (i < tracks_list.length){
        //     console.log(concert.tracks.track_key_[j])
        //     var track_1 = s3.getSignedUrl('getObject', {
        //         Bucket: process.env.BUCKET_TWO,
        //         Key: concert.tracks.track_key_ + j,
        //         Expires: 10800
        //     })  
        //     console.log(track_number)
        //     console.log(track_1)
        //     i++
        //     j++
        //     k++
        // }

        // const track = s3.getSignedUrl('getObject', {
        //     Bucket: process.env.BUCKET_TWO,
        //     Key: concert.tracks.track_key_1,
        //     Expires: 10800
        // })  
        const Audios = await Audio.find({concert_id: id})
        const concert = await Concert.findById(id)
        console.log(Audios.length)

        var keys = []

        while (i < Audios.length){
            var track_name = Audios[i].track_name
            var track_key = Audios[i].track_key
            var track_num = i
            const track_url = s3.getSignedUrl('getObject', {
                Bucket: process.env.BUCKET_TWO,
                Key: Audios[i].track_key,
                Expires: 700
            })  
                i++
            keys.push({track_name: track_name, track_key: track_key, track_url: track_url, track_num: track_num})
            }

            console.log(keys)

            const track_1 = keys[0]
            // if(tracks[0].track_name !== null || undefined){
            //     const track_
            // }
            
            var notisFind = await Notifications.find({for: userId})
            if(notis > 9){
                var notis = '9+'
        
                return res.render('watch-audio', { concert, user, notis, Audios, keys, track_1}) 
            }else{
    var notis = notisFind.length
      
        return res.render('watch-audio', { concert, user, Audios, keys, notis, track_1})
        //kill me
        // }else {
        //     return res.redirect('/posts')
        // }
    }})
}catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})












































































































































router.get('/:id/report-post', async (req, res) => {
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
        const post = await Concert.findById(id)
        if(post == null || undefined){
            req.flash('pnf', 'post not found')
            return res.redirect('/posts')
        }
        const artId = post.artId
        const artist = await Artist.findById(artId)
        if(user.id === artist.userId){
            return res.redirect('/posts')
        }
        var notisFind = await Notifications.find({for: userId})
        if(notis > 9){
            var notis = '9+'
            return res.render('report-post', { user, artist, post, notis })
        }else{
    var notis = notisFind.length
    return res.render('report-post', { user, artist, post, notis })
    }}
        })
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})








router.post('/:id/report-post', async (req, res) => {
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
        const post = await Concert.findById(id)
        if(post == null || undefined){
            req.flash('pnf', 'post not found')
            return res.redirect('/posts')
        }
        const artId = post.artId
        const artist = await Artist.findById(artId)
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






module.exports = router
