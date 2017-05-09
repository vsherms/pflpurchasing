import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';

class OrderDetails extends React.Component {
  constructor(){
    super();
    this.state = {
    };
  }
  render(){

    return(

          <div>
            Hello World!
          </div>

    );
  }
}

OrderDetails.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(OrderDetails));
