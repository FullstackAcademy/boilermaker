import React, { Component } from 'react'

const Players = (props) => {
  const players = props.players

  return (
    <div>
    <h3>Current Players</h3>
    {players.map(player => {
      return (
        <li id="player-list">
         Player: {player.email.slice(0, player.email.indexOf('@'))} CheckIn: {new Date (player.updatedAt).toLocaleString()}
        </li>
      )
    })}
    </div>
  )
}

export default Players

