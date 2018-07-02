//@flow
import * as React from 'react';

export const API_URL = "https://test-api-2507.esanjo.net/hotels/v1";

type T_loader_props = {
  loading: boolean,
  children: ?React$Element<any>
};

export const Loader = ({loading, children}: T_loader_props) => {
  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"/>
      </div>
    );
  } else {
    return children;
  }
};

type T_fetch_token_state = {
  token: string,
  loading: boolean
};

type T_fetch_token_props = {
  children: (token: string) => React$Element<any>
};

export class FetchToken extends React.Component <T_fetch_token_props, T_fetch_token_state>{
  state = {
    token: localStorage.getItem("token") || "",
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
