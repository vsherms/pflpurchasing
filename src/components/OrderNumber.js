import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class OrderNumber extends React.Component {
  constructor(){
    super();
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(){
    browserHistory.replace("/orderdetails");
  }

  render(){
    let orderNumber = (
      <div>
        <h1 className="welcome-header">Thank you for your order!</h1>
        <h1 style={{textAlign:'center', fontFamily: 'Rokkitt', border:'1px solid black', borderRadius:'10px', padding:'40px'}}>
          Your Order Number is:
          <span style={{color:'red'}}> {this.props.orderStore.orderResponse.results.data.orderNumber}</span>
        </h1>
      </div>
    );
    let errorMessage = (
      <div>
        <h1 className="welcome-header">We are sorry, there was an <span style={{color:'red'}}>error</span>!</h1>
          <h1 style={{textAlign:'center', fontFamily: 'Rokkitt', border:'1px solid black', borderRadius:'10px', padding:'40px'}}>
            Please make sure you correctly filled out all of the fields
          </h1>
          <Button onClick={this.handleEdit} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Edit Order</Button>
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
