const mongoose = require('mongoose');
const faker = require('faker');
const PropertyModel = require('./newMongoSchema.js');
require('events').EventEmitter.prototype._maxListeners = 10000;

async function seedMongo(outer, inner) {
    var reviewCounter = 1;
    var reviewArr = [];
    var createUsers = function() {
        for (var k=0; k<faker.random.number({ 'min': 0, 'max': 10 }); k++) {
            const range = faker.random.number({
                'min': 1,
                'max': 1000
            });
            reviewArr.push({
                review_id: reviewCounter,
                user: {
                    user_id: faker.random.number({
                        'min': 1,
                        'max': 50000000
                    }),
                    user_acct: faker.lorem.word(),
                    user_photo_url: `https://sdcuserphotos.s3.us-west-1.amazonaws.com/${range}.jpg`,
                    joined_year: faker.date.between('2018-01-01', '2020-12-31')
                },
                review_content: faker.lorem.paragraph(),
                created_at: faker.date.past(5),
                communication_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                }),
                accuracy_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                }),
                cleanliness_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                }),
                checkin_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                }),
                location_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                }), 
                value_rating: faker.random.number({
                    'min': 1,
                    'max': 5
                })
            });
            reviewCounter += 1;
        }
    }
    let counter = 1;
    for (var i=0; i<outer; i++) {
        let listingsArr = [];
        for (var j=0; j<inner; j++) {
            createUsers();
            let obj = {
                property_id: counter,
                property_name: faker.lorem.word(),
                property_address: faker.address.streetAddress(),
                property_maximum_guest: faker.random.number({
                    'min': 1,
                    'max': 8
                }),
                property_room_type: faker.lorem.word(),
                review: reviewArr
            }
            listingsArr.push(obj);
            counter += 1;
            reviewArr = [];
            if (counter % 10000 === 0) {
                console.log('progress', counter)
            }
        }
        await PropertyModel.PropertyModel.insertMany(listingsArr);
    }
}

// seedMongo(10, 10);
seedMongo(50000, 200);
console.log('...done');
console.time('seed time');
console.timeEnd('seed time');

// Reference: https://medium.com/glitter-guys/hack-reactor-sdc-part-ii-fake-the-millions-26d372e67f80