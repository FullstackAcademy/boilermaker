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
    phase: false,
    viewerCount: 0,
    queue: [],
    broadcasters: [],
    debate: false,
    winner: false,
    voting: 'default'
  },
  prompts: []
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
const SET_MAIN = 'SET_MAIN';
const SET_BROADCASTERS = 'SET_BROADCASTERS';
const SET_DEBATE = 'SET_DEBATE';
const SET_WINNER = 'SET_WINNER';
const SET_VOTING = 'SET_VOTING';

export const setMain = (phase, viewerCount, queue) => ({
  type: SET_MAIN,
  phase,
  viewerCount,
  queue
});

export const setBroadcasters = broadcasters => ({
  type: SET_BROADCASTERS,
  broadcasters
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

//PROMPTS
const ADD_PROMPT = 'ADD_PROMPT';

export const addPrompt = prompt => ({ type: ADD_PROMPT, prompt });

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
          leadinTime: action.leadinTime,
          totalTime: action.totalTime,
          currTime: action.currTime,
          totalLeadinTime: action.totalLeadinTime,
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
    case SET_MAIN:
      return {
        ...state,
        status: {
          ...state.status,
          phase: action.phase,
          viewerCount: action.viewerCount,
          queue: action.queue
        }
      };
    case SET_BROADCASTERS:
      return {
        ...state,
        status: {
          ...state.status,
          broadcasters: action.broadcasters
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
    
    // PROMPTS
    case ADD_PROMPT:
      return {
        ...state,
        prompts: [...state.prompts, action.prompt]
      };

    default:
      return state;
  }
}
