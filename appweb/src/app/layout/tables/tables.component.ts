import { Component, OnInit,AfterViewInit,ViewContainerRef, TemplateRef,ViewChild} from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications'; 
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
import { PushNotificationComponent } from './notification.component';
declare var Highcharts:any;
declare var usdeur:any;
var data = usdeur.splice(1,1000);
var points=[];
var datay=[];
var ssh:Array<number>;
@Component({
    moduleId: module.id,
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    providers: [LogService,SineWaveDataService]
})
@Injectable()
export class TablesComponent implements OnInit,AfterViewInit {
     title = 'Web push Notifications!';
     message: any;
  //incomingData: Array<Number>;
  items = [];
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
  console.log(datay);
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
    
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
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
                   var i=1;
                   // set up the updating of the chart each second
                   var series = this.series[0];
                   var k = 0;
                   data= usdeur.splice(k,i);
                   setInterval(function () {
                    data.push([
                     (new Date()).getTime(), // current time
                     datay[i]
                     ]);
                    series[0].addPoint(data[i], true, true);
              
                    k++;
                    i++;
                }, 2000);
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
    turboThreshold:0,

    title: {
        text: 'CPU Usage'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'CPU data',
        data: usdeur
    }]
       });
     Highcharts.stockChart('ramcontainer',{
            chart: {
                events: {
                   load: function () {
                   var i=1;
                   // set up the updating of the chart each second
                   var series = this.series[0];
                   var k = 0;
                   data= usdeur.splice(k,i);
                   setInterval(function () {
                    data.push([
                     (new Date()).getTime(), // current time
                     datay[i]
                     ]);
                    series.addPoint(data[i], true, false);
                    k++;
                    i++;
                }, 2000);
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
        name: 'RAM data',
        data: usdeur
    }]
       });
    }
    
}

