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
    broadcasters: [],
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
          maxFrameRate: 15,
          minWidth: 640,
          maxWidth: 640,
          minHeight: 360,
          maxHeight: 360,
        }
      }
    },
    
    refresh() {
      const channel = rtcConnection.channel;
      //rtcConnection.disconnect();
      //does not do anything anymore lol
      //so heres what it should do LOL
      rtcConnection.getAllParticipants().forEach(sock=>{
        rtcConnection.disconnectWith(sock);
      });
      rtcConnection.attachStreams.forEach(stream=>{
        stream.stop();
      })
      //rtcConnection = new RTCMultiConnection(channel);
      //rtcConnection.connect();
      //resetConnection();
    },
    joinBroadcasters(broadcasterIds, callback) {
      if (!broadcasterIds.length) return;
      rtcConnection.broadcasters = broadcasterIds;
      if (!broadcasterIds.includes(rtcConnection.USERID)) rtcConnection.session = { audio: true, video: true, oneway: true };
      if (broadcasterIds[1] === rtcConnection.USERID) return;
      const runOnce = func => {
        let once = false;
        return () => {
          if (once) return;
          once = true;
          return callback;
        }
      }
      broadcasterIds.forEach(broadcasterId => {
        if (broadcasterId !== rtcConnection.USERID) rtcConnection.connect(broadcasterId, runOnce);
      });
    },
    toggleMute(first) {
      //roomState.mutedUser = broadcasterId;
      //if(rtcConnection.streamEvents[broadcasterId])rtcConnection.streamEvents[broadcasterId].stream.mute('audio');
      //var elem = $(`#${userId}`)[0];
      const { USERID: userid, broadcasters } = rtcConnection
      const [v1, v2] = $('video');
      const [mc1, mc2] = $('.media-container');
      const isBroadcasting = broadcasters.includes(userid);
      const isFirst = broadcasters[0] === userid && isBroadcasting;
      const isSecond = broadcasters[1] === userid && isBroadcasting;
      v1.muted = first;
      v2.muted = !first;
      
      if (!isFirst) mc1.toggle('mute-audio', true);
      if (!isSecond) mc2.toggle('mute-audio', true);
      //$('video')[1].muted = !first;
      //if(elem) getMediaElement(elem).toggle(['mute-audio']);
    },
    
    endStreams() {
      console.log('killing streams');
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
        buttons: ['mute-audio'],
        showOnMouseEnter: false,
        height: '270px',
        width: '480px',
      });
      video.style.height = '270px';
      video.style.width = '480px';
      //if (e.userid === rtcConnection.mutedUser) 
      //I'm gonna use jquery here and anyone and I challenge anyone reading this to find a better soloution
      $('#videos-container').append(mediaElement);
      if (e.type === 'local') {
        mediaElement.toggle(['mute-audio']);
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