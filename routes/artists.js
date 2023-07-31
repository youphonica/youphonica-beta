
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
const Notifications = require('../models/notifications')
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
    res.locals.pin = req.flash('pin')
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
const e = require("connect-flash")



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
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

const upload = multer({
    storage: multerS3({
    bucket: bucketName,
    s3:s3,
    key: function(request, file, ab_callback) {
        const newFileName = Date.now() + "-" + file.originalname;
        const fullPath = `videos/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    },
})
})



const uploadIMG = multer({
    storage: multerS3({
    bucket: bucketName,
    s3:s3,
    key: function(request, file, ab_callback) {
        const newFileName = Date.now() + "-" + file.originalname;
        const fullPath = `artist-thumbs/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    }
})
})



//artist routes

router.get('/', catchAsync (async(req, res) => {
    try{
        const cookies = req.cookies.cookieSettings
        const { search } = req.query;
        const uid = req.cookies.uid
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                const Artists = await Artist.find();
                return res.render('artists', { Artists, cookies })
            }   
        const id = decodedToken.id
        const user = await User.findById(id)
        var notisFind = await Notifications.find({for: id})
        if(notis > 9){
            var notis = '9+'
        }
    var notis = notisFind.length
        console.log(notis)
    if(search){
            const allowedChars = /^[a-zA-Z0-9 _?&()_.',"-]{5,60}$/
            const clearSearch = allowedCharsTitle.test(concertTitle)
            if(clearSearch){
            const Artists = await Artist.find({ artName: {$regex:search}});
            return res.render('artists', { Artists, cookies, notis })
            }
            if(!clearSearch){
                search = ''
                const Artists = await Artist.find();
                return res.render('artists', { Artists, cookies, notis })
                }
    }
    if(!search || search == ''){
                const Artists = await Artist.find({})
                console.log(Artists)
                return res.render('artists', { Artists, cookies, notis })
    }
    })}catch(e){
    console.log(e)
    req.query.search = ''
    const Artists = await Artist.find({})
    const cookies = req.cookies.cookieSettings
    const notis = 0
    console.log(notis)
    return res.render('artists', { Artists, cookies, notis })
}
}))
































router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id).populate('posts')
        if(artist == null || undefined){
            req.flash('pnf', 'account not found')
            return res.redirect('/posts')
         }
        const artistUser = artist.userInfo.toString()
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        if(uid == undefined && artist.banned === 'false' && artist.isVerified === 'true'){
            return res.render('artistShowUser', { artist })
        }
        if(uid == undefined && artist.isVerified === 'false'){
            console.log('no uid, no verify')
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.render('artistShowUser', { artist }) 
                //user is the artist and artist is banned
            }
            const userId = decodedToken.id
            const user = await User.findById(userId)
            console.log(userId)
            const notis = user.notifications
            //is artist and is banned
            if(user === artist.userId && artist.banned === 'true'){
                console.log('jwt, banned')
                return res.render('banned-artist', { artist, userId, user, artistUser, notis})

                //artist is the user but is unverified
            }if(userId === artist.userId && artist.isVerified === 'false'){
                return res.render('artistUnverified', { artist, userId, user, artistUser, notis})

                //user is not the artist and artist is banned
            }if(userId !== artist.userId && artist.banned === 'true'){
                return res.render('banned-artist', { artist, userId, notis})
            }
            if(userId === artist.userId && artist.isVerified === 'true' && artist.banned === 'false'){
                console.log(userId)
                console.log('jwt, owner, verify, no ban')
                return res.render('artistShow', { artist, userId, user, artistUser, notis})
            }

                //not artist and not verified
            if(userId !== artist.userId && artist.isVerified === 'false'){
                console.log(userId)
                console.log('jwt, not owner, no verify')
                return res.redirect('/posts')
            }else{
                console.log('else reached')
                return res.render('artistShowUser', { artist, user, userId, artistUser, notis}) 
            }
        })
    }catch(e){
        req.flash('sir', 'you must be signed in to view this page')
        console.log(e)
        return res.redirect('/account/sign-in')
    }
})


















router.get('/:id/about', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id).populate('posts')
        if(artist == null || undefined){
            req.flash('pnf', 'account not found')
            return res.redirect('/posts')
         }
        const artistUser = artist.userInfo.toString()
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        if(uid == undefined && artist.banned === 'true'){
            console.log('no uih, banned')
            var userId = ''
            return res.render('banned-artist', { artist, userId})
        }
        if(uid == undefined && artist.banned === 'false' && artist.isVerified === 'true'){
            console.log('no uih, not banned, verify')
            var notis = 0
            return res.render('artist-about', { artist, notis })
        }
        if(uid == undefined && artist.isVerified === 'false'){
            console.log('no uid, no verify')
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.render('artist-about', { artist }) 
                //user is the artist and artist is banned
            }
            const userId = decodedToken.id
            const user = await User.findById(userId)
            console.log(userId)

            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }else{
        var notis = notisFind.length
    console.log(notis)
            }

            //is artist and is banned
            if(user === artist.userId && artist.banned === 'true'){
                console.log('jwt, banned')
                return res.render('banned-artist', { artist, notis, userId, user, artistUser,  })

                //artist is the user but is unverified
            }if(userId === artist.userId && artist.isVerified === 'false'){
                return res.render('artistUnverified', { artist, notis, userId, user, artistUser})

                //user is not the artist and artist is banned
            }if(userId !== artist.userId && artist.banned === 'true'){
                return res.render('banned-artist', { artist, notis, userId})
            }
            if(userId === artist.userId && artist.isVerified === 'true' && artist.banned === 'false'){
                console.log(userId)
                console.log('jwt, owner, verify, no ban')
                return res.render('artist-about-owner', { artist, notis, userId, user, artistUser})
            }

                //not artist and not verified
            if(userId !== artist.userId && artist.isVerified === 'false'){
                console.log(userId)
                console.log('jwt, not owner, no verify')
                return res.redirect('/posts')
            }else{
                console.log('else reached')
                return res.render('artist-about', { artist, notis }) 
            }
        })
    }catch(e){
        req.flash('sir', 'you must be signed in to view this page')
        console.log(e)
        return res.redirect('/account/sign-in')
    }
})









































//artist analytcis

router.get('/:id/analytics', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id).populate('posts')
        if(artist == null || undefined){
            req.flash('pnf', 'account not found')
            return res.redirect('/posts')
         }
        const artistUser = artist.userInfo.toString()
        const uid = req.cookies.uid
      
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.render('artistShowUser', { artist }) 
                //user is the artist and artist is banned
            }
        const userId = decodedToken.id
        if(userId !== artist.userId){
            return res.render('sww')
        }
        if(userId === artist.userId && artist.isVerififed === 'false'){
            return res.render('sww')
        }
        if(userId === artist.userId && artist.banned === 'true'){
            return res.render('sww')
        }if(userId === artist.userId && artist.banned === 'false' && artist.isVerififed === 'true'){
            return res.render('artistShow', { artist, userId, user, artistUser,  })
        }
        })}catch(e){
            return res.send(e)
        }})


















































router.post('/follow', async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        if(!user || user == undefined || null){
            //
        }
        console.log('artist id', req.body.artistId)
        const artistId = req.body.artistId
        const artist = await Artist.findById(artistId)
        if(artistId === userId){
           console.log('user is the artist')
        }
        if(artistId !== userId && user.following.includes(artistId)){
        
        artist.followers --
        await artist.save()
        const userSave = await User.findByIdAndUpdate(userId, { $pull: { following: artist.id }}, { runValidators: true, new: true });
        }else{
            artist.followers ++
        await artist.save()
        const userSave = await User.findByIdAndUpdate(userId, {$push: {following: artist}}, { runValidators: true, new: true });
            console.log('now following')
        }
    })}catch(e){

    }
})






















router.post('/', uploadIMG.single('file'), async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/') 
            }
        const userId = decodedToken.id
        const user = await User.findById(userId)
        if(!user || user == undefined || null){
        return res.redirect('/account/sign-in')
        }
        const allowedCharsName = /^[a-zA-Z0-9_? ]{1,35}$/
        const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
        const allowedCharsBio = /^[a-zA-Z0-9_.',"":? ]{50,350}$/
        const allowedFileTypes =    /(\.jpg|\.jpeg|\.png)$/i;
        const { artName, artEmail, bio, link, file } = req.body
        const validName = allowedCharsName.test(artName)
        const validEmail = allowedCharsEmail.test(artEmail)  
        const validBio = allowedCharsBio.test(bio)   
        const validFile = allowedFileTypes.test(file) 
        const fileName = req.file.originalname
        if(!validName){
            return  res.render('sww')
        }if(!validEmail){
            return  res.render('sww')
        }
        if(!validBio){
            return  res.render('sww')
        }if(!allowedFileTypes.exec(fileName)){
            return  res.render('sww')
        }
        const newArtist = new Artist(req.body)
        newArtist.dateCreated = Date.now()
        newArtist.isVerified = 'false'
        newArtist.totalRevenue = 0
        newArtist.number_of_sales = 0
        newArtist.followers = 0
        newArtist.donations = 0
        newArtist.totalDonations = 0
        newArtist.userInfo.push(user) 
        newArtist.userId = decodedToken.id
        newArtist.banner = req.file.location
        newArtist.banner_key = req.file.key
        newArtist.banned = 'false'
        newArtist.moneyFromDonations = 0
        await newArtist.save()
        if(user.first_artist == null || undefined){
        const userSaveFirst = await User.findByIdAndUpdate(userId, { first_artist: newArtist.id}, { runValidators: true, new: true });
        const userSavePush = await User.findByIdAndUpdate(userId, {$push: {artists: newArtist}}, { runValidators: true, new: true });
        }else{
        return res.redirect('/posts')
        }
        req.flash('acs', 'account created! we will notify you if you are verified')
        return res.redirect(`/artists/${newArtist.id}`)
        })
        }catch(e){
        console.log(e)
        return res.render('sww')
        }
    })








router.get('/:id/edit', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id)
        const userArtist = artist.userInfo.toString()
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            const id = decodedToken.id
            const user = await User.findById(id)
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }if (userArtist === id && artist.banned === 'false'){
                var notisFind = await Notifications.find({for: id})
                if(notis > 9){
                    var notis = '9+'
                }
            var notis = notisFind.length
        return res.render('editArtist', { user, userArtist, artist, id, notis})
    } else{
    req.flash('na', "you're NOT authorized to do this")
    return res.redirect('/posts')
    }})
}
    catch(e){
    return res.redirect('/posts')
}
})

router.put('/:id', async(req, res) => {
    try{
        const uid = req.cookies.uid  
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        const allowedCharsName = /^[a-zA-Z0-9_? ]{1,35}$/
        const allowedCharsEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
        const allowedCharsBio = /^[a-zA-Z0-9_.',"":? ]{50,350}$/
        const name = req.body.artName
        const email = req.body.artEmail
        const bio = req.body.bio
        const validName = allowedCharsName.test(name)
        const validEmail = allowedCharsEmail.test(email)  
        const validBio = allowedCharsBio.test(bio)   
        if(!validName){
            return  res.render('sww')
        }if(!validEmail){
            return  res.render('sww')
        }
        if(!validBio){
            return  res.render('sww')
        }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/posts')
        }
        const { id } = req.params;
        const artist = await Artist.findById(id)
        const userArtist = artist.userInfo.toString()
        const userId = decodedToken.id
        const user = await User.findById(userId)
    if (user && userArtist === user.id && artist.banned === 'false' && artist.isVerified === 'true'){
    const artistUpdate = await Artist.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    console.log(artistUpdate)
    const concertAnUp = await Concert.updateMany({ artId: id})
    concertAnUp
    console.log(concertAnUp) 
    }else{
    req.flash('na', "you're NOT authorized to do this")
    return res.redirect('/posts')
    }
    console.log('done')
    return res.redirect(`/artists/${artist.id}`)
})
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})






















router.get('/:id/edit-banner', async(req, res) => {
    try{
    const { id } = req.params
    const artist = await Artist.findById(id)
    const artistUser = artist.userId
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
        if(user && artistUser === user.id){
            var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
        return res.render('edit-banner', {artist, artistUser, user, notis})
        }else{
            req.flash('na', "you're NOT authorized to do this")
            return res.redirect('/posts')
        }
    })
}catch(e){
    req.flash('na', "you're not authorized to view this page")
    return res.redirect('/posts')
}
})













router.patch('/:id', uploadIMG.single('banner'), async(req, res) => {
    try{
    const { id } = req.params;
    const artist = await Artist.findById(id)
    const allowedFileTypes = /(\.jpg|\.jpeg|\.png)$/i;
    console.log(req.file)
    const fileName = req.file.originalname
    const uid = req.cookies.uid
    const artistUser = artist.userId
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    artist.banner = req.file.location
    if(!allowedFileTypes.exec(fileName)){
    return res.redirect(`/artists/${artist.id}/edit-banner`)
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/posts')
        }
        const id  = decodedToken.id
        const user = await User.findById(id)
        if(user && artistUser === user.id){
        const params = {  Bucket: bucketName, Key: artist.banner_key };

        s3.deleteObject(params, function(err, data) {
          if (err) console.log(err, err.stack);  // error
          else     console.log(params);                 // deleted
        });
    artist.banner_key = req.file.key
    await artist.save()
    req.flash('sp', 'banner has been updated')
    return res.redirect(`/artists/${artist._id}`)
    }else{
        req.flash('na', "you're not authorized to view this page")
        return res.redirect('/posts')
    }})
    }catch(e) 
    {
    console.log(e)
    return res.redirect('/posts')
    }
})
































router.get('/:id/stripe-connect/success', async (req, res) =>{
    try{
    
    const { id } = req.params
    const artist = await Artist.findById(id)
    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
            console.log('error for token verification')
            return res.redirect('/') 
        }
    const userId = decodedToken.id
    const user = await User.findById(userId)
const artistUser = artist.userId
    if(userId !== artist.userId){
        return res.redirect('/posts')
    }
        const account = await stripe.accounts.retrieve(
            artist.stripe_acct
          );
        const capabilities = account.capabilities
        if(user.id === artist.userId && capabilities.transfers === 'active' && account.charges_enabled == true && account.tos_acceptance !== null || undefined){
        artist.charges_enabled = true
        artist.transfers = 'active'
        artist.stripe_acct_progress = 'full'
        artist.connect_account_tos_agree = account.tos_acceptance.date
        await artist.save()


        var notisFind = await Notifications.find({for: id})
        if(notis > 9){
            var notis = '9+'
            return res.render('stripe-connect-success', { user, artist, notis })
        }else{
    var notis = notisFind.length
        return res.render('stripe-connect-success', { user, artist, notis })
        }

        }if(user.id === artist.userId && capabilities.transfers !== 'active' && account.charges_enabled == false){
        return res.send('reauth')
        }else{
        return res.send('error')
        }})
    }catch(e){
        console.log(e)
    }
})






































































router.get('/:id/delete-account', async (req, res) => {
    try{
    const { id } = req.params
    const artist = await Artist.findById(id)
    const uid = req.cookies.uid
    if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
    if(artist == null || undefined){
        return res.redirect('/posts')
    }
    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
    const userId  = decodedToken.id
    const user = await User.findById(userId)
    if(user == null || undefined){
        return res.redirect('/posts')
    }
    if(user.id === artist.userId){
        var notisFind = await Notifications.find({for: id})
        if(notis > 9){
            var notis = '9+'
        }
    var notis = notisFind.length
    return res.render('delete-artist', { artist, user, notis })
    }else{
        return res.redirect('/posts')
    }
    })}catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
})











router.post('/:id/delete-account', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id)
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/account/sign-in')
        }
        if(artist == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
                if(err){
                    console.log('error for token verification')
                    return res.redirect('/posts')
                }
        const userId  = decodedToken.id
        const user = await User.findById(userId)
        if(user == null || undefined){
            return res.redirect('/posts')
        }
        if(user.id !== artist.userId){
            return res.redirect('/posts')
        }
        const userArtist = artist.userId
        if(artist.posts && user.id === artist.userId){
        const deletePosts =  await Concert.deleteMany({artId: artist.id})
        const deleteAccount = await Artist.findByIdAndDelete(artist.id)
           
            req.flash('pnf', 'account successfully deleted :( were sorry to see you go, we hope to see you again soon :)')
            return res.redirect('/posts') //make an official page to confirm the deletion of the post
        }
    })}
    catch(e){
    console.log(e)
    return res.redirect('/posts')
}
})


module.exports = router