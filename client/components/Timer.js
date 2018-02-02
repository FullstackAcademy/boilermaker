import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'progressbar.js';
import { setTimeout } from 'timers';
import { setTimerActive } from '../store';

var bar;
class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shake: false
    }

    this.timerCreator = this.timerCreator.bind(this);
    this.createLeadIn = this.createLeadIn.bind(this);
  }

  timerCreator(flip, currTime, forcedStartText) {
    let { currTime: ct, totalTime, leadinTime } = this.props;
    currTime = currTime || ct;
    $('#progressbar').empty();
    bar = this.bar = new ProgressBar.SemiCircle($('#progressbar')[0], {
      // Set default step function for all animate calls
      strokeWidth: 6,
      trailColor: '#eee',
      trailWidth: 1,
      duration: totalTime - currTime,
      svgStyle: null,
      textFrozen: true,
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
        if (!bar.textFrozen) bar.setText(forcedStartText || totalTime / 1000 - value);
        if (value === 25) {
          this.setState({ shake: true })
        } else if (value === 30) {
          this.setState({ shake: false })
        }
        bar.text.style.color = state.color;
      }
    });
    flip && $('svg').addClass('flip');

    let text = this.bar.text;
    text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    text.style.fontSize = '2rem';
    text.style.top = '30%';
    text.style.marginTop = '50px';
    this.bar.set(currTime / totalTime);
    this.bar.animate(1.0);  // Number from 0.0 to 1.0
  }

  createLeadIn() {
    bar.textFrozen = true;
    let { leadinTime: startTime, totalLeadinTime } = this.props;
    let leadinTime = totalLeadinTime - startTime;
    let count = leadinTime / 1000 - 1;

    const countDown = () => {
      if (count <= 0 || !this.bar) window.clearInterval(leadIn);
      if (!this.bar) return;
      this.bar.setText(count)
      count--
    }
    let leadIn = setInterval(countDown, 1000);

  }

  componentDidUpdate() {
    let { leadinTime: startTime, totalLeadinTime, currTime, totalTime, timerIsActive, status } = this.props;
    let leadinTime = totalLeadinTime - startTime;
    if (!timerIsActive) {
      if (bar) {
        bar.destroy();
        bar = null;
      }
      return;
    }
    this.timerCreator(false, totalTime, leadinTime / 1000);

    if (status <= 0) {
      //First Leadin
      this.createLeadIn();
    }

    if (status <= 1) {
      //First Timer
      setTimeout(() => {
        this.timerCreator(false, currTime);
        bar.textFrozen = false;
      }, totalLeadinTime);
    }

    if (status <= 2) {
      //Second Leadin
      setTimeout(() => {
        this.timerCreator(false, totalTime, leadinTime / 1000);
        this.createLeadIn();
      }, totalLeadinTime + totalTime)
    }

    if (status <= 3) {
      //Second Timer
      setTimeout(() => {
        this.timerCreator(true);
        bar.textFrozen = false;
      }, totalLeadinTime * 2 + totalTime);
    }

    if (status <= 4) {
      //Kill Everything
      setTimeout(() => {
        if (this.bar) {
          this.bar.destroy();
          bar = (this.bar = null);
          this.props.setTimerActive(false);
        }
      }, totalLeadinTime * 2 + totalTime * 2);
    }

  }

  render() {
    let animate = '';
    this.state.shake ? animate = 'animated infinite shake' : animate = ''

    return (
      <div id="progressbar" className={animate} alt={$`{this.props.totalTime}`}> </div>
    )
  }
}

const mapState = (state) => {
  return {
    leadinTime: state.timer.leadinTime,
    currTime: state.timer.currTime,
    totalTime: state.timer.totalTime,
    totalLeadinTime: state.timer.totalLeadinTime,
    timerIsActive: state.timer.active,
    status: state.timer.status
  }
}

const mapDispatch = (dispatch) => {
  return {
    setTimerActive() {
      dispatch(setTimerActive(...arguments))
    }
  }
}

export default connect(mapState, mapDispatch)(Timer);