const defaultState = {
  messages: [],
  timer: {
    currTime: 0,
    totalTime: 0,
    leadinTime: 0,
    totalLeadinTime: 0,
    active: false,
    status: 0
  },
  status: {
    phase: '',
    debate: false,
    winner: '',
    voting: false
  }
}


// CHAT
const SET_MESSAGES = 'SET_MESSAGES';
const NEW_MESSAGE = 'NEW_MESSAGE';

export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages: messages || []
});

export const newMessage = function (message) {
  return {
    type: NEW_MESSAGE,
    message
  };
};

// TIMER 
const SET_CURR_TIME = 'SET_CURR_TIME';
const SET_TOTAL_TIME = 'SET_TOTAL_TIME';
const SET_TIME = 'SET_TIME';
const SET_TIMER_ACTIVE = 'SET_TIMER_ACTIVE';

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

// STATUS
const SET_PHASE = 'SET_PHASE';
const SET_DEBATE = 'SET_DEBATE';
const SET_WINNER = 'SET_WINNER';
const SET_VOTING = 'SET_VOTING';

export const setPhase = phase => ({
  type: SET_PHASE,
  phase
});

export const setDebate = status => ({
  type: SET_DEBATE,
  status
});

export const setWinner = userName => ({
  type: SET_WINNER,
  userName
});

export const setVoting = boolean => ({
  type: SET_VOTING,
  boolean
});

// REDUCER

export default function (state = defaultState, action) {
  switch (action.type) {

    // CHAT
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    // TIMER
    case SET_CURR_TIME:
      return {
        ...state,
        timer: {
          ...state.timer,
          currTime: action.currTime
        }
      };
    case SET_TOTAL_TIME:
      return {
        ...state,
        timer: {
          ...state.timer,
          totalTime: action.totalTime
        }
      };
    case SET_TIME:
      return {
        ...state,
        timer: {
          ...state.timer,
          leadinTime: action.leadinTime * 1000,
          totalTime: action.totalTime * 1000,
          currTime: action.currTime * 1000,
          totalLeadinTime: action.totalLeadinTime * 1000,
          active: true,
          status: action.status
        }
      };
    case SET_TIMER_ACTIVE:
      return {
        ...state,
        timer: {
          ...state.timer,
          active: action.active
        }
      };

    // Status 
    case SET_PHASE:
      return {
        ...state,
        status: {
          ...state.status,
          phase: action.phase
        }
      };
    case SET_DEBATE:
      return {
        ...state,
        status: {
          ...state.status,
          debate: action.status
        }
      };
    case SET_WINNER:
      return {
        ...state,
        status: {
          ...state.status,
          winner: action.userName
        }
      };
    case SET_VOTING:
      return {
        ...state,
        status: {
          ...state.status,
          voting: action.boolean
        }
      };

    default:
      return state;
  }
}
