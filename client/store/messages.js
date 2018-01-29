import store from './index';
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

export default (state = [], action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    case NEW_MESSAGE:
      return state.concat([action.message])
    default:
      return state;
  }
}