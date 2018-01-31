const SET_TIME = 'SET_TIME';

const defaultState = 30;

export const setTime = time => ({ type: SET_TIME, time});

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_TIME:
      return action.time;
    default:
      return state;
  }
}
