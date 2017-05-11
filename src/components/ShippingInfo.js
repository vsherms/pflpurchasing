import React from 'react';
import { inject, observer } from 'mobx-react';

class ShippingInfo extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: '',
      email: '',
      phone: ''
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleAddress1Change = this.handleAddress1Change.bind(this);
    this.handleAddress2Change = this.handleAddress2Change.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.props.orderStore.firstName = e.target.value;
  }

  handleLastNameChange(e) {
    this.props.orderStore.lastName = e.target.value;
  }

  handleCompanyNameChange(e) {
    this.props.orderStore.companyName = e.target.value;
  }

  handleAddress1Change(e) {
    this.props.orderStore.address1 = e.target.value;
  }

  handleAddress2Change(e) {
    this.props.orderStore.address2 = e.target.value;
  }

  handleCityChange(e) {
    this.props.orderStore.city = e.target.value;
  }

  handleStateChange(e) {
    this.props.orderStore.state = e.target.value;
  }

  handlePostalCodeChange(e) {
    this.props.orderStore.postalCode = e.target.value;
  }

  handleCountryCodeChange(e) {
    this.props.orderStore.countryCode = e.target.value;
  }

  handleEmailChange(e) {
    this.props.orderStore.email = e.target.value;
  }

  handlePhoneChange(e) {
    this.props.orderStore.phone = e.target.value;
  }

  render(){
    return(
      <form method="" role="form">
        <div className="form-group" style={{width:'240px'}}>
          <input
            onChange={this.handleFirstNameChange}
            value={this.props.orderStore.firstName}
            type="text"
            className="form-control"
            id="first-name"
            placeholder="First Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleLastNameChange}
            value={this.props.orderStore.lastName}
            type="text"
            className="form-control"
            id="last-name"
            placeholder="Last Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCompanyNameChange}
            value={this.props.orderStore.companyName}
            type="text"
            className="form-control"
            id="company-name"
            placeholder="Company Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleAddress1Change}
            value={this.props.orderStore.address1}
            type="text"
            className="form-control"
            id="address1"
            placeholder="Address 1"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleAddress2Change}
            value={this.props.orderStore.address2}
            type="text"
            className="form-control"
            id="address2"
            placeholder="Address 2"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCityChange}
            value={this.props.orderStore.city}
            type="text"
            className="form-control"
            id="city"
            placeholder="City"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleStateChange}
            value={this.props.orderStore.state}
            type="text"
            className="form-control"
            id="state"
            placeholder="State"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handlePostalCodeChange}
            value={this.props.orderStore.postalCode}
            type="text"
            className="form-control"
            id="postal-code"
            placeholder="Postal Code"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCountryCodeChange}
            value={this.props.orderStore.countryCode}
            type="text"
            className="form-control"
            id="country-code"
            placeholder="Country Code"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleEmailChange}
            value={this.props.orderStore.email}
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handlePhoneChange}
            value={this.props.orderStore.phone}
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone"/>
        </div>
      </form>
    );
  }
}

ShippingInfo.propTypes = {
  orderStore: React.PropTypes.object
};

export default inject('orderStore')(observer(ShippingInfo));
