import React, {useState} from 'react'
import {Button, Card} from 'react-bootstrap'

//mini medi:
// Joy Happiness
{
  /* <iframe src="https://open.spotify.com/embed/playlist/7xkW7Xg5wkh5IaarIMY6Mj" width="300" height="380"}} frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe> */
}

//10 min or less
//  <iframe src="https://open.spotify.com/embed/playlist/0eAa4FyRTpxpkKsq6GynFG" width="300" height="380" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>

class DropdownMood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      intention: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.getTrack(this.state.intention)
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({intention: value})
  }

  render() {
    return (
      <div className="flex-row justify-content-center">
        <Card>
          <Card.Body>
            <form className="" onSubmit={this.handleSubmit}>
              <label
                htmlFor="mood"
                className="align-self-center m-1 form-control"
                style={{fontWeight: 'bold'}}
              >
                How do you want to feel?
              </label>
              <select
                className="m-1 form-control"
                id="meditation-mood-selector"
                title="mood"
                name="mood"
                onChange={this.handleChange}
                value={this.state.intention}
              >
                <option value="all">---</option>
                {this.props.moods.map(mood => (
                  <option key={mood.id}>{mood.name}</option>
                ))}
              </select>
              <Button type="submit" variant="success">
                Find me a Meditation!
              </Button>
            </form>
            {/* <iframe
        src="https://open.spotify.com/embed/playlist/0eAa4FyRTpxpkKsq6GynFG"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      /> */}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default DropdownMood
