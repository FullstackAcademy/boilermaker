import axios from 'axios'

// ACTION TYPES
const GET_ALL_COURSES = 'GET_ALL_COURSES'
const GET_SINGLE_COURSE = 'GET_SINGLE_COURSE'

// INITIAL STATE
const initialCourseState = {
  allCourses: [], // contain a list of courses
  selected: {} // contain a list of lectures => so later needs to be changed to []
}

// ACTION CREATORS
const getAllCourses = courses => ({
  type: GET_ALL_COURSES,
  courses
})

const getSingleCourse = course => ({
  type: GET_SINGLE_COURSE,
  course
})

// THUNKS: All thunks named with 'fetch'
export const fetchAllCoursesThunk = () => async dispatch => {
  try {
    const {data: courses} = await axios.get(`/api/courses`)
    dispatch(getAllCourses(courses))
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleCourseThunk = id => async dispatch => {
  try {
    const {data: course} = await axios.get(`/api/courses/${id}`)
    dispatch(getSingleCourse(course))
  } catch (error) {
    console.log(error)
  }
}

// REDUCER
const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {...state, allCourses: action.courses}
    case GET_SINGLE_COURSE:
      return {...state, selected: action.course}
    default:
      return state
  }
}

export default courses
