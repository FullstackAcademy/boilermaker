import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchSingleCourseThunk } from '../store/courses'

class SingleCourse extends Component {
  componentDidMount(){
    const courseId = Number(this.props.match.params.courseId)
    console.log("COURSE_ID", courseId)
    this.props.getSingleCourse(courseId)
  }
  render(){
    const course = this.props.course
    console.log("SINGLE COURSE", this.props.course)
    return (
      <div>
        {course.map(lecture => (
          <div key={lecture.id}>
            <h2>{lecture.title}</h2>
            <h4>{lecture.note}</h4>
            <p>{lecture.youtube_url}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    course: state.courses.allLectures
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCourse(id){
      dispatch(fetchSingleCourseThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCourse)
