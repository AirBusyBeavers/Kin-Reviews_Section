const mysql = require('mysql');
const mysqlConfig = require('./config.js');

// connect to mysql
const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log('mysql is not connected: ', err);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

// retrive all sample data in reviews table for API calls.
const getData = (callback) => {
  const query = 'SELECT * from review';
  connection.query(query, (error, results) => {
  if (error) {
      // console.log('error retrive data from reviews table: ', error);
      callback(error);
    } else {
      // console.log(results);
      callback(null, results);
    }
  });
};


// MySQL get route - get all data needed for the component from databases whose properties_id
const getAPropertyData = (property_id, callback) => {
  var mysql = 'SELECT r.review_id, r.property_id, r.user_id, r.review_content, r.created_at, u.user_acct, u.user_photo_url FROM review r INNER JOIN user u ON r.user_id=u.user_id WHERE r.property_id=?';
  // connection.query(mysql, [review.property_id], (error, results) => {
  connection.query(mysql, property_id, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results)
    }
  });
};

const updateReviewData = (request, callback) => {
  var property_id = request.params.property_id;
  var review_id = request.params.review_id;
  const { user_acct, user_photo_url, created_at, review_content } = request.body;
  console.log(user_acct);
  var mysql = 'UPDATE review r INNER JOIN user u ON r.user_id=u.user_id SET u.user_acct=?, u.user_photo_url=?, r.created_at=?, r.review_content=? WHERE r.property_id=? AND r.review_id=?';
  // var mysql = 'UPDATE u.user_acct, u.user_photo_url, r.created_at, r.review_content FROM review r INNER JOIN user u';
  connection.query(mysql, [user_acct, user_photo_url, created_at, review_content, Number(property_id), Number(review_id)], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const addReviewData = (request, callback) => {
  var property_id = request.params.property_id;
  const { user_id, review_content, created_at, communication_rating, accuracy_rating, cleanliness_rating, checkin_rating, value_rating } = request.body;
  var mysql = 'INSERT INTO review (user_id, property_id, review_content, created_at, communication_rating, accuracy_rating, cleanliness_rating, checkin_rating, value_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(mysql, [user_id, Number(property_id), review_content, created_at, communication_rating, accuracy_rating, cleanliness_rating, checkin_rating, value_rating], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteReviewData = (request, callback) => {
  var mysql = 'DELETE FROM review WHERE review_id=?';
  var review_id = request.params.review_id;
  connection.query(mysql, [review_id], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getData, getAPropertyData, updateReviewData, addReviewData, deleteReviewData
};