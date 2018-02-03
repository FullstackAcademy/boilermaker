/* Actual Reaction Data */
const reactions = {
  1: 'BIG FACTS',
  2: '#FAKENEWS',
  3: '[citation needed]'
}

/* Reaction store stuff */
const SET_REACTION = 'SET_REACTION';

export const setReaction = reactionId => ({
  type: SET_REACTION,
  reactionId
});

export default (state = 0, action) => {
  switch (action.type) {
    case SET_REACTION:
      return action.reactionId;
    default:
      return state;
  }
}
