import React, { Component } from 'react'
import axios from 'axios';

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
    this.handleJoinGame = this.handleJoinGame.bind(this)
  }

  async componentDidMount () {
    const games = await axios.get(`/api/transactions/${gameId}`)
    console.log(games.data)
      this.setState({
        players: games.data
      })
  }

  async handleJoinGame (event) {
    event.preventDefault()
    const gameId = Number(event.target.value)
    const gameNumStr = gameId.toString()
    const userIdStr = this.props.userId.toString()
    const transaction = {
      name: gameNumStr + userIdStr,
      gameId: gameId,
      userId: this.props.userId
    }
    await axios.post(`/api/transactions/`, transaction)

    const games = await axios.get(`/api/transactions/${gameId}`)
    console.log(games.data)
      this.setState({
        players: games.data
      })
  }

  render() {
    return (
      <div>
      <h3>UPCOMING GAMES</h3>
      {this.props.games.map(game => (
        <ul>
          <li key={game.id}>
            Date: {game.date} Time: {game.time}
            <button type="submit" onClick={this.handleJoinGame} value={game.id}>
            Join Game
            </button>
          </li>

          {this.state.players ? this.state.players.map(player => {
          return (
            <li key={player.id}>
            {player.user.email.slice(0, player.user.email.indexOf('@'))}
            </li>
          )
        }): null}

        </ul>
      ))}
      </div>
    )
  }
}

export default Games
