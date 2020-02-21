/* eslint-disable no-plusplus */
const faker = require('faker');

// store 100 image url from my aws s3 storage
const url = [];
for (let i = 0; i < 100; i++) {
  url.push(`https://user-photoes.s3-us-west-1.amazonaws.com/${i}.jpg`);
}

// create 5000 dummy data
const data = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    // make random index for user photo url
    const randomIndex = Math.floor(Math.random() * 100);
    // eslint-disable-next-line object-curly-newline
    data.push({ property_id: i, date: `${faker.date.month()} 2019`, name: faker.name.findName(), comments: faker.lorem.sentences(), user_photo: url[randomIndex] });
  }
}

module.exports = data;