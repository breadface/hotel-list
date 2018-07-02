//@flow

import React, {Component, Fragment} from 'react';
import ScrollView from '../../components/ScrollView';
import HotelList from './HotelList';

type State = {
  hotels: Array<Object>,
  page: number,
  requestSent: boolean,
  hasReachedEnd: boolean
};

type Props = {
  token: string
}

class HotelPage extends Component<Props, State> {
  state = {
    hotels: [],
    page: 0,
    requestSent: false,
    hasReachedEnd: false
  }

  componentDidMount() {
    this.loadListings();
  }

  loadListings = async () => {
    const {page, hotels, requestSent, hasReachedEnd} = this.state;
    if (requestSent || hasReachedEnd) {
      return;
    }

    this.setState({requestSent: true});
    try {
      let headers = {
        Accept: 'application/json, text/javascript',
        'x-api-token': this.props.token
      };
      let response = await fetch(`/list?page=${page+1}&records=8`, {headers});
      let result = await response.json();
      if (result && result.data) {
        this.setState({
          page: page+1,
          requestSent: false,
          hasReachedEnd: result.data.length < 8,
          hotels: [...hotels, ...result.data]
        });
      }
    } catch (e) {
      console.log("Something went wrong", e);
      this.setState({requestSent: false});
    }
  }

  render(){
    const {hotels, requestSent} = this.state;
    return (
      <Fragment>
        <div className="search-summary">
          <div className="average">Over 8,000 booking reviews in Dubai, with an average of rating of 8.</div>
          <div className="places-found">89 places found</div>
          <div>
            <button className="filter-btn">Great Deals</button>
            <button className="filter-btn">Near to Metro</button>
            <button className="filter-btn">5 + Rating</button>
          </div>
        </div>
          <ScrollView
            loading={requestSent}
            loadData={this.loadListings}
          >
            <HotelList list={hotels} />
          </ScrollView>
      </Fragment>
    );
  }
}

export default HotelPage;
