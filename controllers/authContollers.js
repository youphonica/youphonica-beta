require('dotenv').config()


const express = require("express")
const methodOverride = require('method-override')
const path = require('path')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const Joi = require('joi')
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer  = require('multer')
const multerS3  = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const { getMaxListeners } = require('process');
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const mongoSanitize = require('express-mongo-sanitize');
const puppeteer = require('puppeteer');
const { v4: uuid } = require('uuid');
uuid(); 



const Concert = require('../models/post')
const Artist = require('../models/artist')
const Audio = require('../models/audio')
const User = require('../models/user')
const Refund = require('../models/refund')
const posts = require('../routes/posts')
const ChatMsg = require('../models/chat')
const Notifications = require('../models/notifications')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authorize, checkUser } = require('../middleware/authMiddleware')



const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URI)

    oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})


const maxAge = 1 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'e445_@678u&6oij3knps630(isyjeh', {
    expiresIn: maxAge
    })
}

module.exports.sign_in_get = (req, res) => {
    try{
        if (req.cookies.uid == null || undefined && req.cookies.uid == null || undefined){
            return res.render('sign-in')
        }else{
            return res.redirect('/posts')
        }
    }catch(e){
        console.log(e)
        return res.redirect('/posts')
    }
    }




    module.exports.sign_in_post = async(req, res) => {
        const { email, password } = req.body
        try{
            const user = await User.signIn(email, password)
            const token = createToken(user._id)
            const userId = user.id
            const salt = await bcrypt.genSalt(10)
            const userIdHash = await bcrypt.hash(userId, salt)
            if(user.banned === 'true'){
            req.flash('lus', 'account has been banned')
            return res.redirect('/account/sign-in')
            } 
            res.cookie('uid', token, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
                maxAge: + 1000 * 60 * 60 * 24 * 1 })
            res.cookie('uih', userIdHash, { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
                maxAge: + 1000 * 60 * 60 * 24 * 1})             
            if(req.cookies.url){
            return res.redirect(req.cookies.url)
            }
        }catch(e){
            req.flash('lus', 'incorrect email or password')
            res.redirect('/account/sign-in')
                return
            }
            req.flash('ls', 'successfully logged in!')
            return res.redirect('/posts')
        }
    








//my artist accounts

module.exports.my_accounts_get = async (req, res,) => {
    const id  = req.cookies.uid
    const uih = req.cookies.uih
    try{
    if (id == null || undefined){
        return res.redirect('/account/sign-in')
    }
    if (uih == null || undefined){
        return res.redirect('/account/sign-in')
    }
    jwt.verify(id, 'e445_@678u&6oij3knps630(isyjeh', async (err, decodedToken) => {
        if(err){
        console.log('error for token verification')
        return res.redirect('/account/sign-in')
    }else{
        const user = await User.findById(decodedToken.id)
        if(user == null || undefined){
            return res.redirect('/posts')
        }
        const userID = decodedToken.id
        const artists = await Artist.find({userId: userID})
        if(artists == null || undefined){
            return res.redirect('/account/apply-for-artist-account')
        }
        if(artists.length === 0){
            return res.redirect('/account/apply-for-artist-account')
        }
        const checkUserId = await bcrypt.compare(user.id, uih)
        console.log(checkUserId)
        if(checkUserId === false){
            return res.send('uid has been tampered with')
        }
        var notisFind = await Notifications.find({for: id})
            if(notis > 9){
                var notis = '9+'
            }
        var notis = notisFind.length
        console.log(notis)
        return res.render('userArtists', { user, artists, notis})
    }
    })
    }catch(e){
        return res.redirect('/posts')
    }
}










