import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import * as channel from '../../src/channel.js';
let ch = new channel();
@Injectable()
export class SineWaveDataService {

  observableSineWave() {
      let subject = [];
      /*let ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'sinedata');
      ws.onmessage = function(e: MessageEvent) {
          return subject.next(e.data)
      };
      return subject;*/
      /*let ch = new channel();
      ch.send({service:'logs'});
      ch.receive(function (msg) {
          console.log('received message');
          console.log(msg);
          subject.push(msg.doc)
        });
      return subject;*/
      //A mettre en global pour eviter de créer un channel pour chaque client
     
     //ch.send({service:'logs'});
      ch.send({service:'sineWave'});
      ch.receive(function (msg) {
         // console.log('received message');
          //console.log(msg);
         setTimeout(ch.send, 1000, {service:'sineWave'});
          subject.push(msg.value)
        });
      return subject;
  }
}
