import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import * as channel from '../../src/channel.js';
let ch = new channel();
let gid=0;
@Injectable()
export class SineWaveDataService {

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
    /*  ch.send({service:'sineWave'});
      ch.receive(function (msg) {
         console.log('received message');
         setTimeout(ch.send, 9000, {service:'sineWave'});
           subject=(msg.data)
           console.log(msg.data);
        });
      return subject;
  }
}*/
  observableSineWave() : Array<number>{
      let subject = Array<number>(1);

      /*let ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'sinedata');
      ws.onmessage = function(e: MessageEvent) {
          return subject.next(e.data)
      };
      return subject;*/
      ch.send({service:'logs'});
      ch.send({service:'sineWave'});
      ch.receive(function (msg) {
         gid++;
         switch (msg.service) {
           case 'logs':
              console.log(msg);
              break;
           case 'sineWave':
              setTimeout(ch.send, 9000, {service:'sineWave'});
              subject.push(msg.value)
              break;
           default: console.log('default ????');
         }
        });
     return subject;
  }
}

