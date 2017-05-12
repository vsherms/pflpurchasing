//This mobx Store saves User data, which is used in the API Authorization headers, and to allow login Authentication.
import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';
import React from 'react';

export default class UserStore {
  constructor(){
    extendObservable(this, {
      firstName: "",
      pflUser: "",
      pflPass: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false,
      userId: "",
      userCreated: false,
      failedPflPassword: false
    });
    this.authUser = this.authUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.displayWelcome = this.displayWelcome.bind(this);
  }

  authUser(user) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pflUser: user.pflUser,
        pflPass: user.pflPass
      })
    })
    .then(result => result.json())
    .then(res => {
      this.token = res.token;
      this.userId = res.userId;
      this.firstName = res.firstName;
      if(res.token){
        this.isLoggedIn = true;
        browserHistory.replace("/home");
      } else {
        this.failedLogin = true;
      }
    });
  }

  setUser(user) {
    this.pflUser = user.pflUser;
    this.pflPass = user.pflPass;
  }

  displayWelcome(){
    this.userCreated = true;
  }

  logUserOut() {
    this.token = "";
    this.isLoggedIn = false;
    this.admin = false;
    this.firstName= "";
    this.pflUser= "";
    this.pflPass= "";
    this.failedLogin= false;
    this.userId= "";
    browserHistory.replace("/");
    location.reload();
  }
}
