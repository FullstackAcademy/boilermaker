import store from './index';
const SET_MESSAGES = 'SET MESSAGES';
const NEW_MESSAGE = 'NEW MESSAGE';

export const setMessages = messages => (store.dispatch({
        type: SET_MESSAGES,
        messages:messages||[]
}));

export const newMessage = message => (store.dispatch({
    type:NEW_MESSAGE,
    message
}));

export default (state = [], action) => {
    switch(action.type){
        case SET_MESSAGES:
            return action.messages;
        case NEW_MESSAGE:
            return state.concat([action.message]);
        default:
            return state;
    }
}