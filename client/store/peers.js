const ADD_PEER_CONNECTION = 'ADD_PEER_CONNECTION'

//INITIAL STATE
const defaultPeers = {
  peerList: [],
}

//ACTION CREATORS
const addPeerConnection = peer =>({type: ADD_PEER_CONNECTION, peer})

//THUNK CREATORS
export const addPeerThunk = (peer) => {
  return (
    (dispatch) => dispatch(addPeerConnection(peer))
  )
}

//REDUCER
export default function (state = defaultPeers, action) {
  switch (action.type) {
    case ADD_PEER_CONNECTION:
      console.log('in add peer connection')
      console.log(action.peer)
      return { ...state, peerList: [...state.peerList, action.peer] }
    default:
      return state
  }
}
