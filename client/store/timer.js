const SET_CURR_TIME = 'SET_CURR_TIME';
const SET_TOTAL_TIME = 'SET_TOTAL_TIME';
const SET_TIME =  'SET_TIME';

const defaultState = {
  currTime: 30000,
  totalTime: 30000
}

export const setCurrTime = currTime => ({ type: SET_CURR_TIME, currTime});
export const setTotalTime = totaltime => ({ type: SET_TOTAL_TIME, totaltime })
export const setTime = (currTime,totalTime) => ({
  type:SET_TIME,
  currTime,
  totalTime
}) 

export default function (state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CURR_TIME:
      newState.currTime = action.currTime;
      return newState;
    case SET_TOTAL_TIME:
      newState.totalTime = action.totalTime;
      return newState;
    case SET_TIME:
      newState.totalTime = action.totalTime;
      newState.currTime = action.currTime;
      return newState;
    default:
      return state;
  }
}
