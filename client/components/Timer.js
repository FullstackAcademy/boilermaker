import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'progressbar.js';

class Timer extends Component {

  constructor (props) {
    super(props);
    this.state = props;

    this.timerCreator = this.timerCreator.bind(this);
  }

  timerCreator (flip) {
    let { currTime, totalTime } = this.state;
    $('#progressbar').empty();
    this.bar = new ProgressBar.SemiCircle($('#progressbar')[0], {
      // Set default step function for all animate calls
      strokeWidth: 6,
      trailColor: '#eee',
      trailWidth: 1,
      duration: totalTime - currTime,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      color: '#f08f36',
      from: { color: '#18db18' },
      to: { color: '#ff0000' },
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        let value = Math.floor((bar.value() * totalTime / 1000));
        bar.setText(totalTime / 1000 - value);
        bar.text.style.color = state.color;
      }
    });
    if (flip) {
      $('#progressbar').toggleClass('flip');
      $('.progressbar-text').toggleClass('flip');
    }
    let text = this.bar.text;
    text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    text.style.fontSize = '2rem';
    text.style.top = '30%';
    text.style.marginTop = '50px';
    this.bar.set(currTime / totalTime);
    this.bar.animate(1.0);  // Number from 0.0 to 1.0
  }

  componentDidMount () {
    let { currTime, totalTime } = this.state;
    this.timerCreator(false);
    setTimeout(() => {
      let count = 5;
      const countDown = () => {
        if (count === 0) window.clearInterval(leadIn);
        this.bar.setText(count)
        count--
      }
      let leadIn = setInterval(countDown, 1000);

      setTimeout(() => {
        this.setState({
          currTime: 0,
          totalTime: 30000
        })
        this.timerCreator(true);
      }, 6000);

    }, totalTime - currTime);
  }

  render() {
    return (
      <div id="progressbar"> </div>
    )
  }
}

const mapState = (state) => {
  return {
    currTime: state.timer.currTime,
    totalTime: state.timer.totalTime
  }
}

export default connect(mapState)(Timer);
