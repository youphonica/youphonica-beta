require('dotenv').config()


const express = require("express")
const methodOverride = require('method-override')
const path = require('path')
const AppError = require('./views/AppError')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const Joi = require('joi')
const cookieParser = require('cookie-parser')
const rangeParser = require('range-parser');
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs-extra')
const AWS = require('aws-sdk');
const { getMaxListeners } = require('process');
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const mongoSanitize = require('express-mongo-sanitize');
const jwt = require('jsonwebtoken')
const puppeteer = require('puppeteer');
const http = require('http');
const socketIO = require('socket.io');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { v4: uuid } = require('uuid');
uuid(); 







const Concert = require('./models/post')
const Audio = require('./models/audio')
const Quote = require('./models/quotes')
const Artist = require('./models/artist')
const Refund = require('./models/refund')
const User = require('./models/user')
const ChatMsg = require('./models/chat')
const Watchtime = require('./models/watchtime')
const Feedback = require('./models/feedback')
const Notification = require('./models/notifications')
const postRoutes = require('./routes/posts')
const artistRoutes = require('./routes/artists')
const accountRoutes = require('./routes/account')
const uploadRoutes = require('./routes/upload')
const paymentRoutes = require('./routes/payments')
const catchAsync = require('./utility/catchAsync')
const { authorize, checkUser } = require('./middleware/authMiddleware')
const mongoose = require('mongoose');
const { func } = require("joi")
const { Console } = require('console')



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use(mongoSanitize());





const sessionOptions = {
    name: 'sid',
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //change to secure on deployment
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: + 1000 * 60 * 60 * 24 * 7
    }
}



app.use(session(sessionOptions))
app.use(flash())


app.use((req, res, next) => {
    res.locals.activeUser = req.cookies.uid
    res.locals.sp = req.flash('sp')
    res.locals.saa = req.flash('saa')
    res.locals.ad = req.flash('ad')
    res.locals.search = req.flash('search')
    res.locals.pd = req.flash('pd')
    res.locals.pnf = req.flash('pnf')
    res.locals.postFail = req.flash('postFail')
    res.locals.paynf = req.flash('paynf')
    res.locals.anf = req.flash('anf')
    res.locals.ls = req.flash('ls')
    res.locals.lf = req.flash('lf')
    res.locals.lus = req.flash('lus')
    res.locals.ac = req.flash('ac')
    res.locals.acbc = req.flash('acbc')
    res.locals.pin = req.flash('pin')
    res.locals.eca = req.flash('eca')
    res.locals.error = req.flash('error')
    res.locals.asi = req.flash('asi')
    res.locals.aalr = req.flash('aalr') // artist account limited reached
    res.locals.sir = req.flash('sir')
    res.locals.slo = req.flash('slo')
    res.locals.na = req.flash('na')
    res.locals.ntdaa = req.flash('ntdaa')
    res.locals.ahbb = req.flash('ahbb')
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
//asi = already signed in
//sir = sign in required
//slo = successfully logged out
//na = not authorized


app.use('/posts', postRoutes)
app.use('/artists', artistRoutes)
app.use('/account', accountRoutes)
app.use('/upload', uploadRoutes)
app.use('/pay', paymentRoutes)



const server = http.createServer(app);
const io = socketIO(server);
    

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


//aws environment 
const accessKeyId = process.env.ACCESS_KEY_YOUPHONICA
  const region = process.env.REGION_YOUPHONICA
  const secretAccessKey = process.env.ACCESS_SECRET_YOUPHONICA
  const bucketName = process.env.BUCKET_YOUPHONICA_VIDEOS

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
        const fullPath = `audio/${Date.now()}/` + Date.now() + "-" + file.originalname;
        ab_callback(null, fullPath);
    },
})
})




const stripe = require('stripe')(process.env.STRIPE_SECRET);


const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URI)

    oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})



app.get('/', async (req, res) => {
  return res.render('landing')
})

































//auth NEEDS WORK


app.get('/verify', async (req, res) => {
try{
  const uid = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  const Artists = await Artist.find({})
  return res.render('verify', { Artists })
  }catch(e){
      req.flash('sir', 'nice try lol')
      return res.redirect('/posts')
      console.log(e)
  }
})



app.get('/verify/:id', async (req, res) => {
  const uid = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  try{
      const { id } = req.params
      const artist = await Artist.findById(id)
      return res.render('verify-form', { artist })
  }catch(e){
      return res.redirect('/posts')
      console.log(e)
  }})





















app.patch('/verify/:id', async (req, res) => {
  try{
      const { id } = req.params
      const uid = req.cookies.uid
      if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
      const artist = await Artist.findByIdAndUpdate(id, { isVerified: true }, { runValidators: true, new: true });
      console.log(artist)
      const accessToken = await oauth2client.getAccessToken()

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                pass: process.env.PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
          })
          ejs.renderFile("views/verified-email.ejs",  { artist }, { name: 'test' }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: 'youphonica@gmail.com',
                    to: artist.artEmail,
                    subject: 'test mail',
                    html: data
                };
                console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
}
})
      return res.redirect('/verify')
  }catch(e){
      return res.redirect('/posts')
  }
})














app.get('/ban', async (req, res) => {
try{
  const  uid  = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  const Artists = await Artist.find({})
  const user = req.cookies.id
  return res.render('ban', { Artists })
  }catch(e){
      res.redirect('/posts')
      console.log(e)
  }
})






app.get('/ban-user/:id', async (req,res) => {
  const uid = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  try{
      const { id } = req.params
      const artist = await Artist.findById(id)
      res.render('ban-form', { artist, user})
  }catch(e){
      console.log(e)
}})














app.post('/ban-user/:id', async (req, res) => {
  try{
      const { id } = req.params
      const uid = req.cookies.uid
      if(uid == null || undefined){
        return res.redirect('/account/sign-in')
    }
      const artist = await Artist.findById(id)
      artist.banned = 'true'
      const reason = req.body.reason
      artist.save()
      console.log(artist)
      const accessToken = await oauth2client.getAccessToken()

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                pass: process.env.PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
          })
          ejs.renderFile("views/banned-email.ejs",  { reason, artist }, { name: 'test' }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: 'virtconcerts@gmail.com',
                    to: "r6tazer@gmail.com",
                    subject: 'test mail',
                    html: data
                };
                console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
}
});
      req.flash('ahbb', "account has been banned")
      return res.redirect('/ban')
  if(!user){
     return res.redirect('/sign-in')
  }}catch(e){
      console.log(e)
      return res.redirect('/posts')
  }
})




















app.get('/unban', async (req, res) => {
try{
  const { id } = req.cookies.id
  const { genre } = req.query;
  const { search } = req.query;
  const Artists = await Artist.find({})
  const uid = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  if(genre){
      const Artists = await Artist.find({ genre })
      return res.render('unban', { Artists })
  }
  if(search){
          const Artists = await Artist.find({ title: {$regex:search}});
          return res.render('unban', { Artists })
  }
  if(!search || search == ''){
              const Artists = await Artist.find({})
              return res.render('unban', { Artists })
  }
  if(genre && search){
      const Artists = await Artist.find({ genre })
      return res.render('unban', { Artists })
  }
  if(!genre || genre == 'all'){
      const Artists = await Artist.find({})
      return res.render('unban', { Artists })
  }}catch(e){
     return res.redirect('/posts')
      console.log(e)
  }
})














app.patch('/unban/:id', async (req, res) => {
try{
  const { id } = req.params;
  const uid = req.cookies.uid
  if(uid == null || undefined){
    return res.redirect('/account/sign-in')
}
  const artist = await Artist.findById(id)
  artist.banned = 'false'
  artist.save()
  res.redirect(`/artists${artist._id}`)
  }catch(e){
      console.log(e)
      return res.redirect('/unban')
  }})





app.post('/cookies-refuse', (req, res) => {
  const createToken = (id) => {
    return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1
    })
}
const token = createToken('rejected')
res.cookie('cookieSettings', token, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
  maxAge: + 1000 * 60 * 60 * 24 * 1 })
  jwt.verify(token, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
    if(err){
        return res.redicrect('/account/sign-in')
    }else{
        console.log(decodedToken.id)
    }     
})
return res.redirect('/posts')
})

app.post('/cookies-accept', (req, res) => {
  const createToken = (id) => {
    return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
    expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 1
    })
}
const token = createToken('accepted')
res.cookie('cookieSettings', token, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
  maxAge: + 1000 * 60 * 60 * 24 * 1 })
  jwt.verify(token, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
    if(err){
        return res.redicrect('/account/sign-in')
    }else{
        console.log(decodedToken.id)
    }     
  })
  return res.redirect('/posts')
})





















app.get('/terms', async (req, res) => {
  try{
    const uid = req.cookies.uid
    const cookies = req.cookies.cookieSettings
    if(uid == null || undefined){
      const notis = 0
      return res.render('terms', { notis, cookies })
    }

    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
      if(err){
          console.log('error for token verification')
          return res.redirect('/account/sign-out')
      }   
  const id = decodedToken.id
  const user = await User.findById(id)
  var notisFind = await Notification.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }else{
        var notis = notisFind.length
  return res.render('terms', { notis, cookies, user })
            }
    })
  }catch(e){
    console.log(e)
    return res.redirect('/posts')
  }
})























app.get('/privacy-policy', async (req, res) => {
  try{
    const uid = req.cookies.uid
    const cookies = req.cookies.cookieSettings
    if(uid == null || undefined){
      const notis = 0
      return res.render('privacy-policy', { notis, cookies })
    }

    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
      if(err){
          console.log('error for token verification')
          return res.redirect('/account/sign-out')
      }   
  const id = decodedToken.id
  const user = await User.findById(id)
  var notisFind = await Notification.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }else{
        var notis = notisFind.length
  return res.render('privacy-policy', { notis, user, cookies })
            }
    })
  }catch(e){
    console.log(e)
    return res.redirect('/posts')
  }
})























app.get('/about', async (req, res) => {
  try{
    const uid = req.cookies.uid
    if(uid == null || undefined){
      return res.redirect('/account/sign-in')
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


        if(uid == null || undefined){
          const notis = 0
          return res.render('about', { notis, cookies })
        }

        jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
          if(err){
              console.log('error for token verification')
              return res.redirect('/account/sign-out')
          }   
      const id = decodedToken.id
      const user = await User.findById(id)
      const notis = user.notifications
      return res.render('about', { notis, cookies, user })
      })
  }catch(e){

  }
})







app.get('/terms', async (req, res) => {
  try{
    const uid = req.cookies.uid
    if(uid == null || undefined){
      const notis = 0
      return res.render('terms', { notis })
    }

    jwt.verify(uid, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
      if(err){
          console.log('error for token verification')
          return res.redirect('/account/sign-out')
      }   
  const id = decodedToken.id
  const user = await User.findById(id)
  var notisFind = await Notification.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }else{
        var notis = notisFind.length
  return res.render('terms', { notis, user })
            }
    })
  }catch(e){
    console.log(e)
    return res.redirect('/posts')
  }
})













app.get('/find-newest-post', async (req, res) => {
  try{
    const post = await Concert.findOne().limit(1).sort({$natural:-1})
    return res.redirect(`posts/${post.id}/details`)
  }catch(e){
    console.log(e)
    return res.redirect('/posts')
  }
})





app.get('/video-chunks', async (req, res) => {


  const id = '64c24d7d47514e08fd5f58f6'
  const concert =  await Concert.findById(id)



    const bucketName = process.env.BUCKET_YOUPHONICA_VIDEOS;
    const videoKey = concert.video_key; // Replace with the actual S3 key of your video
  
    try {
      const headObject = await s3.headObject({ Bucket: process.env.BUCKET_YOUPHONICA_VIDEOS, Key: concert.video_key }).promise();
      const videoSize = headObject.ContentLength;
  
      const start = 0;
      const end = videoSize - 1;
      const chunkSize = 100 * 1024 * 1024; // 10 MB chunk size, adjust as needed
  
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(206, headers);
  
      const range = req.headers.range;
      const rangeStart = Number(range.replace(/\D/g, ''));
      const rangeEnd = Math.min(rangeStart + chunkSize - 1, end);
  
      const params = {
        Bucket: bucketName,
        Key: videoKey,
        Range: `bytes=${rangeStart}-${rangeEnd}`,
      };
  
      const videoStream = s3.getObject(params).createReadStream();
  
      videoStream.on('error', (error) => {
        console.error('Error streaming video:', error);
        res.status(500).end();
      });
  

      videoStream.pipe(res);
    
    
  }catch (err) {
    console.error(err);
    res.status(500).end();
}
});










































































//error handling

app.get('/error', (req, res) => {
    throw new Error('an error has occured')
})

//all

app.use((req, res) => {
    res.redirect('/posts')
})

app.use((err, req, res) => {
    res.redirect('/posts')
})

app.use((err, req, res) => {
    res.redirect('/posts')
})

app.get('*', (req, res) => {
    res.redirect('/posts')
})

const PORT = 5000





app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})