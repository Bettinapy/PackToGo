const mongoose = require('mongoose');
const CarrierPost = require('./Carrier_post');
const ShipperPost = require('./Shipper_post');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    carrierId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true
    },
    shipperId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    carrierPostId: {
        type: Schema.Types.ObjectId,
        ref: CarrierPost,
        required: false
    },
    shipperPostId: {
        type: Schema.Types.ObjectId,
        ref: ShipperPost,
        required: false
    },
    parcelContents: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    }
}
    , {
    timestamps: true
})

const Booking = mongoose.model('bookings',BookingSchema);
module.exports = Booking;