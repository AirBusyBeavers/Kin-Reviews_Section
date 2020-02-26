require('newrelic');

/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const { getData, getAPropertyData, updateReviewData } = require('../database/index.js');
const { getData, getAPropertyData, updateReviewData, addReviewData, deleteReviewData } = require('../database/index.js');

const app = express();
const port = 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// get request response for property_id = 0
app.get('/review', (req, res) => {
  // var review = req.body;
  getData((error, results) => {
    if (error) {
      console.log('error retrive data from reviews table: ', error);
    } else {
      console.log('successfully get data from reviews table!');
      res.send(results);
    }
  });
});

// CRUD for MySQL
app.get('/properties/:property_id/', (req, res) => {
  var property = req.params.property_id;
  getAPropertyData(property, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
});

app.patch('/properties/:property_id/reviews/:review_id/', (req, res) => {
  // console.log(req.body);
  updateReviewData(req, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/properties/:property_id/reviews/', (req, res) => {
  addReviewData(req, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(result);
    }
  });
});

app.delete('/reviews/:review_id', (req, res) => {
  deleteReviewData(req, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
});


// start server on port 3003
app.listen(port, () => console.log(`app listening on port ${port}!`));
