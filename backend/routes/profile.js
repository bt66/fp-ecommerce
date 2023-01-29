const express = require('express');
const router = express.Router();

router.get("/user", function(req, res) {
    console.log(req.query)
    res.json({
        user: req.user,
        token: req.query.secret_token
    })
});

module.exports = router;