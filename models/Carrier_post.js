// created by george for post-carrier-model 8-11-2020

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierPostSchema = new Schema({
    carrierId: {
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
    travelDate: {
        type: Date,
        required: true
    },
    transportation: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    // parcelContents: {
    //     type: String,
    //     required: true
    // },
    maxWeight: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const CarrierPost = mongoose.model('carrier_posts',CarrierPostSchema);
module.exports = CarrierPost;
// finished by george for post-carrier-model 8-11-2020