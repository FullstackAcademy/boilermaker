import axios from 'axios'

// categoryList: Array.from(new Set(action.channels.map(channel => channel.category))).sort()
const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategories = categories => ({ type: GET_CATEGORIES, categories });

/******************** DISPATCH FUNCTIONS ********************/


export const fetchCategories = () => {
  return function (dispatch) {
    return axios.get('/api/categories')
      .then(res => {
        res.data.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        dispatch(getCategories(res.data))
      })
      .catch(err => console.log(err));
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}