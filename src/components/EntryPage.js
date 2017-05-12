import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default class EntryPage extends React.Component {

  render() {
    return(
      <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <div style={{width: "100vw", position: "relative", display:'flex', flexWrap:'wrap', justifyContent:'space-around', background:"rgb(0,159,227)"}}>
          <span><h1 className="pflentry">PFL <span style={{color:'#ffed00'}}>Purchasing</span></h1></span>
          <Login/>
        </div>
        <SignUp/>
      </div>
    );
  }
}
