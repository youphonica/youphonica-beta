async function Email() {
    try{
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
          const mailOptions = {
            from: process.env.USER,
            to: 'r6tazer@gmail.com',
            subject: 'Virt: test email',
            text: 'we are emailing you in order to test our nodemailer system. virt: bringing concerts to the confort of your own home',
            html: "<b>Hello world?</b>", // html body
        
        } 
    const sentMail = transporter.sendMail(mailOptions)
    return sentMail
    }catch(e){
        console.log(e)
        return e
    }
}

Email().then(sentMail=> console.log('Email successfuly sent', sentMail))
.catch((e) => console.log(e))