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

    const fullObject = {};
    
    Booking.findById(req.params.id)
        //.then(booking => res.json(booking))
        .then(booking => {
            fullObject.id = booking.id;
            fullObject.parcelContents = booking.parcelContents;
            fullObject.carrierId = booking.carrierId;
            fullObject.shipperId = booking.shipperId;
            fullObject.carrierPostId = booking.carrierPostId;
            fullObject.phone = booking.phone;
            User.findById(fullObject.carrierId)
                .then(user => {
                    fullObject.carrierHandle = user.handle;
                    fullObject.carrierEmail = user.email;
                    CarrierPost.findById(fullObject.carrierPostId)
                        .then(post => {
                            fullObject.origin = post.origin;
                            fullObject.destination = post.destination;
                            fullObject.travelDate = post.travelDate;
                            fullObject.transportation = post.transportation;
                            fullObject.fee = post.fee;
                            fullObject.maxWeight = post.maxWeight;
                            res.json(fullObject);
                        })
                })
        })
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
            res.json(allBookings);
        })
        .catch(errors => res.json(errors))

});

router.get('/shipper/:id', (req,res) => {
    Booking.where({shipperId: req.params.id})
        // .then(bookings => res.json(bookings))
        .then(bookings => {
            // let bookingsCopy = Object.assign([], bookings);

            let bookingsArray = bookings.map(booking => {

                let resObject = {};
                // CarrierPost.where({_id: booking.carrierPostId}).then(post => {
                //     console.log(post);
                // })
                CarrierPost.where({ _id: booking.carrierPostId }).then(post => {
                    resObject.travelDate = post[0].travelDate;
                    resObject.bookingId = booking.id;
                    resObject.origin = post[0].origin;
                    resObject.destination = post[0].destination;
                    console.log(post);
                    console.log(resObject);
                    // return resObject;
                })
                return resObject;
            })
            res.json(bookingsArray);
        })
        .catch(errors => res.json(errors))
})

router.get('/carrier/:id', (req,res) => {
    Booking.where({carrierId: req.params.id})
        .then(bookings => res.json(bookings))
        .catch(errors => res.json(errors))
})

module.exports = router;
