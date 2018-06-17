import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { me } from '../store/user'
import Games from './games'
// import Players from './players'

class CourtPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courtName: "",
      courtLocation: "",
      players: 0,
      courtId: Number(this.props.match.params.courtId),
      date: "",
      time: "",
      games: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
  }

  async componentDidMount () {
    this.props.getUser()
    const res = await axios.get(`/api/courts/${this.state.courtId}`)
    console.log(res.data)
    this.setState({
      courtName: res.data.name,
      courtLocation: res.data.location,
    })
  }

  handleChange (event) {
    console.log(event.target.value)

  }

  async handleCheckIn (event) {
    console.log(this.state.courtId)
    console.log(this.props.user)
    const checkInUser = {
      id: this.props.user.id,
      courtId: this.state.courtId
    }
    await axios.put(`/api/users/`, checkInUser)
  }

  async handleCheckOut (event) {
    console.log(this.state.courtId)
    console.log(this.props.user)
    const checkOutUser = {
      id: this.props.user.id,
      courtId: null
    }
    await axios.put(`/api/users/`, checkOutUser)
  }

  async handleSubmit (event) {
    event.preventDefault()
    const game = {
      location: this.state.courtLocation,
      address: this.state.courtLocation,
      date: event.target.date.value,
      time: event.target.time.value,
      userId: this.props.user.id,
      courtId: this.state.courtId
    }
    await axios.post('/api/games/', game);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>{this.state.courtName}</h3>
        <h4>{this.state.courtLocation}</h4>
        <button onClick={this.handleCheckIn}>Check In</button>
        <button>Check Out</button>
        <form onSubmit={this.handleSubmit}>
          <h4>Schedule A Game</h4>
          <label>
            Time:
            <input type="text" value = {this.props.time} name="time" onChange={this.handleChange} />
          </label>
          <label>
            Date:
            <input type="text" value = {this.props.date} name="date" onChange={this.handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      <Games courtId={this.state.courtId}/>
      {/* <Players /> */}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourtPage)



