import {ReplaySubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import * as channel from '../../src/channel.js';

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





}

