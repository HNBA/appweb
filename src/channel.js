"use strict";

function channel (socket) {
    var ch=this;
    this.socket=socket;
    this.receivers=[];

    this.send = function (msg) {
	// websocket readyState (0,1,2,3), RTCDataChannel (connecting,open,closing,closed)
	if (ch.socket.readyState==0 || ch.socket.readyState=='connecting') { // socket connecting, try again
	    setTimeout(ch.send,0,msg);
	    return true;
	} else {
	    if (ch.socket.readyState==1 || ch.socket.readyState=='open') { // socket open
		ch.socket.send(JSON.stringify(msg)); // compress:true
		return true;
	    } else return false;
	}
    }

    this.receive = function (callback) {
	ch.receivers.push(callback);
    }
    this.init=function(socket) {
      if (socket==undefined) {
        ch.socket=new WebSocket('ws://'+window.location.hostname + ':' + window.location.port);
    	ch.socket.onerror=ch.socket.onclose=function () {
		    setTimeout(ch.init, 1000);
	    };
      }
      ch.socket.onmessage = function (e) {
	    var msg=JSON.parse(e.data);
	    ch.receivers.forEach(
	          function (cb) {
		      cb(msg);
	          });
  	  }
	}
	this.init(socket);
}

try {
  module.exports = channel
} catch (err) {};
