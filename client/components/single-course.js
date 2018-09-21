import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchSingleCourseThunk } from '../store/courses'

// SingleCourse Component:
// 1) Either a logged in user
// 2) Or a guest user in which case s/he can only have one SingleCourse

class SingleCourse extends Component {
  componentDidMount(){
    console.log("params checking", this.props.match.params)
    const courseId = Number(this.props.match.params.courseId)
    this.props.getSingleCourse(courseId)
  }
  render(){
    const {name} = this.props.course
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
}

const mapState = state => {
  return {
    course: state.courses.selected
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCourse: (id) => dispatch(fetchSingleCourseThunk(id))
  }
}

export default connect(mapState, mapDispatch)(SingleCourse)
