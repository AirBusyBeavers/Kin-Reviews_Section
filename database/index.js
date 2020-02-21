const mysql = require('mysql');
const mysqlConfig = require('./config.js');

// connect to mysql
const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.log('mysql is not connected: ', err);
  } else {
    console.log('mysql is connected');
  }
});

// retrive all sample data in reviews table for API calls.
const getData = (callback) => {
  const query = 'SELECT * from reviews WHERE property_id = 0;';
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
const getAPropertyData = (properties, callback) => {
  var mysql = 'SELECT r.review_id, r.user_id, r.review_content, r.created_at, u.user_acct, u.user_photo_url FROM review r INNER JOIN user u ON r.user_id=u.user_id WHERE r.property_id=?';
  connection.query(mysql, [review.property_id], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results)
    }
  });
};

const updateReviewData = (properties, callback) => {
  var mysql = 'UPDATE u.user_acct, u.user_photo_url, r.created_at, r.review_content FROM review r INNER JOIN user user u';
  connection.query(mysql, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const addReviewData = (review, callback) => {
  var mysql = 'INSERT INTO review (user_id, property_id, review_content, created_at) VALUES (?, ?, ?, ?)';
  connection.query(mysql, [review.user_id, review.property_id, review.review_content, review.created_at], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const deleteReviewData = (review, callback) => {
  var mysql = 'DELETE FROM review WHERE review_id=?';
  connection.query(mysql, [review.review_id], (error, results) => {
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
