import React, {Component} from 'react'
import {Form, Radio, Segment} from 'semantic-ui-react'

export default class Practice extends Component {
  constructor() {
    super()
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, {value}) {
    this.setState({value})
  }

  render() {
    return (
      <div>
        hello
        <Form>
          <Form.Field id="quizform">
            Selected value: <b>{this.state.value}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              value="a"
              checked={this.state.value === 'a'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              value="b"
              checked={this.state.value === 'b'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              value="c"
              checked={this.state.value === 'c'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              value="d"
              checked={this.state.value === 'd'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </div>
    )
  }
}
