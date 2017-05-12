// This component creates and displays an array of input fields, based on the type of field it is.
// Each input field has it's own handleFieldChange method,
// which takes it's unique input and saves in the the orderStore.
import React from 'react';
import { inject, observer } from 'mobx-react';
import { ControlLabel, FormControl } from 'react-bootstrap';

class Template extends React.Component {
  constructor(){
    super();
    this.state ={
      currentField: '',
      fieldInfo: []
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(index, e){
    this.props.orderStore.fieldInfo[index][1] = e.target.value;
    console.log(this.props.orderStore.fieldInfo[index][1]);
  }

  render(){
    let fieldList = (
      this.props.currentOrder.templateFields.fieldlist.field.map((field, index) =>
      <div key={index} style={{width: '240px'}}>
        {field.type !== "SEPARATOR" ? <ControlLabel>{field.fieldname}</ControlLabel> : ''}
        {field.type == "SEPARATOR" ? <div><br></br><br></br></div> : ""}
        {field.type == "MULTILINE" ?
           <FormControl value={this.props.orderStore.fieldInfo[index][1]} onChange={this.handleFieldChange.bind(null, index)} componentClass="textarea" placeholder={field.prompt[0].text} />
           : ''}
        {field.type == "SINGLELINE" || (field.type !== "MULTILINE" && field.type !== "SEPARATOR") ?
          (<div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.props.orderStore.fieldInfo[index][1]}
              onChange={this.handleFieldChange.bind(null, index)}
              placeholder={field.prompt[0].text}
            />
          </div>)
          : ''}
      </div>
      )
    );

    return(
      <div style={{border: '1px solid black', borderRadius: '10px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', width: '50%'}}>
        <h3>Product Template</h3>
        {fieldList}
      </div>

    );
  }
}

Template.propTypes = {
  orderStore: React.PropTypes.object,
  currentOrder: React.PropTypes.object
};

export default inject('orderStore')(observer(Template));
