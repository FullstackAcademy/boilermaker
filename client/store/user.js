import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

//Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//STATE
const defaultUser = {}

//Action Creators
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

//Thunk Creators
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }


// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})

//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/userhome')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      }
    });
    return dispatch(getUser(res.data));
  }
};

export const auth =
  (email, password, method) => async (dispatch) => {
    let res;
    try {
      res = await axios.post(`/auth/${method}`, { email, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(getUser({ error: authError }));
    }
      try {
    dispatch(getUser(res.data))
    history.push('/userhome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
  };

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

//Reducer Creator
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

// export const setUsers = () => {};

// export const fetchUsers = () => {};

// export default function usersReducer() {
//   return null;
// }
// }
// export const me = () => async dispatch => {
//   try {
//     const token = window.localStorage.getItem(TOKEN);
//   if (token) {
//     const res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token,
//       }
//     });
//     return dispatch(getUser(res.data || defaultUser));
//   }
    
//   } catch (err) {
//      console.error(err)
//   }

  
// };