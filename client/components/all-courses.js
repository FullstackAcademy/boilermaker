import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchAllCoursesThunk } from '../store/courses';

// AllCourse Component: ONLY APPLIES TO USERS WHO ARE LOGGED IN
class AllCourses extends Component {
  componentDidMount(){
    this.props.getAllCourses()
  }
  render(){
    const courses = this.props.courses
    return (
      <div>
        {courses.map(course => {
          return <h3 key={course.id}>{course.name}</h3>
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    courses: state.courses.allCourses
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCourses: () => dispatch(fetchAllCoursesThunk())
  }
}

export default connect(mapState, mapDispatch)(AllCourses)
