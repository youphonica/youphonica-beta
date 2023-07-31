
const express = require("express")
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const AppError = require('../views/AppError')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const Joi = require('joi')
const http = require('http');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
const puppeteer = require('puppeteer'); 
const socketIO = require('socket.io');
const { v4: uuid } = require('uuid');
uuid(); 







app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser('secretData'))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')


const Concert = require('../models/post')
const Audio = require('../models/audio')
const Quote = require('../models/quotes')
const Artists = require('../models/artist')
const User = require('../models/user')
const Notifications = require('../models/notifications')
const posts = require('../routes/posts')
const wrapAsync = require('../utility/catchAsync')
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
    res.locals.sp = req.flash('sp')
    res.locals.pin = req.flash('pin')
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
const { date } = require("joi")



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
    const bucketName = process.env.BUCKET_YOUPHONICA_VIDEOS







  const server = http.createServer(app);
  const io = socketIO(server);



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






const uploadTracks = multer({
    storage: multerS3({
    bucket: bucketName,
    s3:s3,
    key: function(request, file, ab_callback) {
        const newFileName = Date.now() + "-" + file.originalname;
        const fullPath = `tracks/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    },
})
})


const uploadSplitter = multer({
    storage: multerS3({
    bucket: process.env.BUCKET,
    s3:s3,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit the file size if needed
      },
})
})





const uploadChunks = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_TWO,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const uniqueFilename = `${uuid()}_${file.originalname}`;
        cb(null, uniqueFilename);
      },
    }),
  });
  



const uploadTest = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5000000000 },
  }).single('video');








const test = multer({
    storage: multerS3({
    bucket: bucketName,
    s3:s3,
    key: function(request, file, ab_callback) {
        const newFileName = Date.now() + "-" + file.originalname;
        const fullPath = `test-data/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    },
})
})



































//video





router.get('/:id/new/video', async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id)
        const userArtist = artist.userInfo.toString()
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
        const userId  = decodedToken.id
        const user = await User.findById(userId)




    if(artist == null || undefined){
        return res.redirect('/posts')
    }
        

    if(artist.stripe_acct == null || undefined){
        req.flash('pin', 'payment information needed before you can create posts')
        return res.redirect(`/artists/${artist.id}`)
    }



 
    if(artist.banned === 'true'){
        return res.redirect(`/artists/${artist.id}`)
    }

    
    if(artist.isVerified === 'false'){
        return res.redirect(`/artists/${artist.id}`)
    }


    

    if (userArtist === user.id){
        const cookies = req.cookies.cookieSettings
        var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
                return res.render('video-upload', { user, userArtist, artist, id, notis, cookies })
            }else{
        var notis = notisFind.length
        return res.render('video-upload', { user, userArtist, artist, id, notis, cookies })
            }
//     } else{
//     req.flash('na', "you're NOT authorized to do this")
//     return res.redirect('/posts')
   }})
    }catch(e){
    console.dir(e)
    req.flash('na', "you're NOT authorized to do this")
    return res.redirect('/posts')
}
})











  









router.post('/new/video/:id', upload.fields([{ name: 'video', maxCount: 1 }]), async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
            const userId  = decodedToken.id
            const user = await User.findById(userId)
        //subscription handler



        if(artist == null || undefined){
            return res.redirect('/posts')
        }
            
    
        if(artist.stripe_acct == null || undefined){
            req.flash('pin', 'payment information needed before you can create posts')
            return res.redirect(`/artists/${artist.id}`)
        }




        if(artist.banned === 'true'){
            return res.redirect(`/artists/${artist.id}`)
        }
    
        
        if(artist.isVerified === 'false'){
            return res.redirect(`/artists/${artist.id}`)
        }

     

        const allowedCharsTitle = /^[a-zA-Z0-9 _?&()_.',"!-]{5,60}$/
        const allowedCharsDesc = /^[a-zA-Z0-9 &()_.',"!-]{50,350}$/
        const allowedFileTypes =  /(\.mp4|\.AVI|\.MOV|\.WEBM|\.MPEG-4)$/i;
        const priceRegex = /^\d+(.\d{1,2})?$/
        const { id } = req.params
        const artist = await Artist.findById(id)
        const newConcert = new Concert(req.body)
        if(artist.stripe_acct == null || undefined){
            return res.redirect(`/artists/${artist.id}`)
        }
        const userArtist = artist.userId.toString()
        const {title, desc, video, year, month, genre, visibility, price} = req.body
        const validTitle = allowedCharsTitle.test(title)
        const validDesc = allowedCharsDesc.test(desc)
        const validPrice = priceRegex.test(price)
    if (!validTitle){
        return res.redirect('/posts')
    }if (!validDesc){
        return res.redirect('/posts')
    }if (!validPrice){
        return res.redirect('/posts')
    }
   

        console.log(userArtist, userId, user.id)
        if (userArtist === userId){
        console.log('reached concert settings')
        newConcert.artist = artist
        newConcert.artName = artist.artName
        newConcert.artId = artist.id
        newConcert.uploadDate = Date.now()
        newConcert.NOP = 0
        newConcert.revenue = 0
        newConcert.video = 'tbc'
        newConcert.video_key = 'tbc'
        newConcert.stripe_acct = artist.stripe_acct
        newConcert.type = 'video'
        newConcert.rating = 'all ages'
        newConcert.userId = user.id
        newConcert.visibility = 'private'
        newConcert.final_version = 'false'
        newConcert.merchant_country = artist.country
        console.log('about to save concert')
        await newConcert.save()
        console.log('saved concert')
        const updateArtist = await Artist.findByIdAndUpdate(id, {$push: {posts: newConcert}}, { runValidators: true, new: true });
        req.flash('sp', 'post has been successfully created')
        return res.redirect(`/${newConcert._id}/upload-video`)
        }})
        }catch(e){
            console.log(e)
    req.flash('na', "error, please try again")
    return res.redirect('/posts')
            }})

  


























  router.get('/:id/upload-video', async (req, res) => {
    try{
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
            const userId  = decodedToken.id
            const user = await User.findById(userId)
        })
        const { id } = req.params
        const post = await Concert.findById(id)
        if(post == null || undefined){
            return res.redirect('/posts')
        }
        const artistId = post.artId
        const artist = await Artist.findById(artistId)
        if(post == null || undefined){
            return res.redirect('/posts')
        }
    return res.render('add-video', { post, artist })
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
  })















































































// router.post('/test-upload', async (req, res) => {
//     try{
//         uploadTest(req, res, (err) => {
//             if (err) {
//               console.error(err);
//               res.status(500).send('Error uploading file');
//               return;
//             }
//         console.log(req.file)
//             const params = {
//               Bucket: bucketName,
//               Key: req.file.originalname,
//               Body: req.file.buffer,
//               ContentType: req.file.mimetype,
//             };
        
//             const managedUpload = s3.upload(params);
            
//             function uploadProgress() { managedUpload.on('httpUploadProgress', (progress) => {
//                 const uploadedBytes = progress.loaded;
//                 const totalBytes = progress.total;
          
//                 const percentage = Math.round((uploadedBytes / totalBytes) * 100);
//                 console.log('Upload progress:', percentage + '%');
//               });
//             }
          
//             setTimeout(uploadProgress, 1000)
//               managedUpload.send((err, data) => {
//                 if (err) {
//                   console.error(err);
//                   res.status(500).send('Error uploading file');
//                   return;
//                 }
          
//                 res.status(200).send('File uploaded successfully');
//               });
// })}catch(e){
//         return res.send(e)
//     }})




router.post('/test-upload/:id', upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    try{
        const uid = req.cookies.uid
        const { id } = req.params
        const artist = await Artist.findById(id)
        if(uid == null || undefined){
            return res.redirect('/posts')
        }
        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
            if(err){
                console.log('error for token verification')
                return res.redirect('/posts')
            }
            const userId  = decodedToken.id
            const user = await User.findById(userId)
        //subscription handler
        
        if(user == null || undefined){
            return res.redirect('/posts')
        }

        

        if(artist == null || undefined){
            return res.redirect('/posts')
        }
            
       
        if(artist.stripe_acct == null || undefined){
            req.flash('pin', 'payment information needed before you can create posts')
            return res.redirect(`/artists/${artist.id}`)
        }
    
    
    
     
        if(artist.banned === 'true'){
            return res.redirect(`/artists/${artist.id}`)
        }
    
        
        if(artist.isVerified === 'false'){
            return res.redirect(`/artists/${artist.id}`)
        }

    
       
    
    const file = req.files.file[0];
  
    console.log('file', file)
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: 'fantastico',
      ACL: 'private'
    };
  
    const options = {
      partSize: 5 * 1024 * 1024, // 5 MB
      queueSize: 1
    };
  
    const s3Stream = s3.upload(params, options);
  
    s3Stream.on('httpUploadProgress', (progress) => {
      console.log('Upload progress:', progress);
      io.emit('uploadProgress', { progress: 'processing...' });
    });
  
    s3Stream.send((err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      console.log('File upload complete:', data.Location);
      res.status(200).send(data.Location);
    
      
    });
    const { id } = req.params
    const newConcert = new Concert()
    newConcert.artist = artist
    newConcert.artName = artist.artName
    newConcert.artId = artist.id
    newConcert.uploadDate = Date.now()
    newConcert.NOP = 0
    newConcert.revenue = 0
    newConcert.title = file.originalname
    newConcert.desc = 'add description'
    newConcert.price = 1
    newConcert.video = file.location
    newConcert.video_key = file.key
    newConcert.stripe_acct = artist.stripe_acct
    newConcert.type = 'video'
    newConcert.genre = 'tbc'
    newConcert.rating = 'all ages'
    newConcert.userId = user.id
    newConcert.year = 2023
    newConcert.visibility = 'private'
    newConcert.merchant_country = artist.country

    await newConcert.save()
  
    const updateArtist = await Artist.findByIdAndUpdate(id, {$push: {posts: newConcert}}, { runValidators: true, new: true });
    const updateVideo = await Concert.findByIdAndUpdate(id, { video: file.location}, { runValidators: true, new: true })
    const updateVideoKey = await Concert.findByIdAndUpdate(id, { video_key: file.key}, { runValidators: true, new: true })

console.log('uploaded to db')
    const savedVideoDetails = {
        videoURL: file.location,
        title: 'Uploaded Video',
        // Other relevant details
      };
      
      // Emit a custom event to notify the client
      io.emit('databaseSaveSuccess', { message: 'Data saved to the database successfully' });

console.log('some random words')
        })}catch(e){
            return res.redirect(`/upload/${artist.id}/new/video`)
        }    
  });
  









            router.get('/:id/new/audio', async (req, res) => {
                try{
                    const { id } = req.params
                    const artist = await Artist.findById(id)
                    const userArtist = artist.userInfo.toString()
                    const uid = req.cookies.uid
                    if(uid == null || undefined){
                        return res.redirect('/posts')
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
                
            
                
                 
                        var notisFind = await Notifications.find({for: id})
                        if(notis > 9){
                            var notis = '9+'
                            return res.render('new-audio', { user, userArtist, artist, id, notis })
                    }
                        var notis = notisFind.length
                        return res.render('new-audio', { user, userArtist, artist, id, notis })
                 }
           
                )}catch(e){
                console.log(e)
                req.flash('na', "you're NOT authorized to do this")
                return res.redirect('/posts')
            }
            })
            







            
            


const audioUploads = uploadTracks.fields([{ name: 'track_1', maxCount: 1 }, { name: 'track_2', maxCount: 1 }, 
{ name: 'track_3', maxCount: 1 }, { name: 'track_4', maxCount: 1 }, { name: 'track_5', maxCount: 1 }, { name: 'track_6', maxCount: 1 },
{ name: 'track_7', maxCount: 1 }, { name: 'track_8', maxCount: 1 }, { name: 'track_9', maxCount: 1 }
,{ name: 'track_10', maxCount: 1 }, { name: 'track_11', maxCount: 1 }, { name: 'track_12', maxCount: 1 }, { name: 'track_13', maxCount: 1 },
{ name: 'track_14', maxCount: 1 }, { name: 'track_15', maxCount: 1 }, { name: 'track_16', maxCount: 1 }, { name: 'track_17', maxCount: 1 },
{ name: 'track_18', maxCount: 1 }, { name: 'track_19', maxCount: 1 }, { name: 'track_20', maxCount: 1 }
,{ name: 'track_21', maxCount: 1 }, { name: 'track_22', maxCount: 1 }, { name: 'track_23', maxCount: 1 },
{ name: 'track_24', maxCount: 1 }, { name: 'track_25', maxCount: 1 },])

router.post('/new/audio/:id', audioUploads, async (req, res) => {
    try{
        const { id } = req.params
        const artist = await Artist.findById(id)
        const userArtist = artist.userInfo.toString()
        const uid = req.cookies.uid
        if(uid == null || undefined){
            return res.redirect('/posts')
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
        if(user.account_sub == '' && user.account_tier == null || undefined && !user.first_artist.includes(artist.id)){
            return res.send('bad no sub')
        }
        //add validation
        const title_underscore = req.body.title.replace(/_/g, " ");

            const newConcert = new Concert(req.body)
            const product = await stripe.products.create({
                name: req.body.title,
                active: true,
    
              });
              const createPrice = await stripe.prices.create({
                unit_amount: newConcert.price*100,
                currency: 'usd',
                product: product.id,
                tax_behavior: 'exclusive'
              });
              const account = await stripe.accounts.retrieve(
                artist.stripe_acct
              );
            newConcert.artist = artist
            newConcert.artName = artist.artName
            newConcert.artId = artist.id
            newConcert.img = artist.banner
            newConcert.uploadDate = Date.now()
            newConcert.NOP = 0
            newConcert.revenue = 0
            newConcert.type = 'audio'
            newConcert.rating = 'all ages'
            newConcert.stripe_product_id = product.id
            newConcert.stripe_price_id = createPrice.id
            newConcert.stripe_acct = artist.stripe_acct
            newConcert.merchant_country = artist.country
            newConcert.userId = user.id
            await newConcert.save()
            const track_1 = new Audio()
            track_1.concert_id = newConcert.id
            track_1.track_name = req.body.track_1_name
            track_1.track_url = req.files.track_1[0].location
            track_1.track_key = req.files.track_1[0].key
            await track_1.save()
            if(req.body.track_2_name === ""){
                return res.redirect(`/posts/${newConcert.id}/edit-thumbnail`)
            }if(req.body.track_2_name !== ""){
            const track_2 = new Audio()
            track_2.concert_id = newConcert.id
            track_2.track_name = req.body.track_2_name
            track_2.track_url = req.files.track_2[0].location
            track_2.track_key = req.files.track_2[0].key
            await track_2.save()
            }if(req.body.track_3_name === ""){
                return res.redirect(`/posts/${newConcert.id}/edit-thumbnail`)
            }
            if(req.body.track_3_name !== ""){
            const track_3 = new Audio()
            track_3.concert_id = newConcert.id
            track_3.track_name = req.body.track_3_name
            track_3.track_url = req.files.track_3[0].location
            track_3.track_key = req.files.track_3[0].key
            await track_3.save()
            }if(req.body.track_4_name === ""){
                return res.redirect(`/posts/${newConcert.id}/edit-thumbnail`)
            }if(req.body.track_4_name !== ""){
            const track_4 = new Audio()
            track_4.concert_id = newConcert.id
            track_4.track_name = req.body.track_4_name
            track_4.track_url = req.files.track_4[0].location
            track_4.track_key = req.files.track_4[0].key
            await track_4.save()
            }if(req.body.track_5_name === ""){
                return res.redirect(`/posts/${newConcert.id}/edit-thumbnail`)
            }if(req.body.track_5_name !== ""){
            const track_5 = new Audio()
            track_5.concert_id = newConcert.id
            track_5.track_name = req.body.track_5_name
            track_5.track_url = req.files.track_5[0].location
            track_5.track_key = req.files.track_5[0].key
            await track_5.save()
            }
            return res.redirect(`/posts/${newConcert.id}/edit-thumbnail`)
   })}catch(e){
    console.dir(e)
    req.flash('na', "you're NOT authorized to do this")
    return res.redirect('/posts')
}})
            
              
              
              
              
              
              
            
            
            
            
            
            
            
            
            
            




            
module.exports = router