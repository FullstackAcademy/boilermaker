import React, {Component} from 'react'

class multipleC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      gestures: [1, 2, 3, 4, 5, 6, 7],
      answer: '',
      choices: []
    }
  }
  componentDidMount() {
    let types = ['classes', 'gestures']
    let index
    let choices = []
    let answer
    let gestures = this.state.gestures
    let classes = this.state.classes
    if (types[Math.round(Math.random() * 2)] === 'gestures') {
      index = Math.floor(Math.random() * this.state.classes.length)
      answer = this.state.gestures[index]
      for (let i = 0; i < this.state.choices.length; i++) {
        index = Math.floor(Math.random() * this.state.gestures.length)
        if (
          !this.state.choices.includes(this.state.gestures[index]) &&
          this.state.gestures[index] !== this.state.answer
        ) {
          choices[i] = this.state.gestures[index]
        } else {
          i--
        }
      }
      index = Math.floor(Math.random() * 4)
      choices.splice(index, 1, this.state.answer)
    } else {
      index = Math.floor(Math.random() * this.state.classes.length - 1)
      answer = this.state.classes[index]
      for (let i = 0; i < this.state.choices.length; i++) {
        index = Math.floor(Math.random() * this.state.classes.length - 1)
        if (
          !this.state.choices.includes(this.state.classes[index]) &&
          this.state.classes[index] !== this.state.answer
        ) {
          choices[i] = this.state.classes[index]
        } else {
          i--
        }
      }
      index = Math.floor(Math.random() * 4)
      choices.splice(index, 1, this.state.answer)
    }
    this.setState({
      classes,
      gestures,
      answer,
      choices
    })
  }

  render() {
    return <div>{console.log(this.state)}</div>
  }
}

export default multipleC
