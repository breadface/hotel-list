import React, {Component} from 'react';

export const API_URL = "https://test-api-2507.esanjo.net/hotels/v1";

export const Loader = ({loading, children=null}) => {
  if (loading) {
    return <div>Loading....</div>;
  } else {
    return children;
  }
};

export class FetchToken extends Component {
  state = {
    token: localStorage.getItem("token"),
    loading: false
  }

  async componentDidMount(){
    if (!this.state.token) {
      this.setState({loading: true})
      try {
        const response = await fetch('/token');
        const data = await response.json();
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          this.setState({
            loading: true,
            token: data.token
          });
        }
      } catch (e) {
        console.log("Something went wrong", e);
        this.setState({loading: false})
      }
    }
  }

  componentWillUnmount(){
    localStorage.removeItem('token');
  }

  render(){
    return (
      <Loader loading={this.state.loading}>
        {this.props.children(this.state.token)}
      </Loader>
    );
  }
}
