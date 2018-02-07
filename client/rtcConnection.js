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
    broadcastersObj: {},
    broadcastersArray: [],
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
          maxFrameRate: 60,
          minWidth: 480,
          maxWidth: 480,
          minHeight: 270,
          maxHeight: 270,
        }
      }
    },
    bandwidth: {
      video: 1024,    // 256kbps
      screen: 600,    // 300kbps
      audio: 64,
    },

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
      rtcConnection.broadcastersObj = {};
      rtcConnection.broadcastersArray = [];
      //rtcConnection = new RTCMultiConnection(channel);
      //rtcConnection.connect();
      //resetConnection();
    },
    joinBroadcasters(broadcasterIds) {
      if (!broadcasterIds.length || rtcConnection.broadcastersArray.length > 1) return;
      if (!broadcasterIds.includes(rtcConnection.USERID)) rtcConnection.session = { audio: true, video: true, oneway: true };
      rtcConnection.broadcastersArray = broadcasterIds;
      if (broadcasterIds[1] === rtcConnection.USERID) return;
      setTimeout(() => {
        broadcasterIds.forEach(broadcasterId => {
          if (broadcasterId !== rtcConnection.USERID) rtcConnection.join(broadcasterId);
        });
      }, 2000);
    },
    muteUser(id){
      var elem = rtcConnection.broadcastersObj[id];
      if (id !== rtcConnection.userid) elem.volume = 1;
      $(elem).parent().addClass('active');
    },
    unmuteUser(id){
      var elem = rtcConnection.broadcastersObj[id];
      if (id !== rtcConnection.userid) elem.volume = 0;
      $(elem).parent().removeClass('active');
    },

    endStreams() {
      rtcConnection.session = { audio: false, video: false, oneway: true };
      /*rtcConnection.broadcasters.forEach(broadcasterId => {
        rtcConnection.onstreamended({ mediaElement: $(`#${broadcasterId}`)[0] });
      });*/
      $('.media-container').remove();
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

      rtcConnection.broadcastersObj[e.userid] = mediaElement;
      mediaElement.volume = 0;

      video.style.height = '100%';
      video.style.width = '100%';
      let num = rtcConnection.broadcastersArray.indexOf(e.userid) + 1;
      let container = `#empty-video-${num}`;
      //I'm gonna use jquery here and anyone and I challenge anyone reading this to find a better soloution
      $(container).append(mediaElement);
      if (e.type === 'local') {
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