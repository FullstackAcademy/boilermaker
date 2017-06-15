import { RECEIVE_BG } from '../action-creators';

const initialState = {
  bg: ''
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_BG:
     newState.bg = action.bg;
     break;

    default:
      return state;

  }
  return newState;

}

