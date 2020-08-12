// added by george for post-carrier-model 8-11-2020
const express = require("express");
const CarrierPost = require("../../models/Carrier_post");
const User = require("../../models/User");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateCarrierPostCreate = require('../../validation/carrier_post_create');
const mongoose = require('mongoose');
const validateCarrierPostUpdate = require('../../validation/carrier_post_update');

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
                        const newDate = new Date(post.travelDate);
                        post.travelDate = newDate.getFullYear() + "-" +
                            (newDate.getMonth() + 1) + "-" +
                            (newDate.getDate() + 1);
                        console.log(post.travelDate)
                        res.json(post)
                    })
                    .catch(err => res.json(err))
            }
        })
        .catch(() => res.status(404).json({error: "Post not found"}))
});

router.get('/', (req, res) => {
    const allPosts = {};

    CarrierPost.find()
        .then(posts => {
            posts.forEach(post => {
                allPosts[post.id] = post;
            })
            res.json(allPosts)
        })
        .catch(err => res.json(err))
});

router.get('/:id', (req,res) => {
    //const onePost = {};
    //let postCopy = {};
    //let myDate;

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

router.get('/user/:id', (req,res) => {
    const allUsersPosts = {};
    let selectedUser;
    
    User.findById(req.params.id)
        .then(user => {
            selectedUser = user;
        })
    
    //console.log(selectedUser.handle);
    
    CarrierPost.find({carrierId: selectedUser})
        .then(posts => {
            posts.forEach(post => {
                allPosts[post.id] = post;
            })
            res.json(allPosts)
        })
        .catch(err => res.json(err))
});

module.exports = router;
// finished by george for post-carrier-model 8-11-2020