// added by george for user-auth-backend 8-10-2020
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "A user is already registered with that email"})
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    passwordDigest: req.body.password,
                    roleId: req.body.roleId
                })

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.passwordDigest, salt, (err, hash)=>{
                        if (err) throw err;
                        newUser.passwordDigest = hash;
                        newUser.save()
                            .then((user)=>res.json(user))
                            .catch((error)=>res.json(error))
                    })
                })
                
            }
        })
})

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).json({email: "This user does not exist."});
            }

            bcrypt.compare(password, user.passwordDigest)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            handle: user.handle,
                            email: user.email,
                            roleId: user.roleId
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err,token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token 
                                });
                            }
                        )
                    } else {
                        return res.status(400).json({password: "Incorrect password"});
                    }
                })
        })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
      roleId: req.user.roleId
    });
  })

module.exports = router;
// finished by george for user-auth-backend 8-10-2020