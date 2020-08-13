const mongoose = require('mongoose');
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
        ref:'carrierPosts',
        required: true
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