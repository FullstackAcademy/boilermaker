import axios from 'axios';
import history from '../history';

const defaultState = {
  channelList: [],
  filteredChannelList: [],
  categoryList: [],
  searchChannelList: []
};

const GET_CHANNELS = 'GET_CHANNELS';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const GET_FILTERED_CHANNELS = 'GET_FILTERED_CHANNELS';
const GET_SEARCH_CHANNELS = 'GET_SEARCH_CHANNELS';

const getChannels = channels => ({ type: GET_CHANNELS, channels });
const makeChannel = channel => ({ type: CREATE_CHANNEL, channel });
const searchChannels = channels => ({ type: GET_SEARCH_CHANNELS, channels });

/******************** DISPATCH FUNCTIONS ********************/

export const fetchFilteredChannels = categoryName => (
  { type: GET_FILTERED_CHANNELS, categoryName }
)

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

export const createChannel = (name, category, description) => {
  return function (dispatch) {
    return axios.post('/api/channels', {
      name,
      category,
      description
    })
      .then(res => {
        dispatch(makeChannel(res.data))
        history.push(`/channels/${res.data.name}`)
      })
      .catch(err => console.log(err));
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channelList: action.channels,
        categoryList: Array.from(new Set(action.channels.map(channel => channel.category))).sort()
      }
    case CREATE_CHANNEL:
      return {
        ...state,
        channelList: [...state.channelList, action.channel]
      }
    case GET_FILTERED_CHANNELS:
      return {
        ...state,
        filteredChannelList: state.channelList.filter(channel => channel.category === action.categoryName)
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