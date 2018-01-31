import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'progressbar.js';

class Timer extends Component {

  componentDidMount () {
    //var { currTime, totalTime } = this.props;
    console.log(this.props)
    var currTime = 20000, totalTime = -30000;
    var bar = new ProgressBar.SemiCircle(document.getElementById('progressbar'), {
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
        var value = Math.floor((bar.value() * totalTime/1000));
        bar.setText(totalTime/1000 - value);
        bar.text.style.color = state.color;
      }
    });
    let text = bar.text;
    text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    text.style.fontSize = '2rem';
    text.style.top = '30%';
    text.style.marginTop = '50px';
    bar.set(currTime / totalTime);
    bar.animate(1.0);  // Number from 0.0 to 1.0
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
