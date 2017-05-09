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
    this.setState({firstName: e.target.value});
    this.props.orderStore.firstName = this.state.firstName;
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
    this.props.orderStore.lastName = this.state.lastName;
  }

  handleCompanyNameChange(e) {
    this.setState({companyName: e.target.value});
    this.props.orderStore.companyName = this.state.companyName;
  }

  handleAddress1Change(e) {
    this.setState({address1: e.target.value});
    this.props.orderStore.address1 = this.state.address1;
  }

  handleAddress2Change(e) {
    this.setState({address2: e.target.value});
    this.props.orderStore.address2 = this.state.address2;
  }

  handleCityChange(e) {
    this.setState({city: e.target.value});
    this.props.orderStore.city = this.state.city;
  }

  handleStateChange(e) {
    this.setState({state: e.target.value});
    this.props.orderStore.state = this.state.state;
  }

  handlePostalCodeChange(e) {
    this.setState({postalCode: e.target.value});
    this.props.orderStore.postalCode = this.state.postalCode;
  }

  handleCountryCodeChange(e) {
    this.setState({countryCode: e.target.value});
    this.props.orderStore.countryCode = this.state.countryCode;
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
    this.props.orderStore.email = this.state.email;
  }

  handlePhoneChange(e) {
    this.setState({phone: e.target.value});
    this.props.orderStore.phone = this.state.phone;
  }

  render(){
    return(
      <form method="" role="form">
        <div className="form-group">
          <input
            onChange={this.handleFirstNameChange}
            value={this.state.firstName}
            type="text"
            className="form-control"
            id="first-name"
            placeholder="First Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleLastNameChange}
            value={this.state.lastName}
            type="text"
            className="form-control"
            id="last-name"
            placeholder="Last Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCompanyNameChange}
            value={this.state.companyName}
            type="text"
            className="form-control"
            id="company-name"
            placeholder="Company Name"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleAddress1Change}
            value={this.state.address1}
            type="text"
            className="form-control"
            id="address1"
            placeholder="Address 1"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleAddress2Change}
            value={this.state.address2}
            type="text"
            className="form-control"
            id="address2"
            placeholder="Address 2"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCityChange}
            value={this.state.city}
            type="text"
            className="form-control"
            id="city"
            placeholder="City"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleStateChange}
            value={this.state.state}
            type="text"
            className="form-control"
            id="state"
            placeholder="State"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handlePostalCodeChange}
            value={this.state.postalCode}
            type="text"
            className="form-control"
            id="postal-code"
            placeholder="Postal Code"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleCountryCodeChange}
            value={this.state.countryCode}
            type="text"
            className="form-control"
            id="country-code"
            placeholder="Country Code"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"/>
        </div>
        <div className="form-group">
          <input
            onChange={this.handlePhoneChange}
            value={this.state.phone}
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
