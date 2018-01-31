import { socket } from './socket';
const rtcConnection = new RTCMultiConnection();;

resetConnection();

function resetConnection(){ 
  rtcConnection.broadcasters = [];
  rtcConnection.session = {audio:false,video:false,oneway:true};
  rtcConnection.dontOverrideSession = true;
  rtcConnection.socketMessageEvent = 'multi-broadcasters-demo';
  rtcConnection.socketUrl = '/';
  rtcConnection.isStreaming = false;
  rtcConnection.mediaConstraints = {
    audio:true,
    video:{
      mandatory: {
        minFrameRate: 15,
        maxFrameRate: 15,
        minWidth: 640,
        maxWidth: 640,
        minHeight: 360,
        maxHeight: 360
      }
    }
  }
}

rtcConnection.onstream = e => {
  //I'm gonna use jquery here and anyone and I challenge anyone reading this to find a better soloution
  $('#videos-container').append(e.mediaElement);
  if (e.type == 'remote') {
    rtcConnection.askToShareParticipants();
  }
  if (rtcConnection.isInitiator && event.type === 'local') {
    rtcConnection.isStreaming = true;
    rtcConnection.shareParticipants({dontShareWith: e.userid});
  }
}
rtcConnection.onstreamended = e => {
  rtcConnection.session = Object.assign({},rtcConnection.session,{audio:false,video:false});

  $(e.mediaElement).remove();
}

export default rtcConnection;