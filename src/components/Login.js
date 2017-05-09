import React from 'react';
import { observer, inject } from 'mobx-react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      pflUser: "",
      pflPass: ""
    };
    this.handlePflUserChange = this.handlePflUserChange.bind(this);
    this.handlePflPassChange = this.handlePflPassChange.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
  }

  handlePflUserChange(e) {
    this.setState({pflUser: e.target.value});
  }
  handlePflPassChange(e) {
    this.setState({pflPass: e.target.value});
  }

  handleUserAuth(event){
    event.preventDefault();
    let user = {pflUser: this.state.pflUser, pflPass: this.state.pflPass};
    this.props.userStore.authUser(user);
    this.props.userStore.setUser(user);
    this.setState({pflUser: "", pflPass: ""});

  }
  render(){
    let invalidUser = <h3 className="invalidUser">Please enter valid username and password.</h3>;
    let loginForm = (
      <div >
        <form method="" role="form">
          <div className="form-group" style={{marginBottom: '0px', display: 'flex', flexDirection: 'row', alignItems:'center', height:'15vh'}}>
            <input style={{margin:'1vw'}} onChange={this.handlePflUserChange} value={this.state.pflUser} type="text" className="form-control" id="pflUser" placeholder="PFL username"/>
            <input onChange={this.handlePflPassChange} value={this.state.pflPass} type="pflPass" className="form-control" id="pflPass" placeholder="PFL Password"/>
            <button onClick={this.handleUserAuth} type="submit" className="submitForm2"><strong>Log In</strong></button>
          </div>
        </form>
        {this.props.userStore.failedLogin ? invalidUser : ""}
    </div>);
    return(
        <div>
          {loginForm}
        </div>
    );
  }
}
Login.propTypes = {
  userStore: React.PropTypes.object
};
export default inject('userStore')(observer(Login));
