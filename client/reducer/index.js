import { RECEIVE_BG, RECEIVE_IMG } from '../action-creators';

const initialState = {
  bg: '',
  images: []
}

export default function (state = initialState, action) {
  console.log('action obj', action.images)

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_BG:
     newState.bg = action.bg;
     break;

    case RECEIVE_IMG:
     newState.images = state.images.concat(action.images);
     break;

    default:
      return state;

  }
  console.log('new State', newState.images)
  return newState;
}

