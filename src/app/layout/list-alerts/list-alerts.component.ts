<<<<<<< HEAD
import { Component, OnInit,AfterViewInit } from '@angular/core';
import {SineWaveDataService} from '../../sinewave-data.service';
declare var Highcharts : any ;
@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss'],
  providers: [SineWaveDataService]

})
export class ListAlertsComponent implements AfterViewInit {

  chartData : Array<number>;
  chartt: Array<number>;
  chartSshData: Array<string>;
  x:string; 
  chartMemoryData: Array<number>;
  chartSshDatao: Array<string>;
  chartDisk: Array<string>;
  chartSshDatac:Array<string>;

  constructor(private dataservice : SineWaveDataService) {

  this.chartSshDatao = this.dataservice.observableSineWaveSsho();
  this.chartSshDatac = this.dataservice.observableSineWaveSshc();
  this.chartt=this.dataservice.observableSineWaveChart();
  this.chartData = this.dataservice.observableSineWave();
  this.chartMemoryData=this.dataservice.observableMemorySineWave();
  this.chartDisk=this.dataservice.observableSineWaveDisk();
  this.x=this.chartSshDatao[0];
  console.log(this.x); 
  }
   ngAfterViewInit(){
  Highcharts.getOptions().plotOptions.pie.colors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;
    for (i = 3; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
}());

// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Disk Sotrage In all Nodes'
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
}
}

=======
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss']
})
export class ListAlertsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
