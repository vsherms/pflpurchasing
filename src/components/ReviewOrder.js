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
  }


  render(){
    let templateDetails = (
      this.props.orderStore.fieldInfo.map((field, index) =>
      <h3 key={index}>{field[0]}: {field[1]}</h3>
    ));

    return(
          <div className="container">
            <h1 className="welcome-header">Review your order details</h1>
            <h3>Price: ${this.props.orderStore.price}</h3>
            <h3>Product Name: {this.props.orderStore.currentOrder.name}</h3>
            <Image src={this.props.orderStore.currentOrder.imageURL} style={{width:'240px', height:'200px'}}/>
            {this.props.orderStore.currentOrder.hasTemplate ? templateDetails : ''}
            <h3>Shipping</h3>
            <Button onClick={this.handleReviewOrder} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Review Order</Button>
          </div>
    );
  }
}

ReviewOrder.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(ReviewOrder));
