// Create sample test data for MySQL - User: 50M, property: 10M, review: 15M

const faker = require('faker');
const fs = require('fs');
/*
// Create 10M of data in CSV file using faker data
const writeUsers = fs.createWriteStream('propertyTableSQLData.csv');

writeUsers.write('property_name,property_address,property_maximum_guest,property_room_type\n', 'utf8');

function writeTenMillionReviews(writer, encoding, callback) {
    let i = 10000000;
    function write() {
        let ok = true;
        do {
        i -= 1;
        const property_name = faker.lorem.word();
        const property_address = faker.address.streetAddress();
        const property_maximum_guest = faker.random.number({
            'min': 1,
            'max': 8
        });
        const property_room_type = faker.lorem.word();

    const data = `${property_name},${property_address},${property_maximum_guest},${property_room_type}\n`;
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

writeTenMillionReviews(writeUsers, 'utf-8', () => {
    writeUsers.end();
});
*/




/*
// Create 50M of data in CSV file using faker data
const writeUsers = fs.createWriteStream('userTableSQLData.csv');

writeUsers.write('user_acct,user_photo_url,joined_date\n', 'utf8');

function writeFiftyMillionReviews(writer, encoding, callback) {
    let i = 50000000;
    function write() {
        let ok = true;
        do {
        i -= 1;
        const user_acct = faker.lorem.word();
        const range = faker.random.number({
            'min': 1,
            'max': 900
        });
        const user_photo_url = `https://sdcuserphotos.s3.us-west-1.amazonaws.com/${range}.jpg`;
        const joined_date = faker.date.between('2018-01-01', '2020-12-31');

    const data = `${user_acct},${user_photo_url},${joined_date}\n`;
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

writeFiftyMillionReviews(writeUsers, 'utf-8', () => {
    writeUsers.end();
});
*/





// Create 15M of data in CSV file using faker data
const writeUsers = fs.createWriteStream('reviewTableSQLData.csv');

writeUsers.write('user_id,property_id,review_content,created_at,communication_rating,accuracy_rating,cleanliness_rating,checkin_rating,value_rating\n', 'utf8');

function writeThirtyMillionReviews(writer, encoding, callback) {
    let i = 15000000;
    let id = 0;
    function write() {
        let ok = true;
        do {
        i -= 1;
        const user_id = faker.random.number({
            'min': 1,
            'max': 50000000
        });
        const property_id = faker.random.number({
            'min': 1,
            'max': 10000000
        });
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

    const data = `${user_id},${property_id},${review_content},${created_at},${communication_rating},${accuracy_rating},${cleanliness_rating},${checkin_rating},${value_rating}\n`;
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


// Reference: https://medium.com/@danielburnsart/writing-a-large-amount-of-data-to-a-csv-file-using-nodes-drain-event-99dcaded99b5

/*
// Enter the following to the command line inside MySQL
LOAD DATA LOCAL INFILE '/mnt/c/Users/hongk/Desktop/hackreactor/SDC/reviews/database/propertyTableSQLData.csv' INTO TABLE property FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (property_name, property_address, property_maximum_guest, property_room_type);

LOAD DATA LOCAL INFILE '/mnt/c/Users/hongk/Desktop/hackreactor/SDC/reviews/database/userTableSQLData.csv' INTO TABLE user FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (user_acct, user_photo_url, joined_date);

LOAD DATA LOCAL INFILE '/mnt/c/Users/hongk/Desktop/hackreactor/SDC/reviews/database/reviewTableSQLData.csv' INTO TABLE review FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (user_id, property_id, review_content, created_at, communication_rating, accuracy_rating, cleanliness_rating, checkin_rating, value_rating);


Reference: https://medium.com/@AviGoom/how-to-import-a-csv-file-into-a-mysql-database-ef8860878a68
Reference: https://www.mysqltutorial.org/import-csv-file-mysql-table/
*/