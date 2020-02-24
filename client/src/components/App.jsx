/* eslint-disable object-shorthand */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import Pagination from './Pagination.jsx';
import Search from './Search.jsx';
import getPageArray from './getPageArray.js';
import { Body } from '../styles/App.js';
import Div from '../styles/Div.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line comma-dangle
      reviewsByPage: [],
      totalReviews: [],
      currentPage: 0,
      pageArray: [],
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('/api/1')
      .then((response) => {
        console.log(response)
        // shows first 7 comments by default
        this.setState({
          reviewsByPage: response.data.slice(0, 7),
          totalReviews: response.data,
          currentPage: 1,
          pageArray: getPageArray(response.data, 1),
        });
      })
      .catch((error) => {
        console.log('Failed to get reviews from server', error);
      });
  }

  changePage(currentPage) {
    const { totalReviews } = this.state;
    this.setState({
      reviewsByPage: totalReviews.slice((currentPage - 1) * 7, currentPage * 7),
      pageArray: getPageArray(totalReviews, currentPage),
      currentPage: currentPage,
    });
  }

  render() {
    const { reviewsByPage, pageArray, currentPage } = this.state;
    return (
      <div>
        <Body>
          <h1>Reviews</h1>
          {/* <Search /> */}
          <Div margin_top={16}>
            <ReviewsList reviews={reviewsByPage} />
            <Pagination pages={pageArray} changePage={this.changePage} currentPage={currentPage} />
          </Div>
        </Body>
      </div>
    );
  }
}

export default App;
