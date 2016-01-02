var peerApi = {
  PeerConnection: window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
  IceCandidate: window.mozRTCIceCandidate || window.RTCIceCandidate,
  SessionDescription: window.mozRTCSessionDescription || window.RTCSessionDescription,
  getUserMedia: navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia,
  server: {
    iceServers: [
      {url:'stun:stun.l.google.com:19302', urls: 'stun:stun.l.google.com:19302'}
    ],
    iceTransportType: 'all',
    bundlePolicy: 'balanced',
    rtcpMuxPolicy: 'negotiate'
  },
  options: {
    'optional': [
      {'DtlsSrtpKeyAgreement': true},
      {'internalSctpDataChannels': true}
    ]
  },
  constraints: {
    "offerToReceiveAudio":true,
    "offerToReceiveVideo":true
  },
  newConstraints:{
    "offerToReceiveAudio":true,
    "offerToReceiveVideo":true
  },
  createPeerConnection: function(sdpExchCB, onStream, onConnectionState){
    var self = this;
    var pc = new this.PeerConnection(this.server, this.options);
    pc.onicecandidate = function(e) {
      if (e.candidate == null)
        return;
      // console.log('onicecandidate', e.candidate.candidate);
      sdpExchCB("candidate", e.candidate);
    };
    pc.oniceconnectionstatechange = pc.onicechange = function(e){
      console.log('oniceconnectionstatechange', pc.iceConnectionState, e);
      if(pc.iceConnectionState == 'connected' || pc.iceConnectionState == 'completed' || e == 'connected' || e == 'completed')
        onConnectionState(true);
      if(pc.iceConnectionState == 'disconnected' || e == 'disconnected')
        onConnectionState(false);
    };

    pc.onConnectionState = onConnectionState;

    pc.onnegotiationneeded = function(e){
      console.log('onnegotiationneeded', e);
    };
    pc.onsignalingstatechange = function(e){
      console.log('onsignalingstatechange', pc.signalingState, e);
    };
    pc.onaddstream = function(obj) {
      onStream(obj, 'remote');
    };
    pc.ondatachannel = function(e){
      e.channel.onopen = function(){
        console.log('remote datachannel open', this.label);
        self.onDataChannel(pc, this);
      }
    }
    return pc;
  },
  attachStream: function(pc, constraints, onStream, mss, callback){
    if(mss){
      for(var i = 0; i < mss.length; i++){
        if(onStream) onStream({stream: mss[i]}, 'local');
        pc.addStream(mss[i]);
      }
      callback(true);
    }
    else{
      this.getUserMedia.call(navigator, constraints, function (stream) {
        if(onStream) onStream({stream: stream}, 'local');
        pc.addStream(stream);
        console.log('on stream');
        callback(true);
      }, function(e){
        callback(false);
        console.error(e);
      });
    }
  },
  createOffer: function(pc, sdpExchCB){
    var self = this;
    var dc = pc.createDataChannel('dc');
    dc.onopen = function(){
      console.log('local datachannel open', this.label);
      self.onDataChannel(pc, this);
    }
    pc.createOffer(function (offer) {
      pc.setLocalDescription(self.modSDP(offer), function(){
        pc.isOfferer = true;
        sdpExchCB('offer', pc.localDescription);
      }, self.errorHandler);
    }, this.errorHandler, this.constraints);
  },
  onDataChannel: function(pc, dc){
    console.log('hi dc');
    if(!pc.dcs)
      pc.dcs = {};
    var label = dc.label;
    pc.dcs[label] = dc;
    dc.onmessage = function(e){
      if(pc.onMessage)
        pc.onMessage(this.label, JSON.parse(e.data));
    }
    dc.onclose = function(e){
      console.log('dc onclose')
      pc.onConnectionState(false);
    }
    this.sendOverDC(dc, {ack: 'hi from browser'});
  },
  offer: function(pc, data, sdpExchCB) {
    var self = this;
    var off = new this.SessionDescription(data);
    pc.setRemoteDescription(off, function() {
      pc.createAnswer(function(answer) {
        pc.setLocalDescription(self.modSDP(answer), function(){
          sdpExchCB("answer", pc.localDescription);
        }, self.errorHandler);
      }, self.errorHandler, {});
    }, self.errorHandler);
  },
  candidate: function(pc, data, sdpExchCB) {
    // console.log('onaddicecandidate', data);
    pc.addIceCandidate(new this.IceCandidate(data));
  },
  answer: function(pc, data, sdpExchCB) {
    pc.setRemoteDescription(new this.SessionDescription(data));
  },
  errorHandler: function(err) {
    console.error(err);
  },
  modSDP: function(description){
    var sdp = description.sdp;
    // sdp = sdp.replace("a=rtcp-fb:100 goog-remb\r\n", '');
    sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g , '');
    sdp = sdp.replace(/a=mid:audio\r\n/g , 'a=mid:audio\r\nb=AS:128\r\n');
    sdp = sdp.replace(/a=mid:video\r\n/g , 'a=mid:video\r\nb=AS:2048000\r\n');
    sdp = sdp.replace(/a=mid:data\r\n/g , 'a=mid:data\r\nb=AS:2048000\r\n');
    return new this.SessionDescription({
      type: description.type,
      sdp: sdp
    });
  },
  sendOverDC: function(dc, json){
    dc.send(JSON.stringify(json));
  },
  stopStreams: function(streams){
    if(!streams) return;
    for(var i = 0; i < streams.length; i++) {
      try{
        if(streams[i] && streams[i].getTracks){
          var tracks = streams[i].getTracks()
          for(var j = 0; j < tracks.length; j++){
            tracks[j].stop()
          }
        }
        else
          streams[i].stop();
      }
      catch (e){
        console.error(e);
      }
    }
  },
  toggleMute: function(pc, type, toMute){
    try{
      var streams = pc.getLocalStreams();
      for(var i in streams){
        var tracks = (type == 'video' ?  streams[i].getVideoTracks() : streams[i].getAudioTracks());
        for(var j in tracks){
          tracks[j].enabled = !toMute;
        }
      }
    }
    finally{}
  },
  attachMediaStreamtoDOM: function(stream) {
    var element = document.createElement(stream.getVideoTracks().length == 0 ? "audio" : "video");
    element.setAttribute("autoplay", "true");
    if (typeof element.srcObject !== 'undefined') {
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      console.log('Error attaching stream to element.');
    }
    return element;
  }
}
