//This component shows the details that must be input by user, including the Template data, & shipping info.
// Lines 63-64 are a ternary which invokes a Template component, only if the product has a Template.
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
    this.loadFieldInfo = this.loadFieldInfo.bind(this);
  }

// calls loadFieldInfo method upon loading page.
  componentDidMount(){
    this.loadFieldInfo();
  }

// creates an array in the orderStore which will store all of the Template Field data.
// Fills in blank string for Separator fields.
  loadFieldInfo(){
    let fieldInfo = [];
    this.props.orderStore.currentOrder.templateFields.fieldlist.field.forEach(field =>
    this.props.orderStore.fieldInfo.push([field, '']));
    this.props.orderStore.fieldInfo.forEach(field =>
      {
      if(field[0].type == "SEPARATOR"){
        field[1] = "**********";
      }
    });
  }

// depending on which mailing option is selected, sets the state equal to the index of the deliveredPrices array.
  handleRadioClick(e){
    this.setState({mailingOptions: e.target.value});
  }

// stores the final mailing option and pushes to the ReviewOrder page.
  handleReviewOrder(){
    this.props.orderStore.deliveryInfo = this.props.orderStore.currentOrder.deliveredPrices[this.state.mailingOptions];
    browserHistory.replace("/revieworder");
  }

  render(){
    let shippingOptions = (
      this.props.orderStore.currentOrder.deliveredPrices.map((option,index) =>
      <div key={index} style={{paddingBottom: '20px'}}>
        <Radio name="mailingOptions" onClick={this.handleRadioClick} value={index} defaultChecked={!index} inline>
        {option.description}
        </Radio>
      </div>
      )
    );

    return(
          <div className="container">
            <h1 className="welcome-header">Please Input Your Order Details</h1>
            <div style={{border: '1px solid black', borderRadius: '10px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space between', alignItems: 'center', padding:'20px'}}>
              <h3>{this.props.orderStore.currentOrder.name}</h3>
              <Image src={this.props.orderStore.currentOrder.imageURL} style={{width:'240px', height:'200px'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {this.props.orderStore.currentOrder.hasTemplate && this.props.orderStore.fieldInfo.length > 0 ?
                <Template currentOrder={this.props.orderStore.currentOrder} /> : ''}
              <div style={{border: '1px solid black', borderRadius: '10px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%'}}>
                <h3>Shipping Info</h3>
                  <ShippingInfo/>
              </div>
              <div style={{border: '1px solid black', borderRadius: '10px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'50%'}}>
                <h3>Shipping Options</h3>
                {shippingOptions}
                <h4>Total Price: ${Math.round(this.props.orderStore.currentOrder.deliveredPrices[this.state.mailingOptions].price *100)/100}</h4>
              </div>
            </div>
            <Button onClick={this.handleReviewOrder} bsStyle="primary" style={{marginTop:'20px', marginBottom:'20px'}}>Review Order</Button>
          </div>
    );
  }
}

OrderDetails.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(OrderDetails));
