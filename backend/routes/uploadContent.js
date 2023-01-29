const express = require('express');
const router = express.Router();
const Multer = require("multer");
const Minio = require("minio");
const { route } = require('./profile');
const UploadContentModel = require('../models/uploadContent');
const mongoose = require('mongoose');
var path = require('path');
const { findOneAndDelete } = require('../models/uploadContent');
require('dotenv').config()

// console.log(process.env.BACKEND_URL)

var minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});
//  upload and downlaod file

router.post("/add", async function(req,res) {
    try {
        console.log(req.body.tracks)
        // pricing content
        var price;
        if(req.body.plan == "Standard Single"){
            price = 75000*req.body.tracks.length
        }else if(req.body.plan == "PRO Single"){
            price = 95000*req.body.tracks.length
        }else if(req.body.plan == "Standard Album"){
            price = 85000*req.body.tracks.length
        }else if(req.body.plan == "PRO Album"){
            price = 85000*req.body.tracks.length
        }else if(req.body.plan == "Standard Cover"){
            price = 75000*req.body.tracks.length
        }else {
            // pro cover price
            price = 75000*req.body.tracks.length
        }
        console.log(price)
        const user = await new UploadContentModel(
            {
                "userId" : req.user.id,
                "plan": req.body.plan,
                "releaseType": req.body.releaseType,
                "songType": req.body.songType,
                "title": req.body.title, 
                "artistName": req.body.artistName,
                "featuringArtistName": req.body.featuringArtistName,
                "trackList": req.body.trackList,
                "tracks": req.body.tracks,
                "primaryGenre": req.body.primaryGenre,
                "secondaryGenre": req.body.secondaryGenre,
                "productionYear": req.body.productionYear,
                "language": req.body.language,
                "explicitContent": req.body.explicitContent,
                "audioFile": req.body.audioFile,
                "artWorkFile": req.body.artWorkFile,
                "status" : [{
                    "currentStatus": "Submitted",
                    "message": "",
                    "time": Date.now()
                }],
                "payment" : {
                    "paymentStatus": "Unpaid",
                    "totalBill": price
                }
            }
        )
        result = await user.save();
        console.log(result)
        return res.status(200).json({
            "status": "success",
            "message" : "input data success",
            "data" : result
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
})


router.post('/upload',Multer({storage: Multer.memoryStorage()}).single("upload"), (req, res) => {
    // console.log(req.file[0])
    // console.log(req.file)
    // console.log(req.files[3])
    // console.log(req.files.originalname)
    console.log('===========================================')
    // console.log(req.file.buffer)
    // res.send('Got a POST request')
    // console.log(path.extname(req.file.originalname))
    // console.log(new Date().toISOString())
    const fileName = `${new Date().toISOString()+(Math.random() + 1).toString(36).substring(7)+path.extname(req.file.originalname)}`;
    console.log(fileName)
    minioClient.putObject("ngetest", fileName, req.file.buffer, function(error, etag) {
        if(error) {
            return console.log(error);
        }
        // res.send(req.file);
        console.log(etag)
        return res.status(200).json({
            status: 'Upload successfull',
            url: `${process.env.BACKEND_URL}/storage/download/?filename=${fileName}`
        })
    });
    // multiple
    // if (req.files == undefined) {
    //     res.status(500).json({
    //         status: 'failed',
    //         message: 'Error No file selected'
    //     })
    // } else {
    //     let uploadedFiles = [];
        
    //     for (let i = 0; i < req.files.length; i++){
    //         console.log(`loop ke ${i}`)
    //         fileName = `${new Date().toISOString()+i+path.extname(req.files[i].originalname)}`;
    //         uploadedFiles.push(`${fileName}`);
    //         minioClient.putObject("ngetest", fileName, req.files[i].buffer).then((result) => {
    //             console.log(result)
    //             if(i == (2)) {
    //                 res.status(200).json({
    //                     status: 'Upload successfull',
    //                     uploaded: uploadedFiles
    //                 })
    //             }

    //         }).catch((err) => {
    //             res.status(500).json({
    //                 status: 'failed to upload',
    //                 message: err
    //             })
    //         })
    //         // minioClient.putObject("ngetest", fileName, req.files[i].buffer, function(error, etag) {
    //         //     if(error) {
    //         //         return console.log(error);
    //         //     }
    //         //     // res.send(req.file);
    //         //     console.log(etag)
    //         //     uploadedFiles.push(`${fileName}`)
    //         //     if(i == (req.files.length -1)) {
    //         //         return res.status(200).json({
    //         //             status: 'Upload successfull',
    //         //             uploaded: uploadedFiles
    //         //         })
    //         //     }
    //         // });
            
    //     }
    // }
})

// backup multiple upload
// router.post('/upload',Multer({storage: Multer.memoryStorage()}).array("upload",6), (req, res) => {
//     // console.log(req.file[0])
//     console.log(req.files.length)
//     // console.log(req.files[3])
//     // console.log(req.files.originalname)
//     console.log('===========================================')
//     // console.log(req.file.buffer)
//     // res.send('Got a POST request')
//     // console.log(path.extname(req.file.originalname))
//     // console.log(new Date().toISOString())
    
//     // multiple
//     if (req.files == undefined) {
//         res.status(500).json({
//             status: 'failed',
//             message: 'Error No file selected'
//         })
//     } else {
//         let uploadedFiles = [];
        
//         for (let i = 0; i < req.files.length; i++){
//             console.log(`loop ke ${i}`)
//             fileName = `${new Date().toISOString()+i+path.extname(req.files[i].originalname)}`;
//             uploadedFiles.push(`${fileName}`);
//             minioClient.putObject("ngetest", fileName, req.files[i].buffer).then((result) => {
//                 console.log(result)
//                 if(i == (2)) {
//                     res.status(200).json({
//                         status: 'Upload successfull',
//                         uploaded: uploadedFiles
//                     })
//                 }

//             }).catch((err) => {
//                 res.status(500).json({
//                     status: 'failed to upload',
//                     message: err
//                 })
//             })
//             // minioClient.putObject("ngetest", fileName, req.files[i].buffer, function(error, etag) {
//             //     if(error) {
//             //         return console.log(error);
//             //     }
//             //     // res.send(req.file);
//             //     console.log(etag)
//             //     uploadedFiles.push(`${fileName}`)
//             //     if(i == (req.files.length -1)) {
//             //         return res.status(200).json({
//             //             status: 'Upload successfull',
//             //             uploaded: uploadedFiles
//             //         })
//             //     }
//             // });
            
//         }
//     }
// })

// upload image
router.post('/uploadImage',Multer({storage: Multer.memoryStorage()}).single("upload"), (req, res) => {
    console.log(req.file)
    console.log(req.file.originalname)
    console.log('===========================================')
    console.log(req.file.buffer)
    // res.send('Got a POST request')
    console.log(path.extname(req.file.originalname))
    const fileName = `${new Date().toISOString()+(Math.random() + 1).toString(36).substring(7)+path.extname(req.file.originalname)}`;
    minioClient.putObject("images", fileName, req.file.buffer, function(error, etag) {
        if(error) {
            return res.status(500).json({
                status: 'error',
                message : error
            })
        }
        return res.status(200).json({
            status: 'Upload Image successfull',
            url: `${process.env.BACKEND_URL}/storage/getImage?filename=${fileName}`
        })
    });
})

router.get("/getImage", function(req,res) {
    let data;
    console.log(req.query.filename)
    minioClient.getObject("images", `${req.query.filename}`, function(error, stream) {
        if(error) {
            return res.status(500).send(error);
        }else {
            stream.on('data', function(chunk) {
				data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
			})
            stream.on('end', function() {
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.write(data);
				res.end();
			})
        }
    })
})

router.get("/download", function(req, res) {
    console.log(req.query)
    minioClient.getObject("ngetest", req.query.filename, function(error, stream) {
        if(error) {
            return res.status(500).send(error);
        }
        stream.pipe(res);
    });
});

router.get("/getContent",async function(req,res) {
    try {
        // find user by id

        if(req.query.contentId != undefined || "") {
            console.log(req.query.contentId)
            result = await UploadContentModel.find({"userId" : req.user.id, "_id" : req.query.contentId })
        } else {
            result = await UploadContentModel.find({"userId" : req.user.id })
        }
        // console.log(result)
        return res.status(200).json(result)
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
})

router.post('/uploadImage',Multer({storage: Multer.memoryStorage()}).single("upload"), (req, res) => {
    console.log(req.file)
    console.log(req.file.originalname)
    console.log('===========================================')
    console.log(req.file.buffer)
    // res.send('Got a POST request')
    console.log(path.extname(req.file.originalname))
    const fileName = `${new Date().toISOString()+(Math.random() + 1).toString(36).substring(7)+path.extname(req.file.originalname)}`;
    minioClient.putObject("images", fileName, req.file.buffer, function(error, etag) {
        if(error) {
            return res.status(500).json({
                status: 'error',
                message : error
            })
        }
        return res.status(200).json({
            status: 'Upload Image successfull',
            url: `${process.env.BACKEND_URL}/storage/getImage?filename=${fileName}`
        })
    });
})

router.delete("/deleteContent",async function(req,res) {
    try {
        // find user by id
        console.log(req.body.id)
        result = await UploadContentModel.findOneAndDelete({"_id" : req.body.id })
        console.log(result)
        return res.status(200).json(result)
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
})


// get metadata


module.exports = router;