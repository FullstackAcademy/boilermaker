import { socket } from './socket';

//Extend the MultiConnection Prototype

let rtcConnection = new RTCMultiConnection();

resetConnection();

function resetConnection() {
  /*rtcConnection.broadcasters = [];
  rtcConnection.session = { audio: false, video: false, oneway: true };
  rtcConnection.dontOverrideSession = true;
  rtcConnection.socketUrl = '/';
  rtcConnection.isStreaming = false;
  rtcConnection.sdpConstraints = {
    mandatory: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
      VoiceActivityDetection: false,
      IceRestart: true
    },
    optional: []
  };
  rtcConnection.mediaConstraints = {
    audio: true,
    video: {
      mandatory: {
        minFrameRate: 15,
        maxFrameRate: 15,
        minWidth: 640,
        maxWidth: 640,
        minHeight: 360,
        maxHeight: 360,
      }
    }
  }*/
  rtcConnection = Object.assign(rtcConnection, {
    broadcasters: {},
    stream: null,
    session: { audio: false, video: false, oneway: true },
    dontOverrideSession: true,
    socketUrl: '/',
    sdpConstraints: {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: false,
        IceRestart: true
      },
      optional: []
    },
    mediaConstraints: {
      audio: true,
      video: {
        mandatory: {
          minFrameRate: 15,
          maxFrameRate: 30,
          minWidth: 640,
          maxWidth: 640,
          minHeight: 360,
          maxHeight: 360,
        }
      }
    },
    // bandwidth: {
    //   video: 256,    // 256kbps
    //   screen: 300,    // 300kbps
    // },

    refresh() {
      const channel = rtcConnection.channel;
      //rtcConnection.disconnect();
      //does not do anything anymore lol
      //so heres what it should do LOL
      rtcConnection.getAllParticipants().forEach(sock => {
        rtcConnection.disconnectWith(sock);
      });
      rtcConnection.attachStreams.forEach(stream => {
        stream.stop();
      })
      //rtcConnection = new RTCMultiConnection(channel);
      //rtcConnection.connect();
      //resetConnection();
    },
    joinBroadcasters(broadcasterIds) {
      if (!broadcasterIds.length || Object.keys(rtcConnection.broadcasters)>1) return;
      if (!broadcasterIds.includes(rtcConnection.USERID)) rtcConnection.session = { audio: true, video: true, oneway: true };
      if (broadcasterIds[1] === rtcConnection.USERID) return;
      setTimeout(()=>{
        broadcasterIds.forEach(broadcasterId => {
          if (broadcasterId !== rtcConnection.USERID) rtcConnection.join(broadcasterId);
        });
      },2000);
    },
    toggleMute(first) {
      return;
      const { USERID: userid, broadcasters } = rtcConnection
      const isBroadcasting = broadcasters.includes(userid);
      if (!isBroadcasting) return;
      const [b1, b2] = broadcasters;
      const isFirst = b1 === userid;
      const isSecond = b2 === userid;

      const f = (first && isFirst) || (!first && isSecond) ? 'unmute' : 'mute';
      const localStream = Object.keys(rtcConnection.streamEvents).reduce(((old,e)=>e.length>12&&e.type==='local' ? e: old),undefined);
      console.log('ugly children',rtcConnection.streamEvents,localStream);
      localStream && localStream[f]('audio');
    },

    endStreams() {
      rtcConnection.session = { audio: false, video: false, oneway: true };
      /*rtcConnection.broadcasters.forEach(broadcasterId => {
        rtcConnection.onstreamended({ mediaElement: $(`#${broadcasterId}`)[0] });
      });*/
      $('.media-container').remove();
      rtcConnection.broadcasters = [];
      rtcConnection.refresh();
    },

    onStream(e) {
      var video = document.createElement('video');
      video.srcObject = e.stream;
      var mediaElement = getMediaElement(video, {
        title: e.userid,
        buttons: [],
        showOnMouseEnter: false,
        height: '100%',
        width: '100%',
      });

      rtcConnection.broadcasters[e.userid] = mediaElement;
      mediaElement.volume = 0;

      video.style.height = '100%';
      video.style.width = '100%';
      
      let container = Object.keys(rtcConnection.broadcasters).length<2 ? '#empty-video-1' : '#empty-video-2';
      console.log(container,Object.keys(rtcConnection.broadcasters)) 
      //I'm gonna use jquery here and anyone and I challenge anyone reading this to find a better soloution
      $(container).append(mediaElement);
      if(e.type === 'local') {
        socket.emit('readyToBroadcast');
      }
    },
    onStreamEnded(e) {
      //rtcConnection.session = Object.assign({},rtcConnection.session,{audio:false,video:false});
      e.mediaEvent && $(e.mediaEvent).remove();
    },
  });
rtcConnection.onstream = rtcConnection.onStream;
rtcConnection.onstreamended = rtcConnection.onStreamEnded;
}

export default rtcConnection;