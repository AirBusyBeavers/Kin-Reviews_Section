// NOT WORKING

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const LineInputStream = require("line-input-stream")
const fs = require("fs")
const async = require("async")


const propertySchema = new Schema({
    property_id: {type: Number, required: true},
    property_name: {type: String, required: true},
    property_address: {type: String, required: true},
    property_maximum_guest: {type: Number, required: true},
    property_room_type: {type: String, required: true},
    review: {
        review_id: {
            type: Map,
            of: Number
        },
        user_id: {
            type: Map,
            of: Number
        },
        user_acct: {
            type: Map,
            of: String
        },
        user_photo_url: {
            type: Map,
            of: String
        },
        user_joined_year: {
            type: Map,
            of: Number
        },
        review_content: {
            type: Map,
            of: String
        },
        created_at: {
            type: Map,
            of: String
        },
        communication_rating: {
            type: Map,
            of: Number
        },
        accuracy_rating: {
            type: Map,
            of: Number
        },
        cleanliness_rating: {
            type: Map,
            of: Number
        },
        checkin_rating: {
            type: Map,
            of: Number
        },
        location_rating: {
            type: Map,
            of: Number
        },
        value_rating: {
            type: Map,
            of: Number
        }
    },
});

const PropertyModel = mongoose.model('property', propertySchema);

const stream = LineInputStream(fs.createReadStream("propertyTableMongoData.csv",{ flags: "r" }));

stream.setDelimiter("\n");

mongoose.connection.on("open", function(err, conn) {
    const bulk = PropertyModel.collection.initializeOrderedBullOp();
    const counter = 0;

    stream.on("error", function(err) {
        console.log(err);
    });

    stream.on("line", function(line) {
        async.series(
            [
                function(callback) {
                    const row = line.split(",");
                    const obj = {};
                    bulk.insert(obj);

                    counter++;

                    if (counter % 1000 == 0) {
                        stream.pause();
                        bulk.execute(function(err, result) {
                            if (err) throw err;
                            bulk = PropertyModel.collection.initializeOrderedBullOp();
                            callback();
                        });
                    } else {
                        callback();
                    }
                }
            ],
            function (err) {

            }
        );
    });

    stream.on("end", function() {
        if (counter % 1000 != 0)
            bulk.execute(function(err, result) {
                if (err) throw err;
            });
    });
});


// Reference: https://stackoverflow.com/questions/25054958/save-a-very-big-csv-to-mongodb-using-mongoose