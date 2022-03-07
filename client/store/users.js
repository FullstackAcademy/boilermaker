import axios from 'axios'


//Action types
const GET_ALL_USERS = "GET_ALL_USERS"


//Action Creators 
const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }

}



//Thunk Creators 
export const fetchAllUsers = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/users');
    dispatch(getAllUsers(data))
  }
}



//Reducer Creator 

export default function userReducer(users = [], action) {
  switch(action.type) {
    case GET_ALL_USERS: {
      return action.users
    }
    default:
      return users
  }
}