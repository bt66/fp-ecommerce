const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local');

router.post(
    '/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
        // console.log(req.body)
        res.json({
            message: 'Signup success',
            user: req.user
        })
    }
)

// router.post(
//     '/login',
//     async (req, res, next) => {
//         passport.use(new LocalStrategy(
//             {
//                 usernameField: 'email',
//                 passwordField: 'password'
//             },
//             async (email, password, done) => {
//                 try{
//                     console.log(email)
//                     res.send(email)
//                 }catch(error){
    
//                 }
        
//             }
//         ))
//     }
// )



router.post(
    '/login',
    async (req, res, next) => {
        // console.log(req.body)
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occured')
                        return next(error);
                    }
                    console.log(user)

                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);

                            const body = { id: user._id, email: user.email, role: user.role, username: user.userName};
                            const token = jwt.sign({ user: body}, 'SUDOBASH_APP');

                            return res.json({token,body});
                        }
                    );
                }
                catch(error) {
                    console.log(error)
                    return next(error);
                }
            }
        )(req, res, next);
    }
)

module.exports = router;