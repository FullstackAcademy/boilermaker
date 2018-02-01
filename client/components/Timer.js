import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

class Timer extends Component {
  componentDidMount() {
    var bar = new ProgressBar.SemiCircle(document.getElementById('progressbar'), {
      // Set default step function for all animate calls
      strokeWidth: 6,
      trailColor: '#eee',
      trailWidth: 1,
      duration: 30000,
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
        var value = Math.floor((bar.value() * 30));
        bar.setText(30 - value);
        bar.text.style.color = state.color;
      }
    });
    let text = bar.text;
    text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    text.style.fontSize = '2rem';
    text.style.top = '30%';
    text.style.marginTop = '50px';
    bar.animate(1.0);  // Number from 0.0 to 1.0
  }

  render() {
    return (
      <div id="progressbar"> </div>
    )
  }
}

export default Timer;
