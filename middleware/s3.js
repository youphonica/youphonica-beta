require('dotenv').config()
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3')

//aws environment 


const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.ACCESS_SECRET
const region = process.env.REGION
const BucketName = process.env.BUCKET 

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadIMG(file){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: BucketName,
        Body: fileStream,
        key: file.fileName
    }
    return s3.upload(uploadParams).promise()
}

exports.uploadIMG = uploadIMG