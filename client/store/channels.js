import axios from 'axios';
import history from '../history';
import { getUser } from './index';

const defaultState = {
  channelList: [],
  filteredChannelList: [],
  searchChannelList: [],
};

const GET_CHANNELS = 'GET_CHANNELS';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const GET_SEARCH_CHANNELS = 'GET_SEARCH_CHANNELS';

const getChannels = channels => ({ type: GET_CHANNELS, channels });
const makeChannel = channel => ({ type: CREATE_CHANNEL, channel });
const searchChannels = channels => ({ type: GET_SEARCH_CHANNELS, channels });

/******************** DISPATCH FUNCTIONS ********************/

export const fetchChannels = () => {
  return function (dispatch) {
    return axios.get('/api/channels')
      .then(res =>
        dispatch(getChannels(res.data)))
      .catch(err => console.log(err));
  }
}

export const fetchSearchChannels = searchTerm =>
  dispatch => {
    return axios.get(`/api/channels?search=${searchTerm}`)
      .then(res => dispatch(searchChannels(res.data)))
      .catch(err => console.log(err));
  }

export const createChannel = (name, categoryId, description, type, userId, user) => {
  return function (dispatch) {
    return axios.post('/api/channels', {
      name,
      categoryId,
      description,
      type,
      userId
    })
      .then(res => {
        dispatch(makeChannel(res.data))
        history.push(`/channels/${res.data.name}`)
      })
      .then(() => axios.get(`/api/users/${userId}`))
      .then(res => dispatch(getUser(res.data)))
      .catch(err => console.log(err));
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channelList: action.channels,
      }
    case CREATE_CHANNEL:
      return {
        ...state,
        channelList: [...state.channelList, action.channel]
      }
    case GET_SEARCH_CHANNELS:
      return {
        ...state,
        searchChannelList: action.channels
      }
    default:
      return state;
  }
}