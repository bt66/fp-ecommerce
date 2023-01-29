const express = require('express');
const router = express.Router();
const Multer = require("multer");
const Minio = require("minio");
const { route } = require('./profile');
const UploadContentModel = require('../models/uploadContent');
const UserModel = require('../models/user')
const mongoose = require('mongoose');
var path = require('path')



router.get("/getUserContent",async function(req,res) {
    console.log("[GET] :/admin/getUserContent")
    try {
        // find user by id
        console.log(req.query.userId)
        if(req.query.contentId != undefined || "") {
            console.log(req.query.contentId)
            result = await UploadContentModel.find({"userId" : req.query.userId, "_id" : req.query.contentId })
        } else {
            result = await UploadContentModel.find({"userId" : req.query.userId })
        }
        // console.log(result)
        return res.status(200).json(result)
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
})

router.get("/getAllUser",async function(req,res) {
    try {
        // find user by id
        result = await UserModel.find()
        // console.log(result)
        return res.status(200).json(result)
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
})

router.get("/getContent",async function(req,res) {
    try {
        // find user by id
        result = await UploadContentModel.find()
        // console.log(result)
        return res.status(200).json(result)
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
})


// // uploadMetadata
// router.post("/add", async function(req,res) {
//     try {
//         const user = await new UploadContentModel(
//             {
//                 "userId" : req.user.id,
//                 "plan": req.body.plan,
//                 "releaseType": req.body.releaseType,
//                 "songType": req.body.songType,
//                 "title": req.body.title, 
//                 "featuringArtistName": req.body.featuringArtistName,
//                 "trackList": req.body.trackList,
//                 "primaryGenre": req.body.primaryGenre,
//                 "secondaryGenre": req.body.secondaryGenre,
//                 "productionYear": req.body.productionYear,
//                 "language": req.body.language,
//                 "explicitContent": req.body.explicitContent,
//                 "audioFile": req.body.audioFile,
//                 "artWorkFile": req.body.artWorkFile,
//             }
//         )
//         await user.save();
//         return res.status(201).json("Input Data Success");

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send(error);
//     }

// })

// get metadata


module.exports = router;