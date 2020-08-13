const express = require("express");
const CarrierPost = require("../../models/Carrier_post");
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

//const validateCarrierPostUpdate = require('../../validation/carrier_post_update');
//const validateCarrierPostCreate = require('../../validation/carrier_post_create');

// booking show route
router.get('/:id', (req,res) => {
    
    Booking.findById(req.params.id)
        .then(booking => res.json(booking))
        .catch(errors => res.json(errors))

});

// bookings index route
router.get('/', (req,res) => {
    const allBookings = {}

    Booking.find()
        .then(bookings => {
            bookings.forEach(booking => {
                allBookings[booking.id] = booking;
            })
            res.json(allBookings)
        })
        .catch(errors => res.json(errors))

});

router.get('/shipper/:id', (req,res) => {
    Booking.where({shipperId: req.params.id})
        .then(bookings => res.json(bookings))
        .catch(errors => res.json(errors))
})

router.get('/carrier/:id', (req,res) => {
    Booking.where({carrierId: req.params.id})
        .then(bookings => res.json(bookings))
        .catch(errors => res.json(errors))
})

module.exports = router;
