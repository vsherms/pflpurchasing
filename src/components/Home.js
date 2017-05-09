import React from 'react';
import { Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Products from './Products';

class Home extends React.Component{
  constructor(){
    super();
  }

  componentDidMount() {
    this.props.locationStore.loadProducts(this.props.userStore.pflUser, this.props.userStore.pflPass);
  }

  render(){
    return (
        <div className="container">
          <h2 className="welcome-header">Welcome, {this.props.userStore.firstName}! </h2>
            <Products />
        </div>
    );
  }
}
Home.propTypes={
  userStore: React.PropTypes.object,
  locationStore: React.PropTypes.object
};

export default inject('userStore', 'locationStore')(observer(Home));
