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
    // this.loadFieldInfo = this.loadFieldInfo.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    // this.setFieldInfo = this.setFieldInfo.bind(this);
  }

  // componentDidMount(){
  //   this.loadFieldInfo();
  // }
  //
  // loadFieldInfo(){
  //   let fieldInfo = [];
  //   this.props.currentOrder.templateFields.fieldlist.field.forEach(field =>
  //   this.props.orderStore.fieldInfo.push([field.fieldname, '']));
  // }

  // setFieldInfo(index){
  //   this.props.orderStore.fieldInfo[index][1] = this.state.currentField;
  //   console.log(this.props.orderStore.fieldInfo[index][1]);
  // }

  handleFieldChange(index, e){
    this.props.orderStore.fieldInfo[index][1] = e.target.value;
    console.log(this.props.orderStore.fieldInfo[index][1]);
  }

  render(){
    let fieldList = (
      this.props.currentOrder.templateFields.fieldlist.field.map((field, index) =>
      <div key={index}>
        {field.type !== "SEPARATOR" ? <ControlLabel>{field.fieldname}</ControlLabel> : ''}
        {field.type == "SEPARATOR" ? <div><br></br><br></br></div> : ""}
        {field.type == "MULTILINE" ?
           <FormControl value={this.props.orderStore.fieldInfo[index][1]} onChange={this.handleFieldChange.bind(null, index)} componentClass="textarea" placeholder={field.prompt[0].text} />
           : ''}
        {field.type == "SINGLELINE" ?
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
      <div>
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
