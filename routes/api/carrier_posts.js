// added by george for post-carrier-model 8-11-2020
const express = require("express");
const CarrierPost = require("../../models/Carrier_post");
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCarrierPostCreate = require('../../validation/carrier_post_create');
const mongoose = require('mongoose');
const validateCarrierPostUpdate = require('../../validation/carrier_post_update');
const validateBookingCreate = require('../../validation/booking_create');

router.post('/create', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validateCarrierPostCreate(req.body);

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
        //parcelContents: req.body.parcelContents,
        maxWeight: req.body.maxWeight           

    });

    newCarrierPost.save()
        .then(post => res.json(post))
        .catch(errors => res.send(errors));
})

router.put('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateCarrierPostUpdate(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    CarrierPost.findById(req.params.id)
        .then(post => {
            if (post.carrierId.toString() !== req.user.id.toString()) {
                return res.status(401).json({user: "Only the creator of the post can edit it"})
            } else {
                CarrierPost.findByIdAndUpdate(req.params.id, req.body, {new:true})
                    .then(post => {
                        res.json(post)
                    })
                    .catch(err => res.json(err))
            }
        })
        .catch(() => res.status(404).json({error: "Post not found"}))
});

router.get('/', (req, res) => {
    const allPosts = {};
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const newDate = currentDate.toJSON().slice(0, 10);
    const search = JSON.parse(req.query.search);
    const filterOrigin = search["filterOrigin"] || '';
    const filterDestination = search["filterDestination"] || '';
    const filterDate = search["filterDate"] || new Date().toJSON().slice(0, 10);
    const dateBefore = search["dateBefore"] || newDate;
    const formatDateAfter = new Date(filterDate); 
    const formatDateBefore = new Date(dateBefore); 
    CarrierPost.find( 
        {"origin": { "$regex": filterOrigin, "$options": "i" },
         "destination": { "$regex": filterDestination, "$options": "i" },
        "travelDate": { $gte: formatDateAfter, $lt: formatDateBefore}
            })
        .then(posts => {
            posts.forEach(post => {
                allPosts[post.id] = post;
            })
            res.json(allPosts)
        })
        .catch(err => res.json(err))
});

router.get('/:id', (req,res) => {

    CarrierPost.findById(req.params.id)
        .then(post => {
            //postCopy = Object.assign(post);
            //delete postCopy.travelDate;
            //onePost = post;
            //onePost[post.id].travelDate = "hello";
            //delete onePost[post.id].travelDate;
            res.json(post)
        })
        .catch(err => res.json(err))
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    CarrierPost.findById(req.params.id)
        .then(post => {
            if (post.carrierId.toString() !== req.user.id.toString()) {
                return res.status(401).json({user: "Only the creator of the post can delete it"})
            } else {
                CarrierPost.findByIdAndDelete(req.params.id)
                    .then(post => res.json({}))
                    .catch(err => res.json(err))
            }
        })
        .catch(() => res.status(404).json({error: "Post not found"}))

});

router.post('/:id/book', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateBookingCreate(req.body);
    debugger;
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let currentCarrierId;

    CarrierPost.findById(req.params.id)
        .then(post => {

            currentCarrierId = post.carrierId;

            const newBooking = new Booking({
                carrierId: currentCarrierId,
                shipperId: req.user.id,
                carrierPostId: req.params.id,
                parcelContents: req.body.parcelContents,
                phone: req.body.phone        
        
            });
        
            newBooking.save()
                .then(booking => res.json(booking))
                .catch(errors => res.send(errors));
        })
        .catch(errors => res.send(errors));
        
});



// router.get('/user/:id', (req,res) => {
//     const allUsersPosts = {};
//     let selectedUser;
    
//     User.findById(req.params.id)
//         .then(user => {
//             selectedUser = user;
//         })
    
//     //console.log(selectedUser.handle);
    
//     CarrierPost.find({carrierId: selectedUser})
//         .then(posts => {
//             posts.forEach(post => {
//                 allPosts[post.id] = post;
//             })
//             res.json(allPosts)
//         })
//         .catch(err => res.json(err))
// });
router.get('/user/:id', (req, res) => {
    CarrierPost.where({ carrierId: req.params.id })
        .then(posts => res.json(posts))
        .catch(errors => res.json(errors))
});


router.post('/:id/book', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateBookingCreate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    let currentCarrierId;

    CarrierPost.findById(req.params.id)
        .then(post => {
            currentCarrierId = post.carrierId;

            const newBooking = new Booking({
                carrierId: currentCarrierId,
                shipperId: req.user.id,
                carrierPostId: req.params.id,
                parcelContents: req.body.parcelContents,
                phone: req.body.phone        
        
            });
        
            newBooking.save()
                .then(booking => res.json(booking))
                .catch(errors => res.send(errors));
        })
        .catch(errors => res.send(errors));
        
        
    
});





module.exports = router;
