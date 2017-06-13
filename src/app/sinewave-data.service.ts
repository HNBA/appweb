import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import * as channel from '../../src/channel.js';
let ch = new channel();
@Injectable()
export class SineWaveDataService {

  observableSineWave() : Array<number>{
      let subject = Array<number>(1);
      
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
         setTimeout(ch.send, 9000, {service:'sineWave'});
           for(let i=1;i<1000;i++){
           subject.push(msg.value+i)
         }
        });
      return subject;
  }
}
