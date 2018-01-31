import axios from 'axios'

const defaultState = {
  channelList: [],
  filteredChannelList: [],
  categoryList: []
};

const GET_CHANNELS = 'GET_CHANNELS';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const GET_FILTERED_CHANNELS = 'GET_FILTERED_CHANNELS';
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';

const getChannels = channels => ({ type: GET_CHANNELS, channels });
const makeChannel = channel => ({ type: CREATE_CHANNEL, channel });

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

export const createChannel = (name, category, description) => {
  return function (dispatch) {
    return axios.post('/api/channels', {
      name,
      category,
      description
    })
      .then(res => dispatch(makeChannel(res.data)))
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
    default:
      return state;
  }
}