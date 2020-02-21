const mongoose = require('mongoose');
const faker = require('faker')
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    property_id: {type: Number, required: true, unique: true},
    property_name: {type: String, required: true},
    property_address: {type: String, required: true},
    property_maximum_guest: {type: Number, required: true},
    property_room_type: {type: String, required: true},
    review: [{
        review_id: {type: Number, required: true, unique: true},
        user: {
            user_id: {type: Number, required: true},
            user_acct: String,
            user_photo_url: String,
            joined_year: {type: Number, required: true}
        },
        review_content: String,
        created_at: {type: Date, required: true},
        communication_rating: {type: Number, required: true},
        accuracy_rating: {type: Number, required: true},
        cleanliness_rating: {type: Number, required: true},
        checkin_rating: {type: Number, required: true},
        location_rating: {type: Number, required: true},
        value_rating: {type: Number, required: true}
    }]
});

const PropertyModel = mongoose.model('property', propertySchema);

module.exports = { PropertyModel };