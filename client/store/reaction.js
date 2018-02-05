/* Actual Reaction Data */
const reactions = {
  0: ' ',
  1: 'BIG FACTS',
  2: '[citation needed]',
  3: '#FAKENEWS'
}

/* Reaction store stuff */
const defaultState = reactions[0];

const SET_REACTION = 'SET_REACTION';

export const setReaction = reactionId => ({
  type: SET_REACTION,
  reaction: reactions[reactionId]
});


export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_REACTION:
      return action.reaction;
    default:
      return state;
  }
}
