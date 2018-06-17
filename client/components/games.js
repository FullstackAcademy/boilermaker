import React, { Component } from 'react'
import axios from 'axios';

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  async componentDidMount () {
    const res = await axios.get(`/api/games/${this.props.courtId}`)
    console.log(res.data)
    this.setState({
      games: res.data
    })
  }

  render() {
    return (
      <div>
      <h3>UPCOMING GAMES</h3>
      {this.state.games.map(game => (
        <li>
          Date: {game.date} Time: {game.time}
          <button type="submit">
          Join Game
          </button>
        </li>

      ))}
      </div>
    )
  }
}

export default Games
