const express = require('express');
const router = express.Router();
const Multer = require("multer");
const Minio = require("minio");
const { route } = require('./profile');
const UploadContentModel = require('../models/uploadContent');
const mongoose = require('mongoose');
var path = require('path')
require('dotenv').config()

// console.log(process.env.BACKEND_URL)

var minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

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


module.exports = router;