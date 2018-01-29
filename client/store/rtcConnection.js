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
let connection = rtcConnection;
rtcConnection.session = {audio:true,video:true,oneway:true};
rtcConnection.direction = 'many-to-many';
rtcConnection.dontOverrideSession = true;

rtcConnection.onNewSession = session =>{
  console.log('new session');
  session.join({oneway:true});
};
//rtcConnection.videosContainer = $('#video-container')[0];

rtcConnection.socketMessageEvent = 'multi-broadcasters-demo';

/*rtcConnection.onstream = event =>{
  console.log('starting a new stream ',event);
  return true;
}*/

export default rtcConnection;