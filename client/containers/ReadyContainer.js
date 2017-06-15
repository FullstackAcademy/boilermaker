import Ready from '../components/Ready';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { receiveBG } from '../action-creators'
import React, { Component } from 'react';


const mapDispatch = (dispatch) => {
  return {
    receiveBG: (bg) => {
      dispatch(receiveBG(bg));
    }
  };
};

class NewParallaxContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      bg: '',
    };

    this.handleBG = this.handleBG.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleBG (event) {
    const value = event.target.value;
    this.setState({
      bg: value
    })
  }


  handleSubmit (event) {
    event.preventDefault();
    // this.props.receiveBG({

    // })
  }

  render () {
      return (
          <Ready
            handleBG={this.handleBG}
            handleSubmit={this.handleSubmit}
            bg={this.state.bg}
            />
      )
  }
}

const ReadyContainer = connect(null, mapDispatch)(NewParallaxContainer);

export default ReadyContainer;
