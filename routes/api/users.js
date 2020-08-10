// added by george for user routes 8-10-2020
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

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


module.exports = router;
// finished by george for user routes 8-10-2020