import React from 'react';
import { Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Products from './Products';

class Home extends React.Component{
  constructor(){
    super();
    this.resetStore = this.resetStore.bind(this);
  }

  componentDidMount() {
    this.props.orderStore.loadProducts(this.props.userStore.pflUser, this.props.userStore.pflPass);
    this.resetStore();
  }

  resetStore(){
    this.props.orderStore.currentOrder = {};
    this.props.orderStore.fieldInfo = [];
    this.props.orderStore.firstName = '';
    this.props.orderStore.lastName = '';
    this.props.orderStore.companyName = '';
    this.props.orderStore.address1 = '';
    this.props.orderStore.address2 = '';
    this.props.orderStore.city = '';
    this.props.orderStore.state = '';
    this.props.orderStore.postalCode = '';
    this.props.orderStore.countryCode = '';
    this.props.orderStore.email = '';
    this.props.orderStore.phone = '';
    this.props.orderStore.deliveryInfo = {};
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
  orderStore: React.PropTypes.object
};

export default inject('userStore', 'orderStore')(observer(Home));
