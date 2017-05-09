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
      deliveryMethodCode: '',
      price: 0

    });

    this.savePosition = this.savePosition.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.saveFieldNotes = this.saveFieldNotes.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.honeyHoleClick = this.honeyHoleClick.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.getItemDetails = this.getItemDetails.bind(this);
  }

  savePosition(ownerId) {
    let coordinates = {
      latitude: this.center.lat,
      longitude: this.center.lng
    };
    let weather = {
      temp: this.weather.temp,
      conditions: this.weather.conditions,
      windSpeed: this.weather.windSpeed,
      windDir: this.weather.windDir
    };
    let title = this.defaultTitle;
    fetch('/location/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date,
        title: title,
        coordinates: coordinates,
        weather: weather,
        owner: ownerId
      })
    })
    .then(result => result.json())
    .then(result => this.currentLocation = result)
    .then(result => this.locations.push(result));
  }

  getWeatherInfo() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.center.lat}&lon=${this.center.lng}&APPID=72c2e10afa58ce6e31b103d41b7125b8`)
       .then(result => result.json())
       .then(data => this.weather = {conditions: data.weather[0].description, temp: data.main.temp, windSpeed: data.wind.speed, windDir: data.wind.deg });
  }

  saveFieldNotes(locationId, title, notes){
    if(title == ''){
      title = "New Honey Hole";
    }
    fetch('/location/locations/' + locationId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        notes: notes
      })
    })
    .then(result => result.json())
    .then(result => this.currentLocation = result)
    .then(result => this.locations[this.locations.length - 1] = result);
  }

  loadProducts(username, password) {
    let credentials = btoa(username + ":" + password);
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
    // .then(result => console.log(result.results.data));
  }

  deleteLocation(locationId) {
    console.log(locationId);
    let newList = this.locations.filter(l => l._id !== locationId);
    this.locations = newList;
    fetch('/location/locations/' + locationId, {
      method: 'DELETE'
    });
  }

  honeyHoleClick(){
    this.honeyHoleClicked = false;
  }
}
