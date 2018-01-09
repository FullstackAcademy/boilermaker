import React, { Component } from 'react';

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div>
        <h1 style={ {backgroundColor: 'green', height: '100vh'}}>Product List</h1>
      </div>
     )
  }
}

export default ProductList;
