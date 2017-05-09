import React from 'react';
import { observer, inject } from 'mobx-react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      pflUser: "",
      pflPass: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePflUserChange = this.handlePflUserChange.bind(this);
    this.handlePflPassChange = this.handlePflPassChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePflUserChange(e) {
    this.setState({pflUser: e.target.value});
  }

  handlePflPassChange(e) {
    this.setState({pflPass: e.target.value});
  }

  addUserToDatabase(e){
    this.props.userStore.userCreated = false;
    this.props.userStore.failedPflPassword = false;
    e.preventDefault();
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pflUser: this.state.pflUser,
        pflPass: this.state.pflPass
      })
    });
    if(this.state.pflUser && this.state.pflPass){
      this.props.userStore.displayWelcome();
      this.setState({firstName: "", lastName: "", pflUser: "", pflPass: ""});
    } else {
      this.props.userStore.failedPflPassword = true;
    }
  }


  render() {
    let logInMessage = (
      <h3 className="signup-message2">
      Welcome to PFL Purchasing!  Go ahead and log in!
      </h3>
    );

    let noEmail = (
      <h3 className="signup-message">
        Please enter a valid username and password.
      </h3>
    );

    let signUpForm = (
      <div className="signup-form">
        <h1 className="bodyText">Register</h1>
        <form method="" role="form">
            <div className="form-group">
              <input
                onChange={this.handleFirstNameChange}
                value={this.state.firstName}
                type="text"
                className="form-control"
                id="first-name"
                placeholder="first name"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleLastNameChange}
                value={this.state.lastName}
                type="text"
                className="form-control"
                id="last-name"
                placeholder="last name"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handlePflUserChange}
                value={this.state.plfUser}
                type="text"
                className="form-control"
                id="pflUser"
                placeholder="PFL Username"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handlePflPassChange}
                value={this.state.pflPass}
                type="password"
                className="form-control"
                id="pflPass"
                placeholder="PFL password"/>
            </div>
            <button
              onClick={this.addUserToDatabase}
              type="submit"
              className="submitForm">
              <strong>
                Sign Up
              </strong>
            </button>
         </form>
         {this.props.userStore.userCreated ? logInMessage: ""}
         {this.props.userStore.failedPflPassword ? noEmail: ""}
      </div>
    );
    return(
        <div>
          {signUpForm}
        </div>
    );
  }
}


SignUp.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('userStore')(observer(SignUp));
