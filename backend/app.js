const express = require('express')
const app = express()
// require('dotenv').config()
const passport = require('passport');
const port = 3000

var cors = require('cors')


require('./utils/connectToDB')
require('./auth/auth')

const fileRoutes = require('./routes/files');
const authRoutes = require('./routes/main');
const profile = require('./routes/profile');
const content = require('./routes/uploadContent');
const admin = require('./routes/admin');
const storage = require('./routes/getFiles')

app.use(express.json());
app.use(cors())

app.use('/user', authRoutes);
app.use('/file', fileRoutes);
app.use('/storage', storage);
app.use('/profile',passport.authenticate('jwt', { session: false }), profile);
app.use('/content',passport.authenticate('jwt', { session: false }), content);
app.use('/admin', passport.authenticate('jwt', { session: false }), admin);

app.listen(port, () => {
    console.log(`fp ecommarce backend listening on port ${port}`)
})