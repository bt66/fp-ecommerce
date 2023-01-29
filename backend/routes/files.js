const express = require('express');
const router = express.Router();
const Multer = require("multer");
const Minio = require("minio");
require('dotenv').config()

var minioClient = new Minio.Client({
    endPoint: '10.10.28.90',
    port: 9000,
    useSSL: false,
    accessKey: 'jJHBYMW5QkffEB0L',
    secretKey: 'rpiqckcb0enlnhI6jujsXcGrTqvmtDqK'
});

router.post('/upload',Multer({storage: Multer.memoryStorage()}).single("upload"), (req, res) => {
    console.log(req.file)
    console.log(req.file.originalname)
    console.log('===========================================')
    console.log(req.file.buffer)
    // res.send('Got a POST request')
    minioClient.putObject("ngetest", req.file.originalname, req.file.buffer, function(error, etag) {
        if(error) {
            return console.log(error);
        }
        res.send(req.file);
    });
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