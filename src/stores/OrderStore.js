import React from 'react';
import { extendObservable } from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
const dateFormat = require('dateformat');

export default class OrderStore {
  constructor(){
    extendObservable(this, {
      products:[],
      currentOrder: {},
      fieldInfo: [],
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
      phone: '',
      deliveryInfo: {},
      credentials: '',
      orderResponse: {}
    });

    this.loadProducts = this.loadProducts.bind(this);
    this.getItemDetails = this.getItemDetails.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  submitOrder() {
    let templateData = [];
    if(this.fieldInfo.length > 0){
      this.fieldInfo.forEach(field =>
        templateData.push({
          templateDataName: field[0].htmlfieldname,
          templateDataValue: field[1]
        })
    );}
    let partnerOrderReference = 1;
    let orderCustomer = {
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      countryCode: this.countryCode,
      email: this.email,
      phone: this.phone
    };
    let items = [
      {
        itemSequenceNumber: 1,
        productID: this.currentOrder.id,
        quantity: this.currentOrder.quantityDefault,
        templateData: templateData
      }];
    let shipments = [{
      shipmentSequenceNumber: 1,
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      countryCode: this.countryCode,
      email: this.email,
      phone: this.phone,
      shippingMethod: this.deliveryInfo.deliveryMethodCode
    }];

    fetch('http://cors-anywhere.herokuapp.com/https://testapi.pfl.com/orders?apikey=136085', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.credentials}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partnerOrderReference: partnerOrderReference,
        orderCustomer: orderCustomer,
        items: items,
        shipments: shipments,
      })
    })
    .then(result => result.json())
    .then(result => this.orderResponse = result)
    .then(result => browserHistory.replace("/ordernumber"));
  }

  loadProducts(username, password) {
    let credentials = btoa(username + ":" + password);
    this.credentials = credentials;
    fetch('http://cors-anywhere.herokuapp.com/https://testapi.pfl.com/products?apikey=136085', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => this.products = result.results.data);
  }

  getItemDetails(productID){
    fetch(`http://cors-anywhere.herokuapp.com/https://testapi.pfl.com/products?id=${productID}&apikey=136085`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic bWluaXByb2plY3Q6UHIhbnQxMjM=',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => this.currentOrder = result.results.data)
    .then(result => browserHistory.replace("/orderdetails"));
  }

}
