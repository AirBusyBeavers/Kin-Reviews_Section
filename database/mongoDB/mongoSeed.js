// NOT WORKING

const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('samplePropertyTableMongoData.csv');

writeUsers.write('property_id,property_name,property_address,property_maximum_guest,property_room_type,review_id,user_id,user_acct,user_photo_url,user_joined_year,review_content,created_at,communication_rating,accuracy_rating,cleanliness_rating,checkin_rating,value_rating\n', 'utf8');

function writeThirtyMillionReviews(writer, encoding, callback) {
    let i = 100;
    let id = 0;
    function write() {
        let ok = true;
        do {
        i -= 1;
        id += 1;
        const property_id = faker.random.number({
            'min': 1,
            'max': 14999999
        });
        const property_name = faker.lorem.word();
        const property_address = faker.address.streetAddress();
        const property_maximum_guest = faker.random.number({
            'min': 1,
            'max': 8
        });
        const property_room_type = faker.lorem.word();
        const review_id = id;
        const user_id = faker.random.number({
            'min': 1,
            'max': 50000000
        });
        const user_acct = faker.lorem.word();
        const range = faker.random.number({
                'min': 1,
                'max': 900
            });
        const user_photo_url = `https://sdcuserphotos.s3.us-west-1.amazonaws.com/${range}.jpg`;
        const user_joined_year = faker.date.between('2018-01-01', '2020-12-31');
        const review_content = faker.lorem.paragraph();
        const created_at = faker.date.past(5);
        const communication_rating = faker.random.number({
            'min': 1,
            'max': 5
        });
        const accuracy_rating = faker.random.number({
            'min': 1,
            'max': 5
        });
        const cleanliness_rating = faker.random.number({
            'min': 1,
            'max': 5
        });
        const checkin_rating = faker.random.number({
            'min': 1,
            'max': 5
        });
        const value_rating = faker.random.number({
            'min': 1,
            'max': 5
        });

    const data = `${property_id},${property_name},${property_address},${property_maximum_guest},${property_room_type},${review_id},${user_id},${user_acct},${user_photo_url},${user_joined_year},${review_content},${created_at},${communication_rating},${accuracy_rating},${cleanliness_rating},${checkin_rating},${value_rating}\n`;
    if (i === 0) {
        writer.write(data, encoding, callback);
    } else {
    // see if we should continue, or wait
    // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early!
    // write some more once it drains
        writer.once('drain', write);
        }
    }
write()
}

writeThirtyMillionReviews(writeUsers, 'utf-8', () => {
    writeUsers.end();
});