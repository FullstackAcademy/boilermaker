import React, { Component } from 'react'

const Players = (props) => {
  const players = props.players

  return (
    <div>
    <h3>Current Players</h3>
    {players.map(player => {
      return (
        <ul className="w3-ul w3-card-4">
          <li id="player-list">
          Player: {player.email.slice(0, player.email.indexOf('@'))} CheckIn: {new Date (player.updatedAt).toLocaleString()}
          </li>
        </ul>
      )
    })}
    </div>
  )
}

export default Players

