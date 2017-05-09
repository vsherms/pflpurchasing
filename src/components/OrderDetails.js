import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col, Image, Radio } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';
import Template from './Template';
import ShippingInfo from './ShippingInfo';

class OrderDetails extends React.Component {
  constructor(){
    super();
    this.state = {
      mailingOptions: 0,

    };
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleReviewOrder = this.handleReviewOrder.bind(this);
  }

  handleRadioClick(e){
    this.setState({mailingOptions: e.target.value});
  }

  handleReviewOrder(){
    this.props.orderStore.deliveryMethodCode = this.props.orderStore.currentOrder.deliveredPrices[this.state.mailingOptions].deliveryMethodCode;
    this.props.orderStore.price = this.props.orderStore.currentOrder.deliveredPrices[this.state.mailingOptions].price;
    browserHistory.replace("/revieworder");
  }

  render(){
    let shippingOptions = (
      this.props.orderStore.currentOrder.deliveredPrices.map((option,index) =>
      <div key={index}>
        <Radio name="mailingOptions" onClick={this.handleRadioClick} value={index} defaultChecked={!index} inline>
        {option.description}
        </Radio>
      </div>
      )
    );

    return(
          <div className="container">
            <h1 className="welcome-header">Please select your order details</h1>
            <h3>Price: ${this.props.orderStore.currentOrder.deliveredPrices[this.state.mailingOptions].price}</h3>
            <h3>Product Name: {this.props.orderStore.currentOrder.name}</h3>
            <Image src={this.props.orderStore.currentOrder.imageURL} style={{width:'240px', height:'200px'}}/>
            {this.props.orderStore.currentOrder.hasTemplate ?
              <Template currentOrder={this.props.orderStore.currentOrder} /> : ''}
            <h3>Shipping Options</h3>
            {shippingOptions}
            <h3>Shipping Info</h3>
            <ShippingInfo/>
            <Button onClick={this.handleReviewOrder} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Review Order</Button>
          </div>
    );
  }
}

OrderDetails.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(OrderDetails));
