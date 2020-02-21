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
    review: [reviewSchema]
});

const userSchema = new Schema({
    user_id: {type: Number, required: true, unique: true},
    user_acct: String,
    user_photo_url: String,
    joined_year: {type: Number, required: true}
});

const reviewSchema = new Schema({
    review_id: {type: Number, required: true, unique: true},
    user: [userSchema],
    review_content: String,
    created_at: {type: Date, required: true},
    communication_rating: {type: Number, required: true},
    accuracy_rating: {type: Number, required: true},
    cleanliness_rating: {type: Number, required: true},
    checkin_rating: {type: Number, required: true},
    location_rating: {type: Number, required: true},
    value_rating: {type: Number, required: true}
});

// const ReviewModel = mongoose.model('review', reviewSchema);
const UserModel = mongoose.model('user', userSchema);
// const PropertyModel = mongoose.model('property', propertySchema);

async function userSeed(outer, innerOne, innerTwo) {
    let userCounter = 1;
    for (var i=0; i<100; i++) {
        var inputArr = [];
        for (var j=0; j<200; j++) {
            let obj = {
                user_id: userCounter,
                user_acct: faker.lorem.word(),
                user_photo_url: `https://sdcuserphotos.s3.us-west-1.amazonaws.com/${userCounter}.jpg`,
                joined_date: faker.date.between('2018-01-01', '2020-12-31')
            };
            inputArr.push(obj);
            userCounter++;
        }
    }
}



{
    for (var i=0; i<30; i++) {
        var userID = i + 1;
        var userAcct = faker.lorem.word();
        var userPhotoURL = `https://sdcuserphotos.s3.us-west-1.amazonaws.com/${i}.jpg`;
        var joinedYear = faker.random.number({
            'min': 2008,
            'max': 2020
        });

        var user = new UserModel({
            user_id: `${userID}`,
            user_acct: `${userAcct}`,
            user_photo_url: `${userPhotoURL}`,
            joined_year: `${joinedYear}`
        });

        await user
            .save()
            .then(success => {})
            .catch(err => {})
    }
}
userSeed();

// var propertyID = i + 1;
// var propertyName = faker.company.companyName();
// var propertyAddress = `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.state()} ${faker.address.zipCode()} ${faker.address.country()}`;
// var propertyMaximumGuest = faker.random.number({
//     'min': 1,
//     'max': 10
// });
// var propertyRoomType = faker.lorem.word();