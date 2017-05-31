import { Component, OnInit} from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications'; //import the service
import { Http, Response, Headers,RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as Rx from 'rxjs';
import {Input} from '@angular/core';
import {SineWaveDataService} from '../../sinewave-data.service';
import {Plotter} from '../../plotter';
import {Printer} from '../../printer';
import {ReplaySubject} from 'rxjs/Rx';
import { LogService } from '../../shared/log/log.service';
@Component({
    moduleId: module.id,
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    providers: [LogService,SineWaveDataService]
})
@Injectable()
export class TablesComponent implements OnInit {
     title = 'Web push Notifications!';
     message: string;
  incomingData: Array<string>;
  constructor(private _pushNotifications: PushNotificationsService,private logservice: LogService,
  private dataService: SineWaveDataService,private http: Http){
    _pushNotifications.requestPermission(); // request for permission as soon as component loads
    this.incomingData = dataService.observableSineWave();
  }
  log={};
   loadLog() {
    this.logservice.getLog().subscribe(data => this.log = data);
  }
  notify(){ //our function to be called on click
    let options = { //set options
      body: "The truth is, I'am Iron Man!",
      icon: "assets/images/ironman.png" //adding an icon
    }
    let notify = this._pushNotifications.create('Iron Man', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }
  notifyLog(){ //our function to be called on click
    let options = { //set options
      body: "Log loaded !",
      icon: "assets/images/ironman.png" //adding an icon
    }
    let notify = this._pushNotifications.create('Iron Man', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }
  getNotification(){
    if(this.log != null){
     return this.notifyLog();
    }
  }
    ngOnInit() { }

   

}
