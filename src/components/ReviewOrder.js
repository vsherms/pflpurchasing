import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col, Image, Radio } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';
import Template from './Template';

class ReviewOrder extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(){
    browserHistory.replace("/orderdetails");
  }


  render(){
    let templateDetails = (
      this.props.orderStore.fieldInfo.map((field, index) =>
      <h4 key={index}>{field[0]}: {field[1]}</h4>
    ));

    return(
          <div className="container">
            <h1 className="welcome-header">Review your order details</h1>
            <h3>Price: ${this.props.orderStore.deliveryInfo.price}</h3>
            <h3>Product Name: {this.props.orderStore.currentOrder.name}</h3>
            <Image src={this.props.orderStore.currentOrder.imageURL} style={{width:'240px', height:'200px'}}/>
            {this.props.orderStore.currentOrder.hasTemplate ? templateDetails : ''}
            <h3>Shipping Info</h3>
            <h4>{this.props.orderStore.deliveryInfo.description}</h4>
            <h4>{this.props.orderStore.firstName}</h4>
            <h4>{this.props.orderStore.lastName}</h4>
            <h4>{this.props.orderStore.companyName}</h4>
            <h4>{this.props.orderStore.address1}</h4>
            <h4>{this.props.orderStore.address2}</h4>
            <h4>{this.props.orderStore.city}</h4>
            <h4>{this.props.orderStore.state}</h4>
            <h4>{this.props.orderStore.postalCode}</h4>
            <h4>{this.props.orderStore.countryCode}</h4>
            <h4>{this.props.orderStore.email}</h4>
            <h4>{this.props.orderStore.phone}</h4>
            <Button onClick={this.handleReviewOrder} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px', marginRight: '20px'}}>Submit Order</Button>
            <Button onClick={this.handleEdit} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Edit Order</Button>
          </div>
    );
  }
}

ReviewOrder.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(ReviewOrder));
