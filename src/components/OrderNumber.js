import React from 'react';
import { inject, observer } from 'mobx-react';

class OrderNumber extends React.Component {
  constructor(){
    super();
  }

  render(){
    let orderNumber = (
      <div>
        <h1 className="welcome-header">Thank you for your order</h1>
        <h1>Your Order Number is: {this.props.orderStore.orderResponse.results.data.orderNumber}</h1>
      </div>
    );
    let errorMessage = (
      <div>
        <h1 className="welcome-header">We are sorry, there was an error in placing your order</h1>
        <h2>Please make sure you filled out all of the fields for your order, correctly</h2>
      </div>
    );

    return(
      <div className="container">
        {!this.props.orderStore.orderResponse.results.errors.length > 0 ? orderNumber : errorMessage}
      </div>

    );
  }
}

OrderNumber.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(OrderNumber));
