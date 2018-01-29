const SET_CHANNEL = 'SET_CHANNEL';

const defaultState = '';

export const setChannel = channel => ({ type: SET_CHANNEL, channel });

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_CHANNEL:
      return action.channel;
    default:
      return state;
  }
}
