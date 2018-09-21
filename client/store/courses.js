import axios from 'axios'

// ACTION TYPES
const GET_ALL_COURSES = 'GET_ALL_COURSES'
const GET_SINGLE_COURSE = 'GET_SINGLE_COURSE'

// INITIAL STATE
const initialCourseState = {
  allCourses: [], // contain a list of courses
  allLectures: [] // contain a list of lectures => so later needs to be changed to []
}

// ACTION CREATORS
const getAllCourses = courses => ({
  type: GET_ALL_COURSES,
  courses
})

const getSingleCourse = lectures => ({
  type: GET_SINGLE_COURSE,
  lectures
})

// THUNKS: All thunks named with 'fetch'
export const fetchAllCoursesThunk = () => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user) {
      const res = await axios.get(`/api/users/${user.id}/courses`)
      const {courses} = res.data;
      dispatch(getAllCourses(courses))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleCourseThunk = (courseId) => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user){
      const res = await axios.get(`/api/users/${user.id}/courses/${courseId}`)
      const {lectures} = res.data
      dispatch(getSingleCourse(lectures))
    }
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
      return {...state, allLectures: action.lectures}
    default:
      return state
  }
}

export default courses
