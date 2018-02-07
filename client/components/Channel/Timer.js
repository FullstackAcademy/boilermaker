import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'progressbar.js';
import { setTimeout } from 'timers';
import { setTimerActive } from '../../store';

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
    let { currTime: ct, totalTime } = this.props;
    currTime = currTime || ct;
    let barDiv = document.getElementById('progressbar');
    barDiv.innerHTML = '';
    bar = this.bar = new ProgressBar.SemiCircle(barDiv, {
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
        if (!bar.textFrozen) bar.setText(Math.ceil(forcedStartText) || totalTime / 1000 - value);
        // if (value === 25) {
        //   this.setState({ shake: true })
        // } else if (value === 30) {
        //   this.setState({ shake: false })
        // }
        let text = bar.text;
        text.style.color = state.color;
        text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        text.style.fontSize = '2rem';
        text.style.bottom = '50%'
        text.style.display = 'flex';
        //text.style.marginTop = '50px';
      }
    });
    flip && barDiv.firstChild.classList.add('flip');

    this.bar.set(currTime / totalTime);
    this.bar.animate(1.0);  // Number from 0.0 to 1.0
  }

  createLeadIn() {
    bar.textFrozen = true;
    let { leadinTime: startTime, totalLeadinTime } = this.props;
    let leadinTime = totalLeadinTime - startTime;
    let count = leadinTime - 1000;

    const countDown = () => {
      if (count <= 0 || !this.bar) window.clearInterval(leadIn);
      if (!this.bar) return;
      this.bar.setText(Math.ceil(count / 1000));
      count -= 100;
    }
    let leadIn = setInterval(countDown, 100);

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
      <div id="progressbar" className={animate} alt={$`{this.props.totalTime}`} />
    )
  }
}

const mapState = (state) => {
  let status = (() => {
    switch (state.room.timer.status.phase) {
      case '_player1ToStart':
        return 0;
      case '_player1Debating':
        return 1;
      case '_player2ToStart':
        return 2;
      case '_player2Debating':
        return 3;
      case '_announcingWinner':
        return 4;
      default:
        return 0;
    }
  })()
  return {
    leadinTime: state.room.timer.leadinTime,
    currTime: state.room.timer.currTime,
    totalTime: state.room.timer.totalTime,
    totalLeadinTime: state.room.timer.totalLeadinTime,
    timerIsActive: state.room.timer.active,
    status
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