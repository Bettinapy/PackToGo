// added by george for user-auth-backend 8-10-2020
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
//const keys = require("../../config/keys");
const secretOrKey = process.env.secretOrKey ? process.env.secretOrKey : require("../../config/keys").secretOrKey
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req,res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }



    User.findOne({$or: [{handle: req.body.handle},{email: req.body.email}]})
        .then(user => {
            if (user) {
                if (user.email === req.body.email) {
                    return res.status(400).json({email: "A user is already registered with that email"});
                } else { 
                    return res.status(400).json({handle: "A user is already registered with that username"});
                }
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    passwordDigest: req.body.password,
                    role: req.body.role
                })

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.passwordDigest, salt, (err, hash)=>{
                        if (err) throw err;
                        newUser.passwordDigest = hash;
                        newUser.save()
                            .then((user)=>{
                                
                                const payload = {
                                    id: user.id,
                                    handle: user.handle,
                                    email: user.email,
                                    role: user.role }
                                
                                
                                jwt.sign(
                                    payload,
                                    secretOrKey,
                                    {expiresIn: 3600},
                                    (err,token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token 
                                        });
                                    }
                                )

                            })
                            .catch((error)=>res.json(error))
                    })
                })
            }
        })
})

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

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
                            role: user.role
                        }
                        jwt.sign(
                            payload,
                            secretOrKey,
                            {expiresIn: 3600},
                            (err,token) => {
                                res.json({
                                    // payload,
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
      role: req.user.role
    });
  })



router.get('/testquery', (req,res) => {
    User.findOne({$or: [{handle: req.body.handle},{email: req.body.email}]})
        .then(user => {
            if (user) {
                    if (user.email === req.body.email) {
                        return res.status(400).json({email: "A user is already registered with that email"});
                    } else { 
                        return res.status(400).json({handle: "A user is arlready registered with that username"});
                    } }
                    else {
                        return res.status(200).json({allgood: "All good"});
                    }
                })
        })

module.exports = router;
// finished by george for user-auth-backend 8-10-2020