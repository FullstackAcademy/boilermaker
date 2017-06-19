import Ready from '../components/Ready';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { receiveBG, receiveIMG, flashMSG} from '../action-creators'
import React, { Component } from 'react';

const mapState = state => {
  return {
    flash: state.flash
  }
}

const mapDispatch = (dispatch) => {
  return {
    receiveBG: (bg) => {
      dispatch(receiveBG(bg));
    },
    receiveIMG: (images) => {
      dispatch(receiveIMG(images));
    },
    toggleFlash: () => {
      dispatch(flashMSG())
    }
  };
};

class NewParallaxContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      bg: '',
      images: [],
      url: '',
      speed: 0
    };

    this.handleBG = this.handleBG.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSpeed = this.handleSpeed.bind(this);
    this.addImage = this.addImage.bind(this);

  }


  handleBG (event) {
    const value = event.target.value;
    this.setState({
      bg: value
    })
  }

  handleImage (event) {
    const value = event.target.value;
    this.setState({
      url: value
    })
  }

  handleSpeed (event) {
    const value = event.target.value;
    this.setState({
      speed: value
    })
  }

  addImage (event) {
    this.setState({
      images: this.state.images.concat([{
        url: this.state.url,
        speed: this.state.speed
      }])
    })
    console.log(this.refs);
  }

  handleSubmit (event) {
    console.log("submit", this.state.images)
    event.preventDefault();
    this.props.receiveBG(this.state.bg);
    this.props.receiveIMG(this.state.images)

    hashHistory.push('/result');
  }

  render () {
      return (
          <Ready
            handleBG={this.handleBG}
            handleSubmit={this.handleSubmit}
            handleImage={this.handleImage}
            handleSpeed={this.handleSpeed}
            addImage={this.addImage}
            bg={this.state.bg}
            image={this.state.image}

            />
      )
  }
}

const ReadyContainer = connect(mapState, mapDispatch)(NewParallaxContainer);

export default ReadyContainer;
