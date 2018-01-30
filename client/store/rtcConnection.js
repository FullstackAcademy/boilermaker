/*import store from './index';

const SET_RTC_CONNECTION = 'SET_RTC_CONNECTION';

export const setRtcConnection = rtcConnection => {
  return {
    type: SET_RTC_CONNECTION,
    rtcConnection
  }
};

export default (prevState = {}, action) => {
  switch (action.type) {
    case SET_RTC_CONNECTION:
      return action.rtcConnection;
    default:
      return prevState;
  }
};*/
const rtcConnection = new RTCMultiConnection();
rtcConnection.session = {audio:true,video:true,oneway:true};
rtcConnection.dontOverrideSession = true;
rtcConnection.socketMessageEvent = 'multi-broadcasters-demo';


rtcConnection.onNewSession = session =>{
  console.log('new session');
  session.join({oneway:true});
};

rtcConnection.onstream = event =>{
  console.log('started streaming',event);
  $('#videos-container').append(event.mediaElement);

  if (e.type == 'remote') {
    connection.askToShareParticipants();
  }

  if (connection.isInitiator && e.type == 'remote' && !e.session.oneway) {
    // call "shareParticipants" to manually share participants with all connected users!
    connection.shareParticipants({
        dontShareWith: e.userid
    });
}
}
//rtcConnection.videosContainer = $('#video-container')[0];

/*rtcConnection.onstream = event =>{
  console.log('starting a new stream ',event);
  return true;
}*/

export default rtcConnection;