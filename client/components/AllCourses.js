import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchAllCoursesThunk } from '../store/courses';
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'

// AllCourses Component: ONLY APPLIES TO USERS WHO ARE LOGGED IN

class AllCourses extends Component {
  componentDidMount(){
    console.log("params checking", this.props.match.params)
    this.props.getAllCourses()
  }
  render(){
    const {allCourses} =  this.props.courses
    return (
      <div>
        {allCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    courses: state.courses
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCourses: () => dispatch(fetchAllCoursesThunk())
  }
}

export default connect(mapState, mapDispatch)(AllCourses)
