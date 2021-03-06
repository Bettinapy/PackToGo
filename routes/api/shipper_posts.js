const express = require("express");
const ShipperPost = require("../../models/Shipper_post");
const User = require("../../models/User");
const Booking = require("../../models/Booking");
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const validateShipperPostCreate = require('../../validation/shipper_post_create');
const validateShipperPostUpdate = require('../../validation/shipper_post_update');


router.post('/create', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validateShipperPostCreate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newShipperPost = new ShipperPost({
        shipperId: req.user.id,
        origin: req.body.origin,
        destination: req.body.destination,
        parcelContents: req.body.parcelContents,
        maxWeight: req.body.maxWeight           
    });

    newShipperPost.save()
        .then(post => res.json(post))
        .catch(errors => res.send(errors));
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validateShipperPostUpdate(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    ShipperPost.findById(req.params.id)
        .then(post => {
            if (post.shipperId.toString() !== req.user.id.toString()) {
                return res.status(401).json({user: "Only the creator of the post can edit it"})
            } else {
                ShipperPost.findByIdAndUpdate(req.params.id, req.body, {new:true})
                    .then(post => res.json(post))
                    .catch(err => res.json(err))
            }
        })
        .catch(() => res.status(404).json({error: "Post not found"}))
});

router.get('/', (req, res) => {
    const allPosts = {};
    const search = JSON.parse(req.query.search);
    const filterOrigin = search["filterOrigin"] || '';
    const filterDestination = search["filterDestination"] || '';
    ShipperPost.find(
        {"origin": { "$regex": filterOrigin, "$options": "i" },
        "destination": { "$regex": filterDestination, "$options": "i" },
        })
        .then(posts => {
            posts.forEach(post => {
                allPosts[post.id] = post;
            })
            res.json(allPosts)
        })
        .catch(err => res.json(err))
});

router.get('/user/:id', (req,res) => {
    ShipperPost.where({shipperId: req.params.id})
        .then(posts => res.json(posts))
        .catch(errors => res.json(errors))
});

router.get('/:id', (req,res) => {
    //const onePost = {};

    ShipperPost.findById(req.params.id)
        .then(post => {
            //onePost[post.id] = post;
            res.json(post)
        })
        .catch(err => res.json(err))
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    ShipperPost.findById(req.params.id)
        .then(post => {
            if (post.shipperId.toString() !== req.user.id.toString()) {
                return res.status(401).json({user: "Only the creator of the post can delete it"})
            } else {
                ShipperPost.findByIdAndDelete(req.params.id)
                    .then(post => res.json({}))
                    .catch(err => res.json(err))
            }
        })
        .catch(() => res.status(404).json({error: "Post not found"}))

});

router.post('/:id/book', passport.authenticate('jwt', { session: false }), (req,res) => {

    let currentShipperId;

    ShipperPost.findById(req.params.id)
        .then(post => {
            currentShipperId = post.shipperId;
            
            const newBooking = new Booking({
                carrierId: req.user.id,
                shipperId: currentShipperId,
                shipperPostId: post.id,
                parcelContents: post.parcelContents
            });
        
            newBooking.save()
                .then(booking => res.json(booking))
                .catch(errors => res.send(errors));
        })
        .catch(errors => res.send(errors));
        
});

module.exports = router;



