import React, {Component} from 'react'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Reveal
} from 'semantic-ui-react'
import {Navbar, Footer} from '.'

class multipleC extends Component {
  constructor() {
    super()
    this.state = {
      letter: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      gesture: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26
      ],
      // letter: ['A', 'B', 'C', 'D', 'E'],
      // gesture: [],
      answer: '',
      choices: [0, 0, 0, 0],
      questionType: '',
      type: '',
      score: 0
    }
    this.populate = this.populate.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.populate()
  }

  populate(score = 0) {
    // if (!this.state.gesture.length) {
    //   function importAll(r) {
    //     let images = {}
    //     console.log('images', images)
    //     r.keys().map((item, index) => {
    //       images[item.replace('../../', '')] = r(item)
    //     })
    //     return images
    //   }
    //   console.log('hit')
    //   debugger

    //   console.log('require')
    // }
    let types = ['letter', 'gesture']
    let index
    let choices = this.state.choices.slice()
    let answer
    let gesture = this.state.gesture
    let letter = this.state.letter
    let type = types[Math.floor(Math.random() * 2)]
    let questionType = types.filter(e => {
      return e !== type
    })[0]
    // console.log('TYPE', questionType)
    if (type === 'gesture') {
      index = Math.floor(Math.random() * (letter.length - 1))
      answer = gesture[index]
      for (let i = 0; i < this.state.choices.length; i++) {
        index = Math.floor(Math.random() * (gesture.length - 1))
        if (!choices.includes(gesture[index]) && gesture[index] !== answer) {
          choices[i] = gesture[index]
        } else {
          i--
        }
      }
      index = Math.floor(Math.random() * choices.length)
      choices.splice(index, 1, answer)
    } else {
      index = Math.floor(Math.random() * (this.state.letter.length - 1))
      answer = letter[index]
      for (let i = 0; i < this.state.choices.length; i++) {
        // console.log(i)
        index = Math.floor(Math.random() * (letter.length - 1))
        if (
          !choices.includes(this.state.letter[index]) &&
          letter[index] !== answer
        ) {
          choices[i] = this.state.letter[index]
        } else {
          i--
        }
      }
      index = Math.floor(Math.random() * choices.length)
      choices.splice(index, 1, answer)
    }
    this.setState({
      letter,
      gesture,
      answer,
      choices,
      questionType,
      type,
      score
    })
  }
  onClick(val) {
    let score = this.state.score
    if (val == this.state.answer) {
      score++
      alert('Hell yea brother')
    } else {
      alert('Not quite my guy')
    }
    this.populate(score)
  }

  render() {
    console.log(this.state)
    return this.state.type ? (
      <div>
        <Navbar />
        <div id="multipleChoice">
          <h2>What {this.state.type} is this?</h2>
          <h1>
            {
              this.state[this.state.questionType][
                this.state[this.state.type].indexOf(this.state.answer)
              ]
            }
          </h1>
          <div id="quiz">
            {this.state.choices.map(e => {
              return (
                <div id="choices" className="ui segment">
                  <Button
                    type="button"
                    key={e}
                    val={e}
                    onClick={() => this.onClick(e)}
                  >
                    {this.state.questionType === 'gesture' ? (
                      e
                    ) : (
                      <img src={e} className="ui small image" />
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="ui disabled move reveal">
            <div className="visible" />
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div id="multiplechoice">
        <h1>Loading</h1>
      </div>
    )
  }
}
// type="button"
// key={e}
// val={e}
// onClick={() => this.onClick(e)}

export default multipleC
{
  /* <div className="ui segments">
  <div class="ui segment">
    <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">top</font></font></p>
  </div>
  <div class="ui segment">
    <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Middle</font></font></p>
  </div>
  <div class="ui segment">
    <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Middle</font></font></p>
  </div>
  <div class="ui segment">
    <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Middle</font></font></p>
  </div>
  <div class="ui segment">
    <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">bottom</font></font></p>
  </div>
</div> */
}
