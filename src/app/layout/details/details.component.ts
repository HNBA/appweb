import { Component, OnInit,AfterViewInit,ViewContainerRef, TemplateRef,ViewChild} from '@angular/core';
import { PushNotificationComponent } from './notification.component';
import {SineWaveDataService} from '../../sinewave-data.service';

declare var Highcharts:any;
declare var usdeur:any;
var data = usdeur.splice(1000,1000);
var points=[];
var datay=[];
var ssh:Array<number>;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [SineWaveDataService]
})
export class DetailsComponent implements OnInit {
@ViewChild("loadingg") loadingg;
chartDisk: Array<number>;
chartSshDatao: Array<string>;
  constructor(private _vcr: ViewContainerRef,private dataservice: SineWaveDataService) { 
      this.chartSshDatao = this.dataservice.observableSineWaveSsho();
      this.chartDisk = this.dataservice.observableSineWaveChart();
  }
    
  ngOnInit() {
      
//      this._vcr.createEmbeddedView(this.loadingg);
  }
 // Pie
    public pieChartLabels:string[] = ['vda', 'vda1','vdb'];
                              
     public pieChartData:number[] = [300,250,450];
    public pieChartType:string = 'pie';
    
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
ngAfterViewInit(): void {
    
    Highcharts.chart('containerDisk', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Disk Storage'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'red'
                }
            }
        }
    },
    series: [{
        data: [
            { name: 'vdb', y: 33.33 },
            { name: 'vda', y: 34 },
            { name: 'vda1', y: 32.67 }
          //  { name: 'Safari', y: 4.77 },
           // { name: 'Opera', y: 0.91 },
           // { name: 'Proprietary or Undetectable', y: 0.2 }
        ]
    }]
});
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
                }, 1000);
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
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }())
    }]
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
                }, 1000);
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
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }())
    }]
       });
    }
}

