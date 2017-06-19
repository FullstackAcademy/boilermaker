import { RECEIVE_BG, RECEIVE_IMG, SHOW_CODE, FLASH_MSG } from '../action-creators';

const initialState = {
  bg: '',
  images: [],
  showCode: false,
  flash: false
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

    case SHOW_CODE:
      newState.showCode = !state.showCode;
      break;

    case FLASH_MSG:
      newState.flash = !state.flash;
      break;


    default:
      return state;

  }
  console.log('new State', newState.images)
  return newState;
}

