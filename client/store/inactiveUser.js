import axios from 'axios';
import history from '../history';

const GET_INACTIVE_USER = 'GET_INACTIVE_USER';

export const getInactiveUser = (user) => ({ type: GET_INACTIVE_USER, user })

export const fetchUser = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res => dispatch(getInactiveUser(res.data)))
      .catch(console.error)

export default function(state = {}, action) {
    switch (action.type) {
        case GET_INACTIVE_USER:
            return action.user;
        default:
            return state;
    }
}