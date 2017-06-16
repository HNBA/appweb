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
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { BsComponentComponent} from '../bs-component/bs-component.component';

declare var require: any;

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
     message: any;
  //incomingData: Array<Number>;
  items = [];
  options: Object;
      option: Object;
result: Object;
  constructor(private _pushNotifications: PushNotificationsService,private logservice: LogService,
  private http: Http,jsonp : Jsonp){
    _pushNotifications.requestPermission(); // request for permission as soon as component loads
    jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
            this.options = {
                title : { text : 'CPU Usage' },
                series : [{
                    name : 'AAPL',
                    data : res.json(),
                    tooltip: {
                        valueDecimals: 6
                    }
                }]
            };
        });
        jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
            this.result = {
                title : { text : 'RAM Usage' },
                series : [{
                    name : 'AAPL',
                    data : res.json(),
                    tooltip: {
                        valueDecimals: 6
                    }
                }]
            };
        });
jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
            this.option = {
                title : { text : 'Storage Capacity' },
                series : [{
                    name : 'AAPL',
                    data : res.json(),
                    tooltip: {
                        valueDecimals: 6
                    }
                }]
            };
        });  
  }


 
  createRange(number){
    this.items = [];
    for(var i = 1; i <= number; i++){
       this.items.push(i);
  
    }
    return this.items;
  }
  log={};
   loadLog() {
    this.logservice.getLog().subscribe(data => this.log = data);
  }
  notify(){ //our function to be called on click
    let options = { //set options
      body: "New notification !",
      icon: "assets/images/carrefour.png" //adding an icon
    }
    let notify = this._pushNotifications.create('Carrefour', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }
  notifyLog(){ //our function to be called on click
    let options = { //set options
      body: "Log loaded !",
      icon: "assets/images/carrefour.png" //adding an icon
    }
    let notify = this._pushNotifications.create('Carrefour', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }
  getNotification(){
    if(this.log != null){
     return this.notifyLog();
    }
  }
    ngOnInit() { 
    }

   // Pie
    public pieChartLabels:string[] = ['Espace used', 'Espace libre'];
    public pieChartData:number[] = [300, 700];
    public pieChartType:string = 'pie';
    
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
}
