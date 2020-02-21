DROP DATABASE IF EXISTS AirBusyBeavers_reviews;

CREATE DATABASE AirBusyBeavers_reviews;

USE AirBusyBeavers_reviews;

CREATE TABLE property (
    property_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (property_id),
    property_name VARCHAR(50) NOT NULL,
    property_address VARCHAR(50) NOT NULL,
    property_maximum_guest INT NOT NULL,
    property_room_type VARCHAR(20) NOT NULL
);

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (user_id),
    user_acct VARCHAR(20) NOT NULL,
    user_photo_url VARCHAR(80),
    joined_date VARCHAR(50) NOT NULL
);

CREATE TABLE review (
    review_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    review_content VARCHAR(500),
    created_at VARCHAR(50) NOT NULL,
    communication_rating INT NOT NULL,
    accuracy_rating INT NOT NULL,
    cleanliness_rating INT NOT NULL,
    checkin_rating INT NOT NULL,
    value_rating INT NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (property_id) REFERENCES property (property_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);





/* run mysql -u root -p < database/schema.sql to 
create database and table 

*** Need to change date type when use true data
*/ 

