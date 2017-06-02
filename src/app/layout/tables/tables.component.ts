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
  public dataService: SineWaveDataService,private http: Http,jsonp : Jsonp){
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
 
 incomingData = this.dataService.observableSineWave();
 
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
    ngOnInit() { 
    }

    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
    {data: this.createRange(10), label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
     public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
        * (My guess), for Angular to recognize the change in the dataset
        * it has to change the dataset variable directly,
        * so one way around it, is to clone the data, change it and then
        * assign it;
        */
    }

}
