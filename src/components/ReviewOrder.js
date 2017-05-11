import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col, Image, Radio, ListGroup, ListGroupItem } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';
import Template from './Template';

class ReviewOrder extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }

  handleEdit(){
    browserHistory.replace("/orderdetails");
  }

  handleSubmitOrder(){
    this.props.orderStore.submitOrder();
  }


  render(){
    let templateDetails = (
      <div style={{border: '1px solid black', borderRadius: '10px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
        <ListGroup style={{width:'80%', paddingTop:'20px'}}>
          {this.props.orderStore.fieldInfo.map((field, index) =>
            <ListGroupItem key={index}>
              <h4 ><strong>{field[0].fieldname}:</strong> {field[1]}</h4>
            </ListGroupItem>
            )
          }
        </ListGroup>
      </div>
    );

    return(
          <div className="container">
            <h1 className="welcome-header">Review your order details</h1>
            <div style={{border: '1px solid black', borderRadius: '10px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space between', alignItems: 'center', padding:'20px'}}>
              <h3>Product Name: {this.props.orderStore.currentOrder.name}</h3>
              <Image src={this.props.orderStore.currentOrder.imageURL} style={{width:'240px', height:'200px'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {this.props.orderStore.currentOrder.hasTemplate ? templateDetails : ''}
              <div style={{border: '1px solid black', borderRadius: '10px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
                <h3>Shipping Info</h3>
                <ListGroup style={{width:'80%'}}>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.firstName}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.lastName}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.companyName}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.address1}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.address2}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.city}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.state}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.postalCode}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.countryCode}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.email}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>{this.props.orderStore.phone}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Shipped: {this.props.orderStore.deliveryInfo.description}</h4>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Total Price: ${Math.round(this.props.orderStore.deliveryInfo.price * 100)/100}</h4>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
            <Button onClick={this.handleSubmitOrder} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px', marginRight: '20px'}}>Submit Order</Button>
            <Button onClick={this.handleEdit} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Edit Order</Button>
          </div>
    );
  }
}

ReviewOrder.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(ReviewOrder));
