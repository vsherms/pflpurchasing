import React from 'react';
import { extendObservable } from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
const dateFormat = require('dateformat');

export default class OrderStore {
  constructor(){
    // Mobx makes possible to store all details here, accessible by any child of the Provider, anywhere within the App.
    // See /src/index.js for Routes & Provider details.
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

//this method makes API GET request to load all products and save response in the OrderStore.
//credentials are assembled, converted to base64, then passed into Authorization header.
//the cors-anwhere.herokuapp.com http prefix solves a CORS issue with javascript headers calling cross-origin
  loadProducts(username, password) {
    let credentials = btoa(username + ":" + password);
    this.credentials = credentials;
    fetch('https://cors-anywhere.herokuapp.com/https://testapi.pfl.com/products?apikey=136085', {
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

//API GET request to get details of specific product. Response is saved as currentOrder.
  getItemDetails(productID){
    fetch(`https://cors-anywhere.herokuapp.com/https://testapi.pfl.com/products?id=${productID}&apikey=136085`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.credentials}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => this.currentOrder = result.results.data)
    .then(result => browserHistory.replace("/orderdetails"));
  }

  // API POST request to /orders assembles order details into acceptable format, and saves response as orderResponse
  // to access the Order Number.
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

    fetch('https://cors-anywhere.herokuapp.com/https://testapi.pfl.com/orders?apikey=136085', {
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
}
