import React from 'react';
import { inject, observer } from 'mobx-react';
import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.orderItem = this.orderItem.bind(this);
  }

  orderItem(product, e){
    this.props.orderStore.getItemDetails(product.productID);
  }

  render() {
    let productList = this.props.orderStore.products.map((product, index) =>
      <div key={index} src={product.imageURL} style={{width:'240px', margin:'10px', display:'flex', flexDirection:'column', justifyContent:'space-between', border:'1px solid grey'}}>
        <Image src={product.imageURL} style={{width:'100%', height:'200px', padding:'10px'}}/>
        <h4 style={{padding:'10px'}}>{product.name}</h4>
        <p style={{padding:'10px'}}>
          <Button onClick={this.orderItem.bind(null, product)} bsStyle="primary">Order Item</Button>
        </p>
      </div>
    );
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Product List</h1>
        <Grid>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
            {productList}
          </div>
        </Grid>
      </div>


    );
  }
}

Products.propTypes = {
  orderStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject('orderStore', 'userStore')(observer(Products));
