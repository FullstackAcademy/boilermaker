import axios from 'axios'

const GET_CHANNELS = 'GET_CHANNELS';
const CREATE_CHANNEL = 'CREATE_CHANNEL';

const defaultState = [];

const getChannels = channels => ({ type: GET_CHANNELS, channels });
const makeChannel = channel => ({ type: CREATE_CHANNEL, channel });

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
      return action.channels;
    case CREATE_CHANNEL:
      return [...state, action.channel];
    default:
      return state;
  }
}