import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import channel from 'C:/Users/BELKHIR/Downloads/AppWeb/src/channel';
@Injectable()
export class SineWaveDataService {

  observableSineWave() :  Array<string> {
      let subject = new Array<string>(1);
      /*let ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'sinedata');
      ws.onmessage = function(e: MessageEvent) {
          return subject.next(e.data)
      };
      return subject;*/
  
      //A mettre en global pour eviter de créer un channel pour chaque client
     let ch = new channel();
      ch.send({service:'logs'});
      ch.receive(function (msg) {
          console.log('received message');
          console.log(msg);
          subject.push(msg.doc)
        });
      return subject;
  }
}
