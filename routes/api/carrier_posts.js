// added by george for post-carrier-model 8-11-2020
const express = require("express");
const CarrierPost = require("../../models/Carrier_post");
const User = require("../../models/User");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCarrierPostCreate = require('../../validation/carrier_post_create');
//const validateLoginInput = require('../../validation/login');

router.post('/create', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validateCarrierPostCreate(req.body);

    // User.findOne({id: req.user.id})
    //     .then(user => {
    //         if (!user) {
    //             return res.status(400).json({id: "User not found"})
    //         }
    //     })
    //     .catch(errors => res.send(errors))

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newCarrierPost = new CarrierPost({
        carrierId: req.user.id,
        origin: req.body.origin,
        destination: req.body.destination,
        travelDate: req.body.travelDate,
        transportation: req.body.transportation,
        fee: req.body.fee,
        parcelContents: req.body.parcelContents,
        maxWeight: req.body.maxWeight           

    });

    newCarrierPost.save()
        .then(post => res.json(post))
        .catch(errors => res.send(errors));
})


module.exports = router;
// finished by george for post-carrier-model 8-11-2020