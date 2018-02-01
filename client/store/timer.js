const SET_CURR_TIME = 'SET_CURR_TIME';
const SET_TOTAL_TIME = 'SET_TOTAL_TIME';
const SET_TIME = 'SET_TIME';
const SET_TIMER_ACTIVE = 'SET_TIMER_ACTIVE';

const defaultState = {
  currTime: 0,
  totalTime: 0,
  leadinTime: 0,
  totalLeadinTime: 0,
  active: false,
  status: 0
}

export const setCurrTime = currTime => ({ type: SET_CURR_TIME, currTime });
export const setTotalTime = totaltime => ({ type: SET_TOTAL_TIME, totaltime });
export const setTimerActive = val => ({ type: SET_TIMER_ACTIVE, active: val });
export const setTime = (leadinTime, totalLeadinTime, currTime, totalTime, status) => ({
  type: SET_TIME,
  leadinTime,
  currTime,
  totalTime,
  totalLeadinTime,
  status: status || 0
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
      newState.leadinTime = action.leadinTime * 1000;
      newState.totalTime = action.totalTime * 1000;
      newState.currTime = action.currTime * 1000;
      newState.totalLeadinTime = action.totalLeadinTime * 1000;
      newState.active = true;
      newState.status = action.status;
      return newState;
    case SET_TIMER_ACTIVE:
      newState.active = action.active;
      return newState;
    default:
      return state;
  }
}
