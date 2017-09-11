<<<<<<< HEAD
import { Component, OnInit,AfterViewInit,ViewContainerRef, TemplateRef,ViewChild} from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications'; 
=======
import { Component, OnInit} from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications'; //import the service
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
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
<<<<<<< HEAD
import { PushNotificationComponent } from './notification.component';
declare var Highcharts:any;
declare var usdeur:any;
var data = usdeur.splice(1,1000);
var points=[];
var datay=[];
var ssh:Array<number>;
=======
import { BsComponentComponent} from '../bs-component/bs-component.component';

declare var require: any;

>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
@Component({
    moduleId: module.id,
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    providers: [LogService,SineWaveDataService]
})
@Injectable()
<<<<<<< HEAD
export class TablesComponent implements OnInit,AfterViewInit {
=======
export class TablesComponent implements OnInit {
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
     title = 'Web push Notifications!';
     message: any;
  //incomingData: Array<Number>;
  items = [];
<<<<<<< HEAD
 chartDisk: Array<string>;
  options: Object;
      option: Object;
result: Object;
color="green";
showStyle=false;
@ViewChild("loadingg") loadingg;
  constructor(private dataservice: SineWaveDataService,private _pushNotifications: PushNotificationsService,private logservice: LogService,
  private _vcr: ViewContainerRef){
 datay=this.dataservice.observableSineWaveChart(); 
  ssh=this.dataservice.observableSineWaveChart();
  //console.log(datay);
  }

  setColor(){
      setTimeout(()=>{    //<<<---    using ()=> syntax
    return this.color = "red";
 },3000);
 return this.color;
  }
 
    ngOnInit() {
    }

   // Pie
    public pieChartLabels:string[] = ['vda', 'vda1','vdb'];
                              
     public pieChartData:number[] = [355,310,335];
     public pieChartType:string = 'pie';
=======
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
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
    
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
<<<<<<< HEAD
ngAfterViewInit(): void {
//this._vcr.createEmbeddedView(this.loadingg);
     
 Highcharts.setOptions({
    global: {
        useUTC: false
            }
         });
       Highcharts.stockChart('container',{
            chart: {
                events: {
                   load: function () {
                   // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.round(Math.random() * 100);
                    series.addPoint([x, y], true, true);
                }, 4000);
            }
        }
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'CPU Usage'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random()*10)
                ]);
            }
            return data;
        }())
    }]
       });


 Highcharts.setOptions({
    global: {
        useUTC: false
            }
         });
       Highcharts.stockChart('ramcontainer',{
            chart: {
                events: {
                   load: function () {
                   // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.round(Math.random() * 100);
                    series.addPoint([x, y], true, true);
                }, 4000);
            }
        }
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'RAM Usage'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random()*10)
                ]);
            }
            return data;
        }())
    }]
       });

    }
    
}

=======
}
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
