// created by george for shipper-post-back-end 8-12-2020

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipperPostSchema = new Schema({
    shipperId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    parcelContents: {
        type: String,
        required: true
    },
    maxWeight: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const ShipperPost = mongoose.model('shipper_posts',ShipperPostSchema);
module.exports = ShipperPost;
// finished by george for shipper-post-back-end 8-12-2020