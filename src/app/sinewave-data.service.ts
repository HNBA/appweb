import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import * as channel from '../../src/channel.js';
<<<<<<< HEAD

let ch = new channel();
@Injectable()
export class SineWaveDataService {

 
  observableSineWave() : Array<number>{
      let subject = Array<number>(1);
      ch.send({service:'logs'});
      ch.receive(function (msg) {
      setTimeout(()=>{    //<<<---    using ()=> syntax
      subject.push(msg.doc.value);
 },3000);
 });
    console.log(subject);
     return subject;
  }


 observableMemorySineWave() : Array<number>{
      let subjectMemory = Array<number>(1);
      ch.send({service:'memorylogs'});
      ch.receive(function (msg) {
        subjectMemory.push(msg.doc.value);
       });
     return subjectMemory;
 }




 observableSineWaveChart() : Array<number>{
      let subjectChart = Array<number>(1);
      ch.send({service:'chart'});
      ch.receive(function (msg) {
      setTimeout(()=>{ 
      subjectChart.push(msg.doc.value);
 },3000);
  
        });
    return subjectChart;
  }




  observableSineWaveSshc() : Array<string>{
      let subjectSshc = Array<string>(1);
      ch.send({service:'sshlogsc'});
      ch.receive(function (msg) {
        subjectSshc.push(msg.doc.status);
//        subjectSshc.push(msg.doc.user);
  //      subjectSshc.push(msg.doc.logdate);   
 });
     return subjectSshc;
  }



  observableSineWaveSsho() : Array<string>{
      let subjectSsho = Array<string>(1);
      ch.send({service:'sshlogso'});
      ch.receive(function (msg) {
     if (msg.doc.user=="ferihane" || msg.doc.user=="abdelaziz")
       {
  
 
   
    let c=" New User Connected  "+msg.doc.user+"  in Host  "+msg.doc.host+" with status : "+msg.doc.status+" in  "+msg.doc.logdate+"";
 // let c="Session Closed for User  =>  "+msg.doc.user+"  from Host  "+msg.doc.host+" withs tatus : "+msg.doc.status+" in  "+msg.doc.logdate+"";

    
     subjectSsho.push(c);
      console.log(c);
      }
 });
     return subjectSsho;
  }






  observableSineWaveDisk() : Array<string>{
      let subjectDisk = Array<string>(1);
      ch.send({service:'disklog'});
      ch.receive(function (msg) {
        subjectDisk.push(msg.doc.plugin_instance);
       });
     return subjectDisk;
  }





=======
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
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
}

